import Book from './modules/book.js';

const book = new Book();
book.formSubmitted();
book.addEventListenerForTitle();
book.addEventListenerForAuthor();
book.addEventListenerForNavigation();
window.onload = book.populateBooksOnload();
