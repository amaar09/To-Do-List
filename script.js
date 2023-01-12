// get element from html 

const titleInput = document.querySelector("#titleInput")
const descInput = document.querySelector("#descInput")

const showinDOM = document.querySelector("#showinDOM")
const addBtn = document.querySelector("#addBtn")
checkInlocalStorage()
displayInDom()

// check onjects in localStorage
function checkInlocalStorage() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        // JSON PARSE because because we can only store strings in the window.localStorage object.
        notesObj = JSON.parse(notes);
    }

}
// DOM rendering 
function displayInDom() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        // JSON PARSE because because we can only store strings in the window.localStorage object.
        notesObj = JSON.parse(notes);
    }
    let show = ""
    notesObj.forEach(function (element, index) {
        // console.log(element, index)
        show +=
            `<div id="" class="card" style="width: fit-content;">
            <div id="noteCard" class="card my-2 mx-2" style="width: fit-content;">
                 <div class="dropdown position-absolute top-0 end-0">
                     <button class="btn btn-primary " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                     <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                     </svg>
                     </button>
                     <ul class="dropdown-menu">
                         <li><button class="dropdown-item" value="${index}" id="edit" href="#">Edit</button></li>
                         <li><button class="dropdown-item"  href="#">Details </button></li>
                     </ul>
                 </div>
                <div class="card-body" id="white">
                        <h5 class="card-title" id="titleDisplay">${element.titleVal}</h5>
                        <p class="card-text" id="descDisplay">${element.descVal}</p>
                        <button href="#" id="deleteThis" value="${index}" class="btn btn-primary">Delete</button>
                </div>
                </div>
             </div>`
    })
    // console.log(show)
    showinDOM.innerHTML = show
    // titleInput.value = ""
    // descInput.value = ""
    checkTheInput()
}

let descVal = "";
let titleVal = "";
titleInput.addEventListener('blur', function () {
    // console.log(titleInput.value)
    titleVal = titleInput.value
    checkTheInput()
});
descInput.addEventListener('blur', function () {
    // console.log(descInput.value)
    descVal = descInput.value
    checkTheInput()
});
// check the user input
function checkTheInput() {
    if (titleInput.value !== "" && descInput.value !== "") {
        addBtn.classList.remove("disabled");
    } else {
        addBtn.classList.add("disabled");
    }

}
// what happens when we click on add task
addBtn.addEventListener('click', function () {
    // console.log("add btn")
    // titleDisplay.textContent = `${titleVal}`
    // descDisplay.textContent = `${descVal}`
    checkInlocalStorage()
    setInLocalStorage()
    displayInDom()
})

function setInLocalStorage() {
    let myObj = {
        titleVal: titleInput.value,
        descVal: descInput.value
    }
    notesObj.push(myObj);
    // In the code block, we used the JSON.stringify() method to convert our JavaScript object into a string first because we can only store strings in the LocalStorage
    localStorage.setItem("notes", JSON.stringify(notesObj));

}


//  delete one
document.addEventListener("click", function (e) {
    if (e.target.id === 'deleteThis') {
        // let indexVal = document.querySelectorAll("#deleteThis")
        let indexVal = e.target.value
        // console.log("delete one", indexVal)
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }
        notesObj.splice(indexVal, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        displayInDom();
    }
})

// edit notes
document.addEventListener("click", function (e) {
    if (e.target.id === 'edit') {
        // edit in dom
        const descDisplay = document.querySelectorAll("#descDisplay")
        const titleDisplay = document.querySelectorAll("#titleDisplay")
        let indexVal = e.target.value
        // console.log("edit", e.target, indexVal)
        // console.log(titleDisplay[indexVal].textContent)
        titleInput.value = titleDisplay[indexVal].textContent
        descInput.value = descDisplay[indexVal].textContent

        // delete from localStorage
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }
        notesObj.splice(indexVal, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        displayInDom();

    }
})


// Fn to apply
// search
// delete all notes
// drag and drop