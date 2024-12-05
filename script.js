let books = [];


const inputBookForm = document.getElementById('inputBook');
const searchBookForm = document.getElementById('searchBook');
const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
const completeBookshelfList = document.getElementById('completeBookshelfList');


function generateId() {
  return +new Date();
}


function createBookObject(id, title, author, year, isComplete) {
  return { id, title, author, year, isComplete };
}


function addBookToShelf(book) {
  const bookElement = document.createElement('article');
  bookElement.classList.add('book_item');
  bookElement.setAttribute('data-id', book.id);

  bookElement.innerHTML = `
    <h3>${book.title}</h3>
    <p>Penulis: ${book.author}</p>
    <p>Tahun: ${book.year}</p>
  `;

  const actionContainer = document.createElement('div');
  actionContainer.classList.add('action');

  const toggleReadButton = document.createElement('button');
  toggleReadButton.classList.add('green');
  toggleReadButton.textContent = book.isComplete ? 'Belum selesai di Baca' : 'Selesai dibaca';

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('red');
  deleteButton.textContent = 'Hapus buku';


  toggleReadButton.addEventListener('click', () => {
    book.isComplete = !book.isComplete;
    saveAndRender();
  });


  deleteButton.addEventListener('click', () => {
    books = books.filter((b) => b.id !== book.id);
    saveAndRender();
  });

  actionContainer.append(toggleReadButton, deleteButton);
  bookElement.appendChild(actionContainer);

  if (book.isComplete) {
    completeBookshelfList.appendChild(bookElement);
  } else {
    incompleteBookshelfList.appendChild(bookElement);
  }
}


function saveAndRender() {
  localStorage.setItem('books', JSON.stringify(books));
  renderBooks();
}

// Render books
function renderBooks() {
  incompleteBookshelfList.innerHTML = '';
  completeBookshelfList.innerHTML = '';

  books.forEach(addBookToShelf);
}


inputBookForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById('inputBookTitle').value;
  const author = document.getElementById('inputBookAuthor').value;
  const year = document.getElementById('inputBookYear').value;
  const isComplete = document.getElementById('inputBookIsComplete').checked;

  const newBook = createBookObject(generateId(), title, author, year, isComplete);
  books.push(newBook);

  inputBookForm.reset();
  saveAndRender();
});


searchBookForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const searchTerm = document.getElementById('searchBookTitle').value.toLowerCase();
  renderBooks();

  if (searchTerm) {
    books.forEach((book) => {
      const bookElement = document.querySelector(`[data-id="${book.id}"]`);
      if (!book.title.toLowerCase().includes(searchTerm)) {
        bookElement.style.display = 'none';
      }
    });
  }
});

window.addEventListener('load', () => {
  const storedBooks = localStorage.getItem('books');
  if (storedBooks) {
    books = JSON.parse(storedBooks);
  }
  renderBooks();
});
