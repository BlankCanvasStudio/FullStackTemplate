#!/bin/bash

# run this using: sudo -u postgres init-db.sh (the psql definitely won't work but idk for now. you get what you need to do)

source ./globals.sh

# Create the backendUser and grant access
psql -c \"create user $backend_username with login password '$backend_user_password'\"
psql -c \"GRANT CONNECT ON DATABASE \\\"$database_name\\\" TO \\\"$backend_username\\\"\"
psql -c \"GRANT USAGE ON SCHEMA public TO \\\"$backend_username\\\"\"
psql -c \"GRANT SELECT, INSERT, UPDATE, DELETE, REFERENCES ON ALL TABLES IN SCHEMA public TO \\\"$backend_username\\\"\"

psql
\c PorjectB

# Grant privlidges on all tables to the database user

readarray -t table_names < $schema_build_order_file;
for filename in ${table_names[@]}; do 
    GRANT SELECT, INSERT, UPDATE, DELETE, REFERENCES ON $table_names TO $backend_username;
done

# Let psql user the backendUser role so we can test permissions easily
su -c "psql -c \"GRANT \\\"$backend_username\\\" to postgres\"" postgres

# build and populate the database
sudo ./build-db.sh
sudo ./populate-db.sh
