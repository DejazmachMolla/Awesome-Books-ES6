import { DateTime } from '../node_modules/luxon/build/es6/luxon.js';

export default class Book {
  constructor() {
    this.awesomeBooks = document.querySelector('#awesome-books');
    this.formSelector = document.querySelector('form');
    this.titleSelector = document.getElementById('title');
    this.authorSelector = document.getElementById('author');
    this.allBtnSelector = this.awesomeBooks.querySelectorAll('.btn');

    this.books = JSON.parse(localStorage.getItem('booksLocalStorage')) || [];
    this.title = localStorage.getItem('currentTitle') || null;
    this.author = localStorage.getItem('currentAuthor') || null;
    this.listSelector = document.getElementById('list-navigation');
    this.addSeclector = document.getElementById('add-navigation');
    this.contactSeclector = document.getElementById('contact-navigation');
    this.navigationSelector = document.getElementById('navigation');

    this.addSection = document.getElementById('added-book');
    this.formSection = document.getElementById('form-container');
    this.contactSection = document.getElementById('contact');
  }

  display = () => {
    this.awesomeBooks.innerHTML += `
  
      <li id="${this.id}">
      <h2>"${this.title}"  by   ${this.author}</h2>
      <button class="btn button-shadow">remove</button>
      </li>
  
      `;
  }

  remove = (id) => {
    this.books = this.books.filter((book) => book.id !== id);
    localStorage.setItem('booksLocalStorage', JSON.stringify(this.books));
    this.removeBorderFromBooks();
  }

  addEventListenersForRemoveButtons = () => {
    this.allBtnSelector = this.awesomeBooks.querySelectorAll('.btn');
    this.allBtnSelector.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const parent = e.target.parentNode;
        this.remove(parent.id);
        parent.remove();
      });
    });
  }

  add = (bookObj) => {
    if (this.books.length === 0) {
      document.getElementById('no-book').style.display = 'none';
    }
    this.display();
    this.books.push(bookObj);
    localStorage.setItem('booksLocalStorage', JSON.stringify(this.books));
    localStorage.setItem('currentTitle', '');
    localStorage.setItem('currentAuthor', '');
    this.addEventListenersForRemoveButtons();
    this.addBorderToBooks();
    this.loadListPage();
  }

  formSubmitted = () => {
    this.formSelector.onsubmit = (e) => {
      e.preventDefault();
      const { title, author } = e.target;
      const book = new Book();
      book.title = title.value;
      book.author = author.value;
      book.id = Date.now().toString();

      const bookObj = {
        title: title.value,
        author: author.value,
        id: Date.now().toString(),
      };
      book.add(bookObj);
      e.target.title.value = '';
      e.target.author.value = '';
    };
  }

  addEventListenerForTitle = () => {
    this.titleSelector.addEventListener('keyup', (e) => {
      e.preventDefault();
      localStorage.setItem('currentTitle', e.target.value);
    });
  }

  addEventListenerForAuthor = () => {
    this.authorSelector.addEventListener('keyup', (e) => {
      e.preventDefault();
      localStorage.setItem('currentAuthor', e.target.value);
    });
  }

  populateBooksOnload = () => {
    this.loadListPage();
    Book.startTime();
    this.books.forEach((book) => {
      const b = new Book();
      b.title = book.title;
      b.author = book.author;
      b.id = book.id;
      b.display();
    });

    document.getElementById('title').value = this.title;
    document.getElementById('author').value = this.author;
    this.addEventListenersForRemoveButtons(this.awesomeBooks);
    this.removeBorderFromBooks();
  }

  removeBorderFromBooks = () => {
    if (this.books.length === 0) {
      this.awesomeBooks.style.border = 'none';
      document.getElementById('no-book').style.display = 'block';
    } else {
      document.getElementById('no-book').style.display = 'none';
    }
  }

  addBorderToBooks = () => {
    this.awesomeBooks.style.border = '2px solid black';
  }

  addEventListenerForNavigation = () => {
    this.navigationSelector.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target && e.target.textContent === 'List') {
        this.addSection.style.display = 'block';
        this.formSection.style.display = 'none';
        this.contactSection.style.display = 'none';
      } else if (e.target && e.target.textContent === 'Add New') {
        this.addSection.style.display = 'none';
        this.formSection.style.display = 'block';
        this.contactSection.style.display = 'none';
      } else if (e.target && e.target.textContent === 'Contact') {
        this.addSection.style.display = 'none';
        this.formSection.style.display = 'none';
        this.contactSection.style.display = 'block';
      }
    });
  }

  loadListPage = () => {
    this.addSection.style.display = 'block';
    this.formSection.style.display = 'none';
    this.contactSection.style.display = 'none';
  }

  static getDateTimeString = () => DateTime.now().toLocaleString(DateTime.DATETIME_MED)

  static startTime = () => {
    setInterval(() => {
      document.getElementById('timer').innerHTML = Book.getDateTimeString();
    },
    1000);
  }
}