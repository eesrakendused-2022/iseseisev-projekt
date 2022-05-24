const bookNameInput = document.getElementById("new-book-name");
const bookPagesAmountInput = document.getElementById("new-book-pages-amount");
const bookCurrentPageInput = document.getElementById("new-book-current-page");
const addButton = document.getElementById("add-button");
const incompleteBooksHolder = document.getElementById("incomplete-books");
const completedBooksHolder = document.getElementById("completed-books");
const bookNotes = document.getElementById("new-book-notes");
const feedbackButton = document.getElementById("submit");

const createNewBookElement = function (listItemBookName, listItemBookAmountOfPages, listItemBookCurrentPage, listItemBookCurrentNotes) {
    const listItem = document.createElement("li");
    const checkBox = document.createElement("input");

    const bookName = document.createElement("label");
    const bookAmountOfPages = document.createElement("label");
    const bookCurrentPage = document.createElement("label");
    const newBookNotes = document.createElement("label");
    bookName.setAttribute("id", "label-name");
    bookAmountOfPages.setAttribute("id", "label-pages");
    bookCurrentPage.setAttribute("id", "label-progress");
    newBookNotes.setAttribute("id", "label-notes");


    const editInputName = document.createElement("input");
    const editInputPages = document.createElement("input");
    const editInputProgress = document.createElement("input");
    const editInputNotes = document.createElement("input");
    editInputName.setAttribute("id", "input-name");
    editInputPages.setAttribute("id", "input-pages");
    editInputProgress.setAttribute("id", "input-progress");
    editInputNotes.setAttribute("id", "input-notes");


    const editButton = document.createElement("button");    // Button.edit
    const deleteButton = document.createElement("button");  // Button.delete

    checkBox.type = "checkbox";
    editInputName.type = "text";
    editInputPages.type = "text";
    editInputProgress.type = "text";
    editInputNotes.type = "text";
    editInputName.id = "input-name";
    editInputPages.id = "input-pages";
    editInputProgress.id = "input-progress";
    editInputNotes.id = "input-notes";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    bookName.innerText = listItemBookName;
    bookAmountOfPages.innerText = listItemBookAmountOfPages;
    bookCurrentPage.innerText = listItemBookCurrentPage;
    newBookNotes.innerText = listItemBookCurrentNotes;

    listItem.appendChild(checkBox);
    listItem.appendChild(bookName);
    listItem.appendChild(bookAmountOfPages);
    listItem.appendChild(bookCurrentPage);
    listItem.appendChild(newBookNotes);
    listItem.appendChild(editInputName);
    listItem.appendChild(editInputPages);
    listItem.appendChild(editInputProgress);
    listItem.appendChild(editInputNotes);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
};

const addBook = function () {
    const listItemBookName = bookNameInput.value || "Book Name";
    const listItemBookAmountOfPages = bookPagesAmountInput.value || 0;
    const listItemBookCurrentPage = bookCurrentPageInput.value || 0;
    const listItemBookCurrentNotes = bookNotes.value || "Notes";
    const listItem = createNewBookElement(listItemBookName, listItemBookAmountOfPages, listItemBookCurrentPage, listItemBookCurrentNotes);
    incompleteBooksHolder.appendChild(listItem);
    bindBookEvents(listItem, bookCompleted);

    bookNameInput.value = "";
    bookPagesAmountInput.value = "";
    bookCurrentPageInput.value = "";
    bookNotes.value = "";
};

const editBookInfo = function () {
    const listItem = this.parentNode;

    const editInputName = listItem.querySelector('input[id="input-name"]');
    const editInputAmountOfPages = listItem.querySelector('input[id="input-pages"]');
    const editInputProgress = listItem.querySelector('input[id="input-progress"]');
    const editInputNotes = listItem.querySelector('input[id="input-notes"]');

    const labelName = listItem.querySelector("label[id='label-name']");
    const labelAmountOfPages = listItem.querySelector("label[id='label-pages']");
    const labelProgress = listItem.querySelector("label[id='label-progress']");
    const labelNotes = listItem.querySelector("label[id='label-notes']");

    const button = listItem.getElementsByTagName("button")[0];

    const containsClass = listItem.classList.contains("editMode");

    if (containsClass) {
        labelName.innerText = editInputName.value;
        labelAmountOfPages.innerText = editInputAmountOfPages.value;
        labelProgress.innerText = editInputProgress.value;
        labelNotes.innerText = editInputNotes.value;
        button.innerText = "Edit";
    } else {
        editInputName.value = labelName.innerText || "";
        editInputAmountOfPages.value = labelAmountOfPages.innerText || "";
        editInputProgress.value = labelProgress.innerText || "";
        editInputNotes.value = labelNotes.innerText || "";
        button.innerText = "Save";
    }

    listItem.classList.toggle("editMode");
};

const deleteBook = function () {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);

};

const bookCompleted = function () {
    const listItem = this.parentNode;
    completedBooksHolder.appendChild(listItem);
    bindBookEvents(listItem, bookIncomplete);
};

const bookIncomplete = function () {
    const listItem = this.parentNode;
    incompleteBooksHolder.appendChild(listItem);
    bindBookEvents(listItem, bookCompleted);
};

const bindBookEvents = function (bookListItem, checkBoxEventHandler) {
    const checkBox = bookListItem.querySelector("input[type=checkbox]");
    const editButton = bookListItem.querySelector("button.edit");
    const deleteButton = bookListItem.querySelector("button.delete");

    editButton.onclick = editBookInfo;
    deleteButton.onclick = deleteBook;
    checkBox.onchange = checkBoxEventHandler;
};

addButton.addEventListener("click", addBook);

for (let i = 0; i < incompleteBooksHolder.children.length; i++) {
    bindBookEvents(incompleteBooksHolder.children[i], bookCompleted);
}

for (let i = 0; i < completedBooksHolder.children.length; i++) {
    bindBookEvents(completedBooksHolder.children[i], bookIncomplete);
}




const addFeedback = function() {


    const firstName = document.getElementById("name");
    const surName = document.getElementById("surname");
    const email = document.getElementById("email");
    const additionalInfo = document.getElementById("additional-info");
    const errorMessage = "Please fill all blanks!";
    const submitMessage = "Feedback sent!";

    if (firstName == null || surName == null || email == null || additionalInfo == null) {
        document.getElementById("submitConfirmation").innerHTML = submitMessage;
    } else {
        document.getElementById("submitConfirmation").innerHTML = errorMessage;
    }
};

feedbackButton.addEventListener("click", addFeedback);

