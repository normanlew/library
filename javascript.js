document.getElementById("form_new_book").style.display = "none";

const myLibrary = [];

class Book { 
    constructor(id, title, author, pages, read) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        return `${this.id}, ${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read'}`;
    }
}

Book.prototype.changeRead = function() {
    this.read = (this.read) ? false : true;
}

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(crypto.randomUUID(), title, author, pages, read);
  myLibrary.push(book);
}

addBookToLibrary("The Seattle Times", "Journalists", 74, false);
addBookToLibrary("The Stand", "Stephen King", 700, true);
addBookToLibrary("How to Win Friends and Influence People", "Dale Carnegie", 320, false);
addBookToLibrary("Harry Potter", "JK Rowling", 573, false);
addBookToLibrary("Atlas Shrugged", "Ayn Rand", 821, true);
addBookToLibrary("A Promised Land", "Barack Obama", 648, true);
addBookToLibrary("Decision Points", "George W Bush", 501, false);

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
        let cell_5 = row.insertCell();
        let button_remove = document.createElement('button');
        button_remove.textContent = "Delete";
        button_remove.className = "remove_button";
        button_remove["data-id"] = book.id;
        button_remove.addEventListener('click', (event) => {
            deleteBook(button_remove["data-id"], library);
        });

        cell_5.appendChild(button_remove);

        let cell_6 = row.insertCell();
        let button_read = document.createElement('button');
        button_read.textContent = "Read";
        button_read.className = "read_button";
        button_read["data-id"] = book.id;
        button_read.addEventListener('click', (event) => {
            changeReadStatus(button_read["data-id"], library);
        });

        cell_6.appendChild(button_read);
    }
}

let table = document.querySelector("table");
generateTable(table, myLibrary);
generateTableHead(table);

let new_book = document.getElementById("new_button");

new_book.addEventListener("click", (event) => {
    console.log("click!!1");
    showNewBookForm();
})

function showNewBookForm() {
    console.log("in showNewBookForm()");
    document.getElementById("form_new_book").style.display = "block";
    console.log(document.getElementById("form_new_book").style.display);
}


const form = document.getElementById('form_new_book');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    event.target.reset();

    console.log(data);
    console.log(typeof(data.read_status))

    addBookToLibrary(data.title, data.author, data.pages, data.read_status === 'read' ? true : false);
    table.innerHTML = "";
    document.getElementById("form_new_book").style.display = "none";
    generateTable(table, myLibrary);
    generateTableHead(table);

});

function deleteBook(book_id, library) {
    const index = myLibrary.findIndex(book => book.id === book_id);
    library.splice(index, 1);
    table.innerHTML = "";
    generateTable(table, library);
    generateTableHead(table);
}

function changeReadStatus(book_id, library) {
    const index = myLibrary.findIndex(book => book.id === book_id);
    library[index].changeRead();
    table.innerHTML = "";
    generateTable(table, library);
    generateTableHead(table);
}
