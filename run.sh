#!/bin/bash
REACT_ROOTDIR="./client"

sudo systemctl reload postgresql
sudo systemctl reload nginx
npm run build           # Build ts backend
npm run start           # Run the backend server
cd $REACT_ROOTDIR
npm start               # Run react frontend server
