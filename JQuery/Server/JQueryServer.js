const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const app = express();

// Typdefinitionen definieren die Struktur der Daten und Operationen.
const typeDefs = gql`
  type User {
    id: ID!
    name: String
    email: String
    penisLaenge: String 
    friends: [User]
  }

  type Query {
    user(id: ID!): User
  }
`;

// Resolver sind Funktionen, die bestimmen, wie die Daten für eine Anfrage gefetcht werden.
const resolvers = {
  Query: {
    user: async (parent, args, context, info) => {
      const users = [
        { id: "1", name: "Alice", email: "alice@example.com", penisLaenge: "30cm", friends: [{ id: "2", name: "Bob" }] },
        { id: "2", name: "Bob", email: "bob@example.com", penisLaenge: "5cm", friends: [{ id: "1", name: "Bob" }] },
        { id: "3", name: "Charlie", email: "charlie@kacke", penisLaenge: "10cm", friends: [{ id: "1", name: "Alice" }, { id: "2", name: "Bob"} ]},
        { id: "4", name: "David", email: "david@kacke", penisLaenge: "15cm", friends: [{ id: "1", name: "Alice" }]}
      ];

      return users.find(user => user.id === args.id);
    }
  }
};

// Apollo Server mit Typdefinitionen und Resolvers initialisieren.
const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    // Express-Server starten
    app.listen({ port: 4000 }, () => {
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    });
}

startServer();
