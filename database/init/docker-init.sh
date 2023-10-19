#!/bin/bash

# Set up postgres files so the database builds properly. Its run alphabetically
project_name="fullstacktemplate" # Must be lower case
db_folder_loc="../database"
schema_location="$db_folder_loc/schema"
schema_build_order_file="$db_folder_loc/init/schema-build-order.txt"
ordered_location="$db_folder_loc/docker-ordered"
db_init_folder="$db_folder_loc/init"

mkdir -p $ordered_location

$(cd $ordered_location; rm ./*);

readarray -t table_names < $schema_build_order_file;

ordered_name='a'
length=$((${#table_names[@]} - 1))
for filename in ${table_names[@]}; do
    ordered_name='a'
    for ((i=$length; i>0; i--)); do
        ordered_name=$ordered_name'a';
    done
    length=$(($length-1))
    cp $schema_location/$filename.sql $ordered_location/$ordered_name.sql
done

# Add the database initialization file
cp $db_init_folder/init-db-testing.sql $ordered_location/zzzzzzzzz.sql



# Actually build the docker container now
cd $db_folder_loc
sudo docker buildx build -t $project_name:db .

# Remove the old container and run the new one
sudo docker stop $project_name
sudo docker rm $project_name
# Create the docker volume for data persistance
sudo docker volume rm     $project_name;     # need to remove the old one or the database won't update
sudo docker volume create $project_name;

sudo docker run -dit -p 5432:5432 -v $project_name:/var/lib/postgresql/data --name $project_name $project_name:db
sudo docker ps -a
