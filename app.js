import express from 'express';

const app = express();

app.use(express.json());

// MOCK DATABASE
let books = [
    {
        _id: "1",
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self Help",
        price: 450
    },
    {
        _id: "2",
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction",
        price: 300
    },
    {
        _id: "3",
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        category: "Finance",
        price: 350
    }
];

// HOME ROUTE
app.get('/', (req, res) => {
    res.json({
        message: "Books API is running successfully!"
    });
});

// CREATE BOOK
app.post('/api/v1/books', (req, res) => {
    const newBook = {
        _id: Date.now().toString(),
        ...req.body
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book Created Successfully",
        data: newBook
    });
});

// GET ALL BOOKS
app.get('/api/v1/books', (req, res) => {
    const { category } = req.query;

    const result = category
        ? books.filter(book =>
            book.category.toLowerCase() === category.toLowerCase()
          )
        : books;

    res.status(200).json({
        message: "Books retrieved successfully",
        data: result
    });
});

// GET BOOK BY ID
app.get('/api/v1/books/:id', (req, res) => {
    const { id } = req.params;

    const book = books.find(book => book._id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.status(200).json({
        message: "Book retrieved successfully",
        data: book
    });
});

// UPDATE BOOK
app.put('/api/v1/books/:id', (req, res) => {
    const { id } = req.params;

    const index = books.findIndex(book => book._id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    books[index] = {
        ...books[index],
        ...req.body,
        _id: id
    };

    res.status(200).json({
        message: "Book updated successfully",
        data: books[index]
    });
});

// DELETE BOOK
app.delete('/api/v1/books/:id', (req, res) => {
    const { id } = req.params;

    const index = books.findIndex(book => book._id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    books.splice(index, 1);

    res.status(200).json({
        message: "Book deleted successfully"
    });
});

// 404 ROUTE
app.use((req, res) => {
    res.status(404).json({
        message: "Route Not Found"
    });
});

// EXPORT FOR VERCEL
export default app;
