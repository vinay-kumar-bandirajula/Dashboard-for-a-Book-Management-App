import axios from "axios";

// Base URL 
const API_URL = process.env.REACT_APP_API_URL;

// GET /books - Fetch all books
export const getBooks = async () => {
  try {
    const response = await axios.get(API_URL);
    // Map _id to id for frontend
    return response.data.map(book => ({
      ...book,
      id: book._id,
    }));
  } catch (err) {
    throw new Error("Failed to fetch books: " + err.message);
  }
};

// Add a book
export const addBook = async (bookData) => {
  const response = await axios.post(API_URL, bookData);
  return {
    ...response.data,
    id: response.data._id, // map _id to id
  };
};

// Update a book
export const updateBook = async (id, updatedData) => {
  await axios.put(`${API_URL}/${id}`, updatedData);
  return { ...updatedData, id }; // return updated book with id
};

// Delete a book
export const deleteBook = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id; // return deleted book id
};