import express from "express";
import createApolloServer from './graphql/index.js'
import { expressMiddleware } from '@as-integrations/express5';

async function init() {
    const app =express();
const port =Number(process.env.PORT) || 8001

app.use(express.json());

app.get("/",(req,res)=>{
    res.json({message:"Server is up and running"});
});

app.use("/graphql",expressMiddleware(await createApolloServer()))

app.listen(port,()=> console.log(`server started at ${port}`));
    
}

init();


 