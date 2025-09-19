import React, { useState, useEffect } from "react";
import "./homepage.css";
import { getBooks, addBook, updateBook, deleteBook  } from "../services/api";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGenre, setFilterGenre] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookAuthor, setNewBookAuthor] = useState("");
  const [newBookGenre, setNewBookGenre] = useState("");
  const [newBookPublishedYear, setNewBookPublishedYear] = useState("");
  const [newBookStatus, setNewBookStatus] = useState("Available");
  const [titleError, setTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");
  const [genreError, setGenreError] = useState("");
  const [publishedYearError, setPublishedYearError] = useState("");
  const [statusError, setStatusError] = useState("");
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
	const [isFetching, setIsFetching] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

  const booksPerPage = 10;

  const fetchBooks = async () => {
    setIsFetching(true);
    setError("");
    try {
      // const mockBooks = [
      //     { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', publishedYear: 1925, status: 'Available' },
      //     { id: '2', title: '1984', author: 'George Orwell', genre: 'Dystopian', publishedYear: 1949, status: 'Issued' },
      //     { id: '3', title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic', publishedYear: 1960, status: 'Available' },
      //     { id: '4', title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Fiction', publishedYear: 1951, status: 'Available' },
      //     { id: '5', title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', publishedYear: 1813, status: 'Issued' },
      //     { id: '6', title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', publishedYear: 1937, status: 'Available' },
      //     { id: '7', title: 'Lord of the Flies', author: 'William Golding', genre: 'Dystopian', publishedYear: 1954, status: 'Available' },
      //     { id: '8', title: 'Animal Farm', author: 'George Orwell', genre: 'Satire', publishedYear: 1945, status: 'Available' },
      //     { id: '9', title: 'Brave New World', author: 'Aldous Huxley', genre: 'Dystopian', publishedYear: 1932, status: 'Issued' },
      //     { id: '10', title: 'Moby Dick', author: 'Herman Melville', genre: 'Adventure', publishedYear: 1851, status: 'Available' },
      //     { id: '11', title: 'War and Peace', author: 'Leo Tolstoy', genre: 'Historical', publishedYear: 1869, status: 'Available' },
      //     { id: '12', title: 'The Odyssey', author: 'Homer', genre: 'Epic', publishedYear: -800, status: 'Available' },
      //     { id: '13', title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', genre: 'Philosophical', publishedYear: 1866, status: 'Issued' },
      //     { id: '14', title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Philosophical', publishedYear: 1988, status: 'Available' },
      //     { id: '15', title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', genre: 'Fantasy', publishedYear: 1997, status: 'Available' },
      //     { id: '16', title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', genre: 'Fantasy', publishedYear: 1954, status: 'Available' },
      //     { id: '17', title: 'The Chronicles of Narnia', author: 'C.S. Lewis', genre: 'Fantasy', publishedYear: 1950, status: 'Issued' },
      //     { id: '18', title: 'Dune', author: 'Frank Herbert', genre: 'Science Fiction', publishedYear: 1965, status: 'Available' },
      //     { id: '19', title: 'Foundation', author: 'Isaac Asimov', genre: 'Science Fiction', publishedYear: 1951, status: 'Available' },
      //     { id: '20', title: 'Neuromancer', author: 'William Gibson', genre: 'Cyberpunk', publishedYear: 1984, status: 'Available' },
      //     { id: '21', title: 'The Hitchhiker\'s Guide to the Galaxy', author: 'Douglas Adams', genre: 'Science Fiction', publishedYear: 1979, status: 'Available' },
      //     { id: '22', title: 'Frankenstein', author: 'Mary Shelley', genre: 'Gothic', publishedYear: 1818, status: 'Issued' },
      //     { id: '23', title: 'Dracula', author: 'Bram Stoker', genre: 'Gothic', publishedYear: 1897, status: 'Available' },
      //     { id: '24', title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', genre: 'Philosophical', publishedYear: 1890, status: 'Available' },
      //     { id: '25', title: 'Wuthering Heights', author: 'Emily Brontë', genre: 'Romance', publishedYear: 1847, status: 'Available' },
      // ];
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      setError("Failed to fetch books.");
      showNotification("Failed to fetch books.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const showNotification = (message, type) => {
    if (type === "success") {
      setSuccessMessage(message);
      setError("");
    } else {
      setError(message);
      setSuccessMessage("");
    }
    setTimeout(() => {
      setSuccessMessage("");
      setError("");
    }, 3000);
  };

  const validateForm = () => {
    let isValid = true;
    setTitleError("");
    setAuthorError("");
    setGenreError("");
    setPublishedYearError("");
    setStatusError("");

    if (!newBookTitle.trim()) {
      setTitleError("Title is required.");
      isValid = false;
    }
    if (!newBookAuthor.trim()) {
      setAuthorError("Author is required.");
      isValid = false;
    }
    if (!newBookGenre.trim()) {
      setGenreError("Genre is required.");
      isValid = false;
    }
    if (!newBookPublishedYear || isNaN(parseFloat(newBookPublishedYear))) {
      setPublishedYearError("Published year must be a number.");
      isValid = false;
    } else if (
      parseFloat(newBookPublishedYear) < 0 ||
      parseFloat(newBookPublishedYear) > new Date().getFullYear()
    ) {
      setPublishedYearError("Invalid year.");
      isValid = false;
    }
    if (!newBookStatus.trim()) {
      setStatusError("Status is required.");
      isValid = false;
    }
    return isValid;
  };

 const handleAddEditSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) {
    return;
  }
	setIsSaving(true);
  setError('');
  try {
    const bookData = {
      title: newBookTitle,
      author: newBookAuthor,
      genre: newBookGenre,
      publishedYear: parseFloat(newBookPublishedYear),
      status: newBookStatus,
    };

    if (editingBook) {
      // Update existing book
      await updateBook(editingBook._id, bookData); //
      showNotification('Book updated successfully!', 'success');
    } else {
      // Add new book
      await addBook(bookData);
      showNotification('Book added successfully!', 'success');
    }

    // Refresh list
    await fetchBooks();

    // Close modal + reset form
    setShowAddEditModal(false);
    setEditingBook(null);
    resetForm();
  } catch (err) {
    setError(`Failed to ${editingBook ? 'update' : 'add'} book.`);
    showNotification(`Failed to ${editingBook ? 'update' : 'add'} book.`, 'error');
  } finally {
    setLoading(false);
  }
};

  const openAddModal = () => {
    setEditingBook(null);
    resetForm();
    setShowAddEditModal(true);
  };

  const openEditModal = (book) => {
    setEditingBook(book);
    setNewBookTitle(book.title);
    setNewBookAuthor(book.author);
    setNewBookGenre(book.genre);
    setNewBookPublishedYear(String(book.publishedYear));
    setNewBookStatus(book.status);
    resetFormErrors();
    setShowAddEditModal(true);
  };

  const closeModal = () => {
    setShowAddEditModal(false);
    setEditingBook(null);
    resetForm();
  };

  const resetForm = () => {
    setNewBookTitle("");
    setNewBookAuthor("");
    setNewBookGenre("");
    setNewBookPublishedYear("");
    setNewBookStatus("Available");
    resetFormErrors();
  };

  const resetFormErrors = () => {
    setTitleError("");
    setAuthorError("");
    setGenreError("");
    setPublishedYearError("");
    setStatusError("");
  };

  const confirmDelete = (book) => {
    setBookToDelete(book);
    setShowDeleteConfirmModal(true);
  };

const handleDeleteBook = async () => {
  if (!bookToDelete) return;
  setIsDeleting(true);
  setError("");
  try {
    await deleteBook(bookToDelete.id);
    setBooks(books.filter((b) => b.id !== bookToDelete.id));
    showNotification("Book deleted successfully!", "success");
    setShowDeleteConfirmModal(false);
    setBookToDelete(null);
  } catch (err) {
    setError("Failed to delete book.");
    showNotification("Failed to delete book.", "error");
  } finally {
    setLoading(false);
  }
};


  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = filterGenre === "All" || book.genre === filterGenre;
    const matchesStatus =
      filterStatus === "All" || book.status === filterStatus;
    return matchesSearch && matchesGenre && matchesStatus;
  });

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const allGenres = ["All", ...new Set(books.map((book) => book.genre))];
  const allStatuses = ["All", "Available", "Issued"];

  return (
    <div className="container-fluid book-dashboard">
      {/* Dashboard Header */}
      <div className="row dashboard-header mb-4">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="dashboard-title">Book Dashboard</h1>
            <button className="btn btn-primary" onClick={openAddModal}>
              Add New Book
            </button>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="row mb-3">
          <div className="col">
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              {successMessage}
              <button
                type="button"
                className="btn-close"
                onClick={() => setSuccessMessage("")}
              ></button>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="row mb-3">
          <div className="col">
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              {error}
              <button
                type="button"
                className="btn-close"
                onClick={() => setError("")}
              ></button>
            </div>
          </div>
        </div>
      )}

      {/* Filters Section */}
      <div className="row filters-section mb-4">
        <div className="col-md-4 mb-3">
          <label className="form-label">Search by Title/Author:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Filter by Genre:</label>
          <select
            className="form-select"
            value={filterGenre}
            onChange={(e) => {
              setFilterGenre(e.target.value);
              setCurrentPage(1);
            }}
          >
            {allGenres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Filter by Status:</label>
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            {allStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading Spinner */}
      {isFetching  ? (
        <div className="row">
          <div className="col text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="mt-2">Loading books...</div>
          </div>
        </div>
      ) : (
        <>
          {/* Books Table */}
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-striped table-hover mb-0">
                      <thead className="table-dark">
                        <tr>
                          <th>Title</th>
                          <th>Author</th>
                          <th>Genre</th>
                          <th>Published Year</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedBooks.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="text-center py-4">
                              No books found.
                            </td>
                          </tr>
                        ) : (
                          paginatedBooks.map((book) => (
                            <tr key={book.id}>
                              <td className="book-title">{book.title}</td>
                              <td>{book.author}</td>
                              <td>
                                <span className="genre-badge">
                                  {book.genre}
                                </span>
                              </td>
                              <td>
                                {parseFloat(book.publishedYear).toFixed(0)}
                              </td>
                              <td>
                                <span
                                  className={`status-badge ${book.status.toLowerCase()}`}
                                >
                                  {book.status}
                                </span>
                              </td>
                              <td className="actions-cell">
                                <button
                                  className="btn btn-outline-secondary btn-sm me-2"
                                  onClick={() => openEditModal(book)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-outline-danger btn-sm"
                                  onClick={() => confirmDelete(book)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="row mt-4">
              <div className="col">
                <nav>
                  <ul className="pagination justify-content-center">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                      <li
                        key={index + 1}
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </>
      )}

      {/* Add/Edit Modal */}
      {showAddEditModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingBook ? "Edit Book" : "Add New Book"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <div onSubmit={handleAddEditSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                          type="text"
                          className={`form-control ${
                            titleError ? "is-invalid" : ""
                          }`}
                          value={newBookTitle}
                          onChange={(e) => setNewBookTitle(e.target.value)}
                        />
                        {titleError && (
                          <div className="invalid-feedback">{titleError}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Author</label>
                        <input
                          type="text"
                          className={`form-control ${
                            authorError ? "is-invalid" : ""
                          }`}
                          value={newBookAuthor}
                          onChange={(e) => setNewBookAuthor(e.target.value)}
                        />
                        {authorError && (
                          <div className="invalid-feedback">{authorError}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Genre</label>
                        <input
                          type="text"
                          className={`form-control ${
                            genreError ? "is-invalid" : ""
                          }`}
                          value={newBookGenre}
                          onChange={(e) => setNewBookGenre(e.target.value)}
                        />
                        {genreError && (
                          <div className="invalid-feedback">{genreError}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Published Year</label>
                        <input
                          type="number"
                          className={`form-control ${
                            publishedYearError ? "is-invalid" : ""
                          }`}
                          value={newBookPublishedYear}
                          onChange={(e) =>
                            setNewBookPublishedYear(e.target.value)
                          }
                        />
                        {publishedYearError && (
                          <div className="invalid-feedback">
                            {publishedYearError}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className={`form-select ${
                        statusError ? "is-invalid" : ""
                      }`}
                      value={newBookStatus}
                      onChange={(e) => setNewBookStatus(e.target.value)}
                    >
                      <option value="Available">Available</option>
                      <option value="Issued">Issued</option>
                    </select>
                    {statusError && (
                      <div className="invalid-feedback">{statusError}</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddEditSubmit}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Saving...
                    </>
                  ) : editingBook ? (
                    "Update Book"
                  ) : (
                    "Add Book"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteConfirmModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete the book "
                  {bookToDelete?.title}"?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteConfirmModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteBook}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
