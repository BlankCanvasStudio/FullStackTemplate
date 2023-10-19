FROM postgres


ENV POSTGRES_PASSWORD=jvNLvz6kuEXxXSveVrhxdoDo7GLcLzuKogS8xbj
# We can make this safer by using: ENV POSTGRES_PASSWORD_FILE=/some/abs/path

ENV POSTGRES_USER=backenduser

# Five the db an actual name
ENV POSTGRES_DB=fullstacktemplate

# Copy all .sql files you want to initialize into this folder so it will 
# create all the tables on startup
# THE FILES ARE RUN IN NAME SORTED ORDER. BIG DEAL
RUN mkdir -p /docker-entrypoint-initdb.d

# Need to actually import this from the build order stuff and do it that way. 
# Works preliminarily
RUN mkdir -p /schema

COPY ./docker-ordered /docker-entrypoint-initdb.d

RUN echo hello world

# To plainl run this, will exit
# sudo docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres testing:v1
# sudo docker run -p 5432:5432 testing:v1 -d postgres
# To build this container 
# sudo docker buildx build -t testing:v1 .
