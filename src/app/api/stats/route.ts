import { client } from "@/lib/mongo";
import { Db } from "mongodb";

export const GET = async () => {
  try {
    // Connect to MongoDB
    await client.connect();

    // Access the database
    const db: Db = client.db("DailySAT");

    // get the count of documents (questions)
    const mathCount = await db.collection("questions-math").countDocuments();
    const readingWritingCount = await db.collection("questions-reading").countDocuments();
    const userCount = await db.collection("users").countDocuments();

    // Return the count as a JSON response
    return Response.json({
      mathCount,
      readingWritingCount,
      userCount
    })
  } catch (error) {
    // Handle errors
    return Response.json({
      error
    })
  } finally {
    // Close the database connection
    await client.close();
  }
};
