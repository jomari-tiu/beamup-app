import { Client, Account, Avatars, Databases } from "react-native-appwrite";

export const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("683f09340020ff7aed03")
  .setPlatform("dev.jom.beamup");

export const account = new Account(client);

export const avatars = new Avatars(client);

export const databases = new Databases(client);
