const STORAGE_KEY = 'ReaLena_Library';
let books = [];

const checkStorage = () => {
  if (typeof Storage == undefined) {
    alert('Your Browser not support web storage');
    return false;
  }

  return true;
};

const saveData = () => {
  const parseData = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parseData);
  document.dispatchEvent(new Event('ondatasaved'));
};

const loadDatafromStorage = () => {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  const data = JSON.parse(serializedData);

  if (data !== null) books = data;

  document.dispatchEvent(new Event('ondataloaded'));
};

const updateDataToStorage = () => {
  if (checkStorage()) saveData();
};

const composeBookObject = (bookTitle, bookAuthor, bookDate, Completed) => {
  return {
    id: +new Date(),
    bookTitle,
    bookAuthor,
    bookDate,
    Completed,
  };
};

const findBook = (bookId) => {
  for (book of books) {
    if (book.id === bookId) return book;
  }

  return null;
};

const findBookIndex = (bookId) => {
  let index = 0;
  for (book of books) {
    if (book.id === bookId) return index;

    index++;
  }

  return -1;
};

const refreshDataFromBooks = () => {
  const bookUncompleted = document.getElementById(UNREAD_BOOK_ID);
  let bookCompleted = document.getElementById(READ_BOOK_ID);

  for (book of books) {
    const newBook = makeBook(book.bookTitle, book.bookAuthor, book.bookDate, book.Completed);
    newBook[BOOK_ITEMID] = book.id;

    if (book.Completed) {
      bookCompleted.append(newBook);
    } else {
      bookUncompleted.append(newBook);
    }
  }
};
