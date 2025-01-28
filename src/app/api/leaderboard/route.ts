import { client } from "@/lib/mongo";
import { Db } from "mongodb";

export const GET = async () => {
    try {
      // Connect to MongoDB
      await client.connect();
  
      // Access the database and the relevant collection
      const db: Db = client.db("DailySAT");
      const usersCollection = db.collection("users");
  
      // Fetch and sort users by highest currency
      const sortedUsers = await usersCollection
        .find({})
        .sort({ currency: -1 }) // Sort by currency in descending order
        .limit(15)
        .toArray();
  
      // Return the sorted users as a JSON response
      return Response.json({
        sortedUsers
      })
    } catch (error) {
      return Response.json({
        error
      })
    } finally {
      // Ensure the client connection is closed after the operation
      await client.close();
    }
  };
  