#!/bin/python3

import psycopg2, json, sys, subprocess

print('loading users database')

# Get users info from pg

# Set up a connection to the database
conn = psycopg2.connect(
    host="localhost",
    database="fullstacktemplate",
    user="backenduser",
    password="jvNLvz6kuEXxXSveVrhxdoDo7GLcLzuKogS8xbj"
)

# Open a cursor to perform database operations
cur = conn.cursor()

# Execute a query
cur.execute("SELECT ID, EMAIL, FIRST_NAME, LAST_NAME, ADDRESSLINEONE, ADDRESSLINETWO, CITY, STATE, ZIP FROM USERS")

# Fetch the results
rows = cur.fetchall()

# Close the cursor and connection
cur.close()
conn.close()

# Convert the data to array of json
data = []

for row in rows:
    data += [ { 'id':row[0], 'email':row[1], 'first_name':row[3], 
               'last_name':row[4], 'addressLineOne':row[5], 
               'addressLineTwo':row[6], 'city':row[7], 'state':row[8],
               'zip':row[9] } ]


# Send the info the search engine

# Define the maximum chunk size in megabytes
max_chunk_size_mb = 100

# Convert the maximum chunk size to bytes
max_chunk_size_bytes = max_chunk_size_mb * 1024 * 1024

# Generate valid chunk sizes (under 100MB). Assumes none of the JSONs are over 100MB
# Chunks is array of chunks, we iterate over all the strings until the size is too large
# Remove the element if it is, and the full chunk, and then start a new chunk
# Add final chunk once you leave loop
chunks = []
current_array = []

for obj in data:
    current_array += [ obj ]
    if sys.getsizeof(json.dumps(current_array)) >  max_chunk_size_bytes:    # check if size is larger
        current_array = current_array[:-1]
        chunks += [ current_array ]
        current_array = [ obj ]

chunks += [ current_array ]

# Define the curl command
curl_command_start = ['curl', '-s', '-X', 'POST', '-H', 'Content-Type: application/json', '-H', 'Authorization: Bearer V7yVpn_9uPx7-NNq9CLuIrjaOrGGQmLF20TBmssq4hU', '-d' ]
curl_command_end = [ 'localhost:7700/indexes/users/documents' ]

taskUids = []

for chunk in chunks:
    # Run the curl command and capture the output
    full_curl_cmd = curl_command_start + [ json.dumps(chunk) ] + curl_command_end
    output = subprocess.check_output(full_curl_cmd)

    taskUids += [ json.loads(output.decode())['taskUid'] ]

# We could wait for all of these to finish here but I see no point in it yet
# Just leaving the option open
