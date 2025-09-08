const express = require("express");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const { MongoClient } = require("mongodb");
const cors = require("cors");

dotenv.config();

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "passop";

const app = express();
const port = 3000;

// Middleware
app.use(bodyparser.json());
app.use(cors());

// MongoDB connection
let db;

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    db = client.db(dbName);
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

// Initialize connection when server starts
connectToMongoDB();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Something went wrong!' });
});

// Get all passwords
app.get("/", async (req, res, next) => {
  try {
    if (!db) {
      throw new Error('Database not connected');
    }
    const collection = db.collection("passwords");
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
  } catch (error) {
    next(error);
  }
});

// Save a new password
app.post("/", async (req, res, next) => {
  try {
    if (!db) {
      throw new Error('Database not connected');
    }
    const password = req.body;
    if (!password.site || !password.username || !password.password) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }
    const collection = db.collection("passwords");
    const result = await collection.insertOne(password);
    res.status(201).json({ success: true, result });
  } catch (error) {
    next(error);
  }
});

// Delete a password by id
app.delete("/", async (req, res, next) => {
  try {
    if (!db) {
      throw new Error('Database not connected');
    }
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, error: 'Missing id' });
    }
    const collection = db.collection("passwords");
    const result = await collection.deleteOne({ id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, error: 'Password not found' });
    }
    res.json({ success: true, result });
  } catch (error) {
    next(error);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Handle process termination
process.on('SIGINT', async () => {
  try {
    await client.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    process.exit(1);
  }
});
