import express from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { prismaClient } from "./lib/db.js";

async function init() {
    const app =express();
const port =Number(process.env.PORT) || 8001

app.use(express.json());

//create the server.
const gqlServer = new ApolloServer({
    typeDefs:`
    type Query{
        hello:String,
        say(name:String):String,
        }
        type Mutation{
        createUser(firstName: String!,lastName: String!,email: String!,password: String!): Boolean
        }`,


    resolvers:{
        Query:{
            hello: ()=>`hello there, i am a graphql server`,
            say:(_,{name}:{name:String}, )=>`hey ${name}, how are you?`,
        },
        Mutation:{
            createUser: async(_,
                {firstName,lastName,email,password}:{
                firstName: string;
                lastName: string;
                email: string;
                password: string;
            }
        )=>{await prismaClient.user.create({
            data:{
                email,firstName,
                lastName,password,
                salt:'random_salt',
            },
        })
    return true;
    },
        }
    }
})

//start the gqlserver
await gqlServer.start();




app.get("/",(req,res)=>{
    res.json({message:"Server is up and running"});
});

app.use("/graphql",expressMiddleware(gqlServer))

app.listen(port,()=> console.log(`server started at ${port}`));
    
}

init();


 