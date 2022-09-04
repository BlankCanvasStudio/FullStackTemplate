#!/bin/bash

# This file will initialize the full schema for the project

source ./globals.sh

readarray -t table_names < $schema_build_order_file;
for filename in ${table_names[@]}; do 
    psql -d $database_name -f "$schema_location/$table_names.sql"
done
