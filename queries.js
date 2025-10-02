// ===========================
// Task 2: Basic CRUD Operations
// ================================

// --- READ Operations ---

// 1. Find all books in a specific genre (Assuming 'Fiction' or 'Classics' exists in your data)
db.books.find({ genre: "Classics" });

// 2. Find books published after a certain year (e.g., after 1950)
db.books.find({ published_year: { $gt: 1950 } });

// 3. Find books by a specific author (e.g., J.R.R. Tolkien)
db.books.find({ author: "J.R.R. Tolkien" });

// --- UPDATE Operation ---

// 4. Update the price of a specific book (e.g., "1984" to $15.99)
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 15.99 } }
);

// --- DELETE Operation ---

// 5. Delete a book by its title (e.g., "Wuthering Heights")
db.books.deleteOne({ title: "Wuthering Heights" });


// =================================================================
// Task 3: Advanced Queries
// =================================================================

// 1. Find books that are both in stock AND published after 2010
// NOTE: Based on your inserted data, you might need to insert a book published after 2010
db.books.find({
    in_stock: true,
    published_year: { $gt: 2010 }
});

// 2. Use projection to return only the title, author, and price fields
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// 3. Implement sorting to display books by price (ascending)
db.books.find().sort({ price: 1 });

// 4. Implement sorting to display books by price (descending)
db.books.find().sort({ price: -1 });

// 5. Use limit and skip for pagination (Page 1: 5 books)
db.books.find().limit(5).skip(0);

// 6. Use limit and skip for pagination (Page 2: 5 books)
db.books.find().limit(5).skip(5);


// =================================================================
// Task 4: Aggregation Pipeline
// =================================================================

// 1. Calculate the average price of books by genre
db.books.aggregate([
    {
        $group: {
            _id: "$genre",
            average_price: { $avg: "$price" },
            total_books: { $sum: 1 }
        }
    }
]);

// 2. Find the author with the most books in the collection
db.books.aggregate([
    {
        $group: {
            _id: "$author",
            book_count: { $sum: 1 }
        }
    },
    { $sort: { book_count: -1 } },
    { $limit: 1 }
]);

// 3. Implement a pipeline that groups books by publication decade and counts them
db.books.aggregate([
    {
        $project: {
            // Calculate the start of the decade (e.g., 1951 -> 1950)
            publication_decade: {
                $subtract: ["$published_year", { $mod: ["$published_year", 10] }]
            }
        }
    },
    {
        $group: {
            _id: "$publication_decade",
            count: { $sum: 1 }
        }
    },
    { $sort: { _id: 1 } }
]);


// =================================================================
// Task 5: Indexing
// =================================================================

// 1. Create an index on the title field for faster searches
db.books.createIndex({ title: 1 });

// 2. Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 }); // 1 for ascending, -1 for descending

// 3. Use the explain() method to demonstrate the performance improvement with your indexes
// BEFORE INDEXING (Run the explain() before creating indexes to see a COLLECTION SCAN)
// db.books.find({ title: "1984" }).explain("executionStats");
// AFTER INDEXING (Run the explain() after creating indexes to see an IXSCAN)
db.books.find({ title: "1984" }).explain("executionStats");
db.books.find({ author: "J.R.R. Tolkien", published_year: { $gt: 1950 } }).explain("executionStats");
