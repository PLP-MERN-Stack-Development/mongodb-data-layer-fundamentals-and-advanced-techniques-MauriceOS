# Week 1: MongoDB – Data Layer Fundamentals Assignment

This repository contains the solution for the **MongoDB Data Layer Fundamentals and Advanced Techniques** assignment.

The solution consists of two primary files:

- **`insert_books.js`** — Node.js script to populate the database.  
- **`queries.js`** — Contains all required MongoDB CRUD operations, aggregation pipelines, and indexing commands.

---

## Setup and Execution Instructions

Follow these steps to set up the environment and execute the assignment scripts.

### Prerequisites

1. **Node.js** and **npm** installed.  
   Verify:
   ```bash
   node -v
   npm -v
   ```

2. **MongoDB Community Server** (local) or a **MongoDB Atlas** cluster.  
   - Default scripts connect to `mongodb://127.0.0.1:27017`.  
   - To run local server manually:
     ```bash
     mongod --dbpath ~/data/db
     ```

3. **MongoDB Shell (`mongosh`)** installed.  
   Verify:
   ```bash
   mongosh --version
   ```

4. *(Optional)* **MongoDB Compass** for GUI verification.

---

## Step 1 — Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```
Replace `<repository-url>` and `<repository-folder>` with your repo details.

---

## Step 2 — Populate the Database (Task 1 & Initial Data)

Run the `insert_books.js` script using Node.js to create the `plp_bookstore` database, the `books` collection, and insert the initial 12 documents.

```bash
# Ensure your MongoDB server is running
node insert_books.js
```

**Expected output (single-line):** `"12 books were successfully inserted into the database"`

---

## Step 3 — Run Queries and Advanced Tasks (Tasks 2–5)

The `queries.js` file contains all required CRUD operations, advanced queries, aggregation pipelines, and indexing commands. Execute it from the MongoDB Shell:

```bash
# 1. Launch the MongoDB Shell
mongosh

# 2. Switch to the assignment database
use plp_bookstore

# 3. Load and execute the queries script
load('queries.js')
```

The shell will display the results for each query, update, delete, and index creation executed by the script.

---

## Step 4 — Verification

You can verify results using **MongoDB Compass** or **MongoDB Atlas**:

- **Documents Tab**
  - The `books` collection should contain **11 documents** (one document removed by the script).
  - The price of *"1984"* should be updated to the value set by the `queries.js` updates.

- **Indexes Tab**
  - You should see at least two new indexes created by the script:
    - An index on `title`
    - A compound index on `author` and `published_year`

---

## Repository Structure

```
.
├── insert_books.js   # Script to populate the database with initial 12 documents
├── queries.js        # CRUD operations, aggregations, and index commands
└── README.md         # This file
```

---

## Troubleshooting

- **MongoDB server not running**
  ```bash
  # Start the server (example)
  mongod --dbpath ~/data/db
  ```

- **`mongosh` not found**
  - Reinstall MongoDB Shell and ensure `mongosh` is in your PATH.
  - Verify with: `mongosh --version`

- **`load('queries.js')` produces no output**
  - Confirm you executed `use plp_bookstore` before `load('queries.js')`.
  - Ensure `queries.js` path is correct relative to where you launched `mongosh`.

- **Using MongoDB Atlas**
  - Replace the connection string in any script that uses the local URI:
    ```js
    // Example: replace with your Atlas connection string
    const uri = 'mongodb+srv://<user>:<password>@cluster0.example.mongodb.net/plp_bookstore?retryWrites=true&w=majority';
    ```

---

## Notes

- Scripts default to `mongodb://127.0.0.1:27017`. Update connection strings in `insert_books.js`/`queries.js` if using Atlas.
- Ensure MongoDB server is running before executing `node insert_books.js` or loading `queries.js` in `mongosh`.
- This README documents **all steps**: prerequisites, cloning, population, running the queries, verification, repository layout, and troubleshooting.

---
