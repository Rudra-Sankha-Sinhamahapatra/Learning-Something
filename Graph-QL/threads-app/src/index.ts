import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  const typeDefs = `
        type Query {
        hello: String,
        say(name:String):String
        }
    `;

  const resolvers = {
    Query: {
      hello: () => `Hey there , I am a graph ql server`,
      say: (_: any, { name }: { name: string }) => `Hey ${name}, how are you?`,
    },
  };

  const gqlServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });

  await gqlServer.start();

  app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is up & Running" });
  });

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(gqlServer)
  );
  app.listen(PORT, () => {
    console.log(`Server is Running on PORT ${PORT}`);
  });
}

init();
