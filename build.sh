#!/bin/bash

# This script will ground up build the project in an arch environment
# Please fix 3 different fucking installers. Lets get 1 install dependency going

# Install dependencies
sudo pacman -S nginx yarn npm nodejs postgresql

sudo npm install cookie-parser passport passport-jwt passport-local jsonwebtoken
sudo npm install pg sequelize typescript ts-node express 
sudo npm install sequelize-typescript reflect-metadata
sudo npm install dotenv npx body-parser
sudo npm install react react-dom

# Add development dependencies for TypeScript 
sudo npm install @types/node @types/express @types/pg

# Add nodemon and concurrently to help TS compile
sudo npm install nodemon concurrently

# Build the typescript server
npm run build

cat nginx.conf > /etc/nginx/nginx.conf
sudo systemctl enable nginx 
sudo systemctl start nginx




