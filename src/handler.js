const { nanoid } = require('nanoid');
const books = require('./books');

// kriteria 3
const addBooksHandler = (request, h) => {
    const{
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload;

    if (!name) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    }
  if (readPage > pageCount){
      const response = h.response({
          status: 'fail',
          message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
  }

    const id = nanoid(16);
    const finished = (pageCount === readPage);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newbook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt
    };
    books.push(newbook);
    
    const isSuccess = books.filter((book) => book.id === id).length > 0;
 
    if (isSuccess) {
      const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      });
      response.code(201);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
};

// kriteria 4
const getAllBooksHandler = (request, h) => {
    const { name, reading, finished } = request.query
  
    if (name) {
      const lowName = name.toLowerCase()
  
      const response = h.response({
        status: 'success',
        data: {
          books: books
            .filter((n) => n.name === lowName)
            .map((books) => ({
              id: books.id,
              name: books.name,
              publisher: books.publisher
            }))
        }
      })
      response.code(200)
      return response
    }
  
    if (reading === '1') {
      const response = h.response({
        status: 'success',
        data: {
          books: books
            .filter((r) => r.reading === true)
            .map((books) => ({
              id: books.id,
              name: books.name,
              publisher: books.publisher
            }))
        }
      })
      response.code(200)
      return response
    }
  
    if (reading === '0') {
      const response = h.response({
        status: 'success',
        data: {
          books: books
            .filter((r) => r.reading === false)
            .map((books) => ({
              id: books.id,
              name: books.name,
              publisher: books.publisher
            }))
        }
      })
      response.code(200)
      return response
    }
  
    if (finished === '1') {
      const response = h.response({
        status: 'success',
        data: {
          books: books
            .filter((f) => f.finished === true)
            .map((books) => ({
              id: books.id,
              name: books.name,
              publisher: books.publisher
            }))
        }
      })
      response.code(200)
      return response
    }
  
    if (finished === '0') {
      const response = h.response({
        status: 'success',
        data: {
          books: books
            .filter((f) => f.finished === false)
            .map((books) => ({
              id: books.id,
              name: books.name,
              publisher: books.publisher
            }))
        }
      })
      response.code(200)
      return response
    }
  
    const response = h.response({
      status: 'success',
      data: {
        books: books.map((m) => ({
          id: m.id,
          name: m.name,
          publisher: m.publisher
        }))
      }
    })
    response.code(200)
    return response
  }

// kriteria 5
const getBooksByIdHandler = (request, h) => {
  const { bookId } = request.params

  const book = books.filter((book) => book.id === bookId)[0]
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book
      }
    }
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  })
  response.code(404)
  return response
}

// kriteria 6
const editBooksByIdHandler = (request, h) => {
  // Mendapatkan ID
  const { bookId } = request.params;

  // Mendapatkan Data Dari Body
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  }

  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

// kriteria 7
const deleteBooksByIdHandler = (request, h) => {
  const { bookId } = request.params;
 
  const index = books.findIndex((book) => book.id === bookId);
 
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
 
 const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
 
module.exports = { addBooksHandler, getAllBooksHandler, getBooksByIdHandler, editBooksByIdHandler, deleteBooksByIdHandler};
