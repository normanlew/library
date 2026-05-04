const myLibrary = [];

function Book(id, title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        return `${this.id}, ${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read'}`;
    }
}

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(crypto.randomUUID(), title, author, pages, read);
  myLibrary.push(book);
}

addBookToLibrary("The Seattle Times", "Journalists", 74, false);
addBookToLibrary("The Stand", "Stephen King", 700, true);
addBookToLibrary("How to Win Friends and Influence People", "Dale Carnegie", 320, false);

// function displayLibrary() {
//     myLibrary.forEach((book => {
//         console.log(book);
//     }))
// }
