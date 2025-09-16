all the code of typescript will go in src folder.
what ever we build in in src after bulding it will be in./build.

yarn add @types/express -D 
due this is a typescript we have to compile first
before than we need to insatll tsc-watch -D

  "dev": "tsc-watch --onSuccess \"npm start\""
  on onSuccess compilation it will run the code with npm

now we need to setup the apollo graphql server.
yarn add @apollo/server

import { ApolloServer } from '@apollo/server';
//middleware
import { expressMiddleware } from '@as-integrations/express5';

creating a graphql server


we use typedefs and resolvers inside which we define scheme , query and resolvers i mean we will pass inside it.

to start the graphql server await is used but in global level we cant use await.
to resolve that we cut whole code inside a async functions.

now that we have created the gqlserver now its started now we need to expose it.
meaning a router through which we can interact with the graphql server.

    app.use("/grapthql",expressMiddleware(gqlServer))

this server response or communicate with only json format.

    app.use(express.json());
this means to parse the request in json.

need to add graphql also.
    yarn add graphql

in typedefs we give scheme as a String.

resolver are the actual functions which does the execution.

http://localhost:8001/graphql with this we can enter the ApolloServer it is a studio in which we can test queries.

npx gitignore node
to generate git file
inside that,
dist
build
we can build the build folder so dont generate it.
git add .
git commit -m "Graphql Server Setup"

we use docker compose to setup postgres in development.
this goes inside the docker-compose.yml

version: '3.4'
services:
  postgres:
    container_name: threads-db
    image: postgres
    ports:
      -5432:5432
    volumes:
      -postgres_data:var/lib/postgresql/data
    environment:
      POSTGRES_USER:postgres
      POSTGRES_DB:threads
      POSTGRES_PASSOWORD:threads
volumes:
  postgres_data:

  how to run this?

  version: '3.4'
services:
  postgres:
    container_name: threads-db
    image: postgres
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: postgres
      POSTGRES_DB: threads
      POSTGRES_PASSWORD: threads
volumes:
  postgres_data:

  then do: docker compose up

now till now we have created simple garphql server having single query. we had docker compose file and we ran postgres in that
we will connect the postgres to out application using prsima.


in the docker dashboard we can see a stack,
this is beacuse we ran a command "docker compose up" that created this stack and thread-db is the name of the container_name from docker-compose.yml

now lets run docker compose up, with this stack will be up and running.
if we check the log we can see the postgres running. 

now run docker compose -d this will run the container in background.


now we will setup prisma.

yarn add prisma typescript ts-node @types/node -d


now we need to nod npx prisma init
  after this command we can see the .end files is generated and prisma folder with its schema file.
  now are going to write our schema and connect out docker container with it.
    
DATABASE_URL="postgresql://postgres:threads@loaclhost:5432/threads?schema=public"
database connectivity.

now after writing the schema in prisma 
now int we will enter the bash of the docker container.
and get inside the postgresql.
with command \c threads : it will connect me to the database

npx prisma migrate dev --name create_users_table