#!/bin/bash

# Set server IP and pem key path
SERVER_IP="44.220.134.75"
PEM_PATH="AnrescoDemo.pem"
ZIP_FILE="Chromatography.zip"
REMOTE_DIR="/home/ubuntu"
REMOTE_APP_DIR="Chromatography"

echo "🔐 Connecting to server: $SERVER_IP"

# 1. Clean remote files
ssh -i $PEM_PATH ubuntu@$SERVER_IP << EOF
  echo "🧹 Cleaning old files..."
  rm -rf $REMOTE_DIR/$REMOTE_APP_DIR $REMOTE_DIR/$ZIP_FILE
EOF

# 2. Upload ZIP file
echo "📤 Uploading ZIP file..."
scp -i $PEM_PATH $ZIP_FILE ubuntu@$SERVER_IP:$REMOTE_DIR/

# 3. SSH and do the rest on server
ssh -i $PEM_PATH ubuntu@$SERVER_IP << EOF
  echo "📦 Unzipping project..."
  unzip -o $ZIP_FILE

  echo "📥 Installing dependencies..."
  cd $REMOTE_APP_DIR
  npm install

  echo "🔧 Installing Nginx (if not installed)..."
  sudo apt update
  sudo apt install nginx -y

  echo "🗑 Cleaning old Nginx HTML..."
  sudo rm -rf /var/www/html/*

  echo "🚀 Copying build files to Nginx..."
  npm run build
  sudo cp -r build/* /var/www/html/

  echo "🔁 Restarting Nginx..."
  sudo systemctl restart nginx

  echo "✅ Deployment complete!"
EOF
