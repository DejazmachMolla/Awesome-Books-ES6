import Book from './modules/book.js';

/*
Display books, title and author variables when the window loads
*/

const book = new Book();
book.formSubmitted();
book.addEventListenerForTitle();
book.addEventListenerForAuthor();
book.addEventListenerForNavigation();
window.onload = book.populateBooksOnload();
