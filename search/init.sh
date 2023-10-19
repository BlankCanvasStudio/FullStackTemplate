#!/bin/bash

# Move to the search folder so pwd works
search_folder='../search'
cd $search_folder

# Stop the old instance
sudo docker stop search_container
sudo docker rm search_container

# DONT PUT master-key VALUE ANYWHERE ELSE FOR THE LOVE OF FUCK
sudo docker run -d --rm \
    -p 7700:7700 \
    --name search_container \
    getmeili/meilisearch:v1.1 \
    meilisearch --master-key="V7yVpn_9uPx7-NNq9CLuIrjaOrGGQmLF20TBmssq4hU"

# Wait for the container to start
while ! docker exec search_container curl -s localhost:7700 > /dev/null; do
  sleep 1
done

echo ""

./users/init.sh

echo ""
echo ""

# Set up user for home page
# key: 17edc23d38949b6c671670a7662e22092159822d3a5a2cd4a1c5627817d2b50b
curl \
  -s \
  -X POST 'http://localhost:7700/keys' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer V7yVpn_9uPx7-NNq9CLuIrjaOrGGQmLF20TBmssq4hU' \
  --data-binary '{
    "name":"HomeSearchKey",
    "description": "Search key for admin page",
    "actions": ["search"],
    "indexes": ["users"],
    "expiresAt": null,
    "uid":"7bd5f503-87be-4d88-884d-510c9c1e4096"
  }'
