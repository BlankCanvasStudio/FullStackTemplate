#!/bin/bash

cd ./users

echo ""   # For readability

# Set up the users search api key
# Key is found by hashing the UID and the master key. Makes us able to give away that key 
# Key: d79b947574967d1d20d78e0f0ebd19610042471fbd7ee7a2786cd949d4d6fe9d
curl \
  -s \
  -X POST 'http://localhost:7700/keys' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer V7yVpn_9uPx7-NNq9CLuIrjaOrGGQmLF20TBmssq4hU' \
  --data-binary '{
    "name":"PublicUsersSearchKey",
    "description": "Search for users key",
    "actions": ["search"],
    "indexes": ["users"],
    "expiresAt": null,
    "uid":"79d3e0de-9089-4714-addd-461181bcdb94"
  }'

echo ""   # For readability
echo ""   # For readability

# Set up the users index
user_index_creation_task_uid=\
$(curl \
  -s \
  -X POST 'http://localhost:7700/indexes' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer V7yVpn_9uPx7-NNq9CLuIrjaOrGGQmLF20TBmssq4hU' \
  --data-binary '{
    "uid": "users",
    "primaryKey": "id"
  }' | \
  python3 -c "import sys, json; print(json.load(sys.stdin)['taskUid'])")

echo ""
echo ""

# Idle until the users index gets created
while [ "${task_status_array[$user_index_creation_task_uid]}" != "succeeded" ]
do

# sleep for a second, download the new task status, convert it to an array then test the condition again
sleep 1;
task_status_array_string=\
$(curl \
  -s \
  -H 'Authorization: Bearer V7yVpn_9uPx7-NNq9CLuIrjaOrGGQmLF20TBmssq4hU' \
  -X GET 'http://localhost:7700/tasks' | \
  ../global-func/task-strip.py)
readarray -t task_status_array <<< "$task_status_array_string"
read -d '' -t 0.1


done

# Now that the users index exits, we can load it with a handy little script
echo ""
./load-index.py

# Set the displayed attributes for users index. Don't expose people's emails
curl \
  -s \
  -X PUT 'http://localhost:7700/indexes/users/settings/displayed-attributes' \
  -H 'Authorization: Bearer V7yVpn_9uPx7-NNq9CLuIrjaOrGGQmLF20TBmssq4hU' \
  -H 'Content-Type: application/json' \
  --data-binary '[
    "id",
    "username",
    "first_name", 
    "last_name"
  ]'

# Set the searchable attributes for users index. DO make it searchable by email though. Hopefully not gonna doxx people
curl \
  -s \
  -X PUT 'http://localhost:7700/indexes/users/settings/searchable-attributes' \
  -H 'Authorization: Bearer V7yVpn_9uPx7-NNq9CLuIrjaOrGGQmLF20TBmssq4hU' \
  -H 'Content-Type: application/json' \
  --data-binary '[
    "username",
    "email",
    "first_name",
    "last_name"
  ]'

# Do not allow for typos on the email field? Data security risk?
curl \
  -s \
  -X PATCH 'http://localhost:7700/indexes/users/settings/typo-tolerance' \
  -H 'Authorization: Bearer V7yVpn_9uPx7-NNq9CLuIrjaOrGGQmLF20TBmssq4hU' \
  -H 'Content-Type: application/json' \
  --data-binary '{
    "disableOnAttributes": ["email"]
  }'


echo ""
echo ""

# Set up user account for the backend which can add to the users index
# Key: b9e05846ec132cc8170d1893692c72ab1119c3b240dbeb94b4e9bc2368777ef1
curl \
  -s \
  -X POST 'http://localhost:7700/keys' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer V7yVpn_9uPx7-NNq9CLuIrjaOrGGQmLF20TBmssq4hU' \
  --data-binary '{
    "name":"BackendUserAddKey",
    "description": "Key for backend to update users in the search engine",
    "actions": ["documents.add", "documents.delete"],
    "indexes": ["users"],
    "expiresAt": null,
    "uid":"ef0c87fe-89ed-4584-80ed-1aff2a049f3b"
  }'
