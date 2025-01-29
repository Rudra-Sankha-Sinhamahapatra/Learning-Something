import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import axios from "axios";

async function startServer() {
  const app = express();

  const typeDefs = `

    type User {
      id: ID!
      name: String!
      username: String!
      email: String!
      phone: String!
      website: String!
    }

    type Todo {
      id: ID!
      title: String!
      completed: Boolean
      user: User
    }

    type Query {
      getTodos: [Todo]
      getAllUsers: [User]
      getUserById(id: ID!): User
    }
  `;

  const resolvers = {
    Todo: {
      user: async (todo: any) => {
        try {
          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${todo.id}`
          );
          return response.data;
        } catch (error) {
          // console.error("Error fetching user:", error);
          return null;
        }
      },
    },

    Query: {
      getTodos: async () => {
        try {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/todos"
          );
          return response.data;
        } catch (error) {
          // console.error("Error fetching todos:", error);
          return [];
        }
      },

      getAllUsers: async () => {
        try {
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
          );
          return response.data;
        } catch (error) {
          // console.error("Error fetching users:", error);
          return [];
        }
      },

      getUserById: async (parent: any, { id }: any) => {
        try {
          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${id}`
          );
          return response.data;
        } catch (error) {
          // console.error("Error fetching user:", error);
          return null;
        }
      },
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });

  app.use(cors());
  app.use(express.json());

  await server.start();
  app.use("/graphql", expressMiddleware(server));

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/graphql`);
  });
}

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
