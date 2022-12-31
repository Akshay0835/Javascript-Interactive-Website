console.log("This is Tutorial of index");
//Do- 
// 1. Store all the data in to the localStorage (Done!)
// 2. Give another column as an option to delete the book objects
// 3. Add a scroll bar to the view on R.H.S 

//Constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//Display Constructor
function Display() {

}

//Add methods to display prototype
Display.prototype.add = function (book) {
    console.log('Addding to UI')
    tableBody = document.getElementById('tableBody');
    let uiString = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr> `;
    tableBody.innerHTML += uiString;
}

//Implement the clear function
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

//The logical OR ( || ) operator for a set of operands is true if and only if one or more of its operands is true. 
// It is typically used with boolean (logical) values. When it is, it returns a Boolean value.

//Implement the validate function

Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    }
    else {
        return true;
    }
}
Display.prototype.show = function (type, displayMessage) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message:</strong> ${displayMessage}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
    setTimeout(function () {
        message.innerHTML = ''
    }, 5000);
}


// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('You have submitted the library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;

    let Fiction = document.getElementById('Fiction');
    let Programming = document.getElementById('Programming');
    let Cooking = document.getElementById('Cooking');


    if (Fiction.checked) {
        type = Fiction.value;
    }
    else if (Programming.checked) {
        type = Programming.value;
    }
    else if (Cooking.checked) {
        type = Cooking.value;
    }

    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();

    if (display.validate(book)) {

        display.add(book);
        display.clear();
        display.show('success', 'Your book has been successfully added!')
    }
    else {
        //Show error to the user
        display.show('danger', 'Sorry, you cannot add this book.');
    }

    localStorage.setItem(name, author, type);

    e.preventDefault();
}