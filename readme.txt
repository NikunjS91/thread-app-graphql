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