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
            <div draggable="true" id="noteCard" class="card my-2 mx-2" style="width: fit-content;">
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



// drag and drop
let tempTitel = ""
let tempDesc = ""
document.addEventListener("dragstart", (e) => {
    if (e.target.id === 'noteCard') {
        // console.log("dragstart")
        e.target.classList.add("bg-warning");
        // console.log(e.target.querySelector("#titleDisplay"))
        // console.log(e.target.querySelector("#descDisplay"))
        tempTitel = e.target.querySelector("#titleDisplay").textContent
        tempDesc = e.target.querySelector("#descDisplay").textContent
        // console.log(e.target.querySelector("#deleteThis"))
    }
})
document.addEventListener("dragend", (e) => {
    if (e.target.id === 'noteCard') {
        // console.log("dragend is triggerd");
        e.target.classList.remove("bg-warning");
        if (tempHEAD !== "" && tempaPARA != "") {
            e.target.querySelector('h5').textContent = tempHEAD
            e.target.querySelector('p').textContent = tempaPARA
        }
    }
})
let tempHEAD = "";
let tempaPARA = "";

// const elem = document.querySelectorAll("#showinDOM")
const elem = document.querySelectorAll("#white")
elem.forEach((element) => {

    element.addEventListener("dragover", (e) => {
        // console.log("dragOver is triggred");
        e.preventDefault();
    })
    element.addEventListener("dragenter", (e) => {
        // console.log("draEnter is triggred");
        e.target.classList.add("bg-danger");
    })
    element.addEventListener("dragleave", (e) => {
        // console.log("dragLeave is triggred");
        e.target.classList.remove("bg-danger");

    })
    element.addEventListener("drop", (e) => {
        // console.log(e.target.querySelector("#titleDisplay"))
        // console.log(e.target.querySelector("#descDisplay"))

        if (e.target.querySelector('h5') && e.target.querySelector('p')) {
            tempHEAD = e.target.querySelector("h5").textContent
            tempaPARA = e.target.querySelector("p").textContent

            console.log("drop is triggred");

            e.target.querySelector("#titleDisplay").textContent = tempTitel
            e.target.querySelector("#descDisplay").textContent = tempDesc
            e.target.classList.remove("bg-danger");
            // console.log(e.target.querySelector("#deleteThis")
        }
    })
})

// search
// delete all notes
// priority based