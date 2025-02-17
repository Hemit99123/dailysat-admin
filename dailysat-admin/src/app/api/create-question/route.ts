import { client } from "@/lib/mongo";
import { Db } from "mongodb";
export const POST = async (req: Request) => {
  try {
    // Parse the incoming JSON data from the request body
    const requestBody = await req.json();

    const { type, question, optionA, optionB, optionC, optionD, correctAnswer, explanation, skill } = requestBody;

    // Ensure the necessary fields are provided
    if (!question || !optionA || !optionB || !optionC || !optionD || correctAnswer === undefined || !explanation || !skill) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Connect to MongoDB
    await client.connect();
    const db: Db = client.db("DailySAT");

    // Insert the data into the questions collection
    const result = await db.collection(`${type == "math" ? "questions-math" : type == "reading" && "questions-reading"}`).insertOne({
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
      explanation,
      skill,
    });

    // Return a success response with the inserted document's ID
    return new Response(JSON.stringify({ message: "Question added successfully", id: result.insertedId }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  } finally {
    // Always close the database connection
    await client.close();
  }
};
