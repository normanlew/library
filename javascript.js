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

// let table = document.createElement("table");

// table.appendChild()

function generateTableHead(table) {
    let thead = table.createTHead();
    let row = thead.insertRow();

    let th_1 = document.createElement("th");
    let th_2 = document.createElement("th");
    let th_3 = document.createElement("th");
    let th_4 = document.createElement("th");
    let text_1 = document.createTextNode("Title");
    let text_2 = document.createTextNode("Author");
    let text_3 = document.createTextNode("Pages");
    let text_4 = document.createTextNode("Read");
    th_1.appendChild(text_1);
    th_2.appendChild(text_2);
    th_3.appendChild(text_3);
    th_4.appendChild(text_4);
    row.appendChild(th_1);
    row.appendChild(th_2);
    row.appendChild(th_3);
    row.appendChild(th_4);
}

function generateTable(table, library) {
    for (let book of library) {
        let row = table.insertRow();
        let cell_1 = row.insertCell();
        let text_1 = document.createTextNode(book.title);
        cell_1.appendChild(text_1);
        let cell_2 = row.insertCell();
        let text_2 = document.createTextNode(book.author);
        cell_2.appendChild(text_2);
        let cell_3 = row.insertCell();
        let text_3 = document.createTextNode(book.pages);
        cell_3.appendChild(text_3);
        let cell_4 = row.insertCell();
        let text_4 = document.createTextNode(book.read);
        cell_4.appendChild(text_4);

    }
}

let table = document.querySelector("table");
generateTable(table, myLibrary);
generateTableHead(table);
