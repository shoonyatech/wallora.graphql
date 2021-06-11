import { gql } from "apollo-server";

const typeDef = gql`
  type UserSettings {
    currency: String
    accountId: String
  }

  type User {
    userSettings: UserSettings
  }

  type Query {
    user: User
  }
`;

export { typeDef };
