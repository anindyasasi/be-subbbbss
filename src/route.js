const { addBooksHandler, getAllBooksHandler, getBooksByIdHandler, editBooksByIdHandler, deleteBooksByIdHandler } = require("./handler");

const route = [
    {
      method: 'POST',
      path: '/books',
      handler: addBooksHandler,
    },
    {
      method: 'GET',
      path: '/books',
      handler: getAllBooksHandler,
    },
    {
      method: 'GET',
      path: '/books/{bookId}',
      handler: getBooksByIdHandler,
    },
    {method: 'PUT',
    path: '/books/{bookId}',
    handler: editBooksByIdHandler,
    },
    {method: 'DELETE',
    path: '/books/{bookIds}',
    handler: deleteBooksByIdHandler,
    },
  ];
   
  module.exports = route;
