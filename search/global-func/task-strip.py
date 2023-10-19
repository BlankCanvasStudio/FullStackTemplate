#!/bin/python3
import sys, json
task_results_array = json.load(sys.stdin)['results']

# Assume there is 1 entry for each task uid (we will get rid of this assumption in the loop)
uuid_indexed_statues = [ 'processing' for x in task_results_array ]

for task in task_results_array:
    if int(task['uid']) > len(uuid_indexed_statues) - 1:
        delta = int(task['uid']) - (len(uuid_indexed_statues) - 1)
        to_append = [ 'processing' for x in range(0, delta) ]
        uuid_indexed_statues += to_append
    
    uuid_indexed_statues[task['uid']] = task['status']
        
print(' '.join(uuid_indexed_statues))