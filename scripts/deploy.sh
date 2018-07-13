#!/usr/bin/env bash

BUCKET=mokedex
SOURCE_DIR=build/

slack chat send --author 'Mokedex (Mokedex@vX.X.X)' --text "Iniciando deploy no ambiente https://$BUCKET (Produção)" --channel '#tech' --color warning

echo "Building development"
if node scripts/build.js ; then
   echo "Build Successful"
else
  echo "exiting.."
  slack chat send --author 'Mokedex (Mokedex@vX.X.X)' --text "Ocorreu um problema criando o bundle para o https://$BUCKET (Produção)" --channel '#tech' --color danger
  exit 1
fi


echo "Removing all files on bucket"
aws s3 rm s3://${BUCKET} --recursive


echo "Attempting to upload site .."
echo "Command:  aws s3  sync $SOURCE_DIR s3://$BUCKET/"
aws s3 sync ${SOURCE_DIR} s3://${BUCKET}/ --cache-control max-age=604800
echo "S3 Upload complete"

echo "Invalidating cloudfrond distribution to get fresh cache"
aws cloudfront create-invalidation --distribution-id=XXXXXXXXXXXXX --paths /

echo "Deployment complete"
slack chat send --author 'Mokedex (Mokedex@vX.X.X)' --text "Deploy em https://$BUCKET completo (Produção) \n *Novidades* \n\n - Etc" --channel '#tech' --color good
