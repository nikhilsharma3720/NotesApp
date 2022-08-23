let searchTxt = "";
let searchBtn = document.querySelector("#search-btn");
let addBtn = document.getElementById("addBtn");
let notesElm = document.getElementById("notes");
let search = document.getElementById("searchTxt");
let notes = [];
let logoutBtn = document.getElementById("logout-btn");
let firestore = firebase.firestore();
let database = {
  users: firestore.collection("users"),
}
let uid = localStorage.getItem("user");

console.log(uid);

async function func(){
  let obj = await database.users.doc(uid).get();
  // console.log("HI",obj.data().notes);
  notes = obj.data().notes;
  console.log(notes);
  localStorage.setItem("notes",JSON.stringify(notes));
}

func().then(() => {showNotes()});

async function func2(notes){
  await database.users.doc(uid).set(
    {
      notes:[...notes],
    });
}

if(localStorage.getItem("user") == null){
  window.location.href = "http://127.0.0.1:5500/index.html";
}

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(notes.length, searchTxt);
  if (notes.length > 0 && searchTxt !== "") {
    console.log("Inside");
    let narr = notes.filter((elem) => elem.title.toLowerCase().includes(searchTxt.toLowerCase()));
    showNotes2(narr);
  } else if (searchTxt == "" || searchTxt.length === 0) {
    showNotes2(notes);
  }
})

function deleteNote(index) {
  notes.splice(parseInt(index), 1);
  localStorage.setItem("notes", JSON.stringify(notes));

  showNotes();
}

function func3(){
  let deleteElem = document.querySelectorAll(".delete-note");
  deleteElem.forEach(elem => {
    elem.addEventListener("click",() => deleteNote(elem.id));
  })
}

function showNotes2(notesArr) {
  let html = "";
  notesArr.forEach(function (element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title" > ${element.title}</h5>
                        <p class="card-text"> ${element.text}</p>
                        <button id="${index}" class="btn btn-primary delete-note">Delete Note</button>
                    </div>
                </div>`;
  });
  if (notesArr.length != 0) {
    notesElm.innerHTML = html;
    func3();
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// If user adds a note, add it to the localStorage
addBtn.addEventListener("click", async function (e) {
  let addTxt = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notesObj = [];
  // notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = notes;
  }
  let myObj = {
    title: addTitle.value,
    text: addTxt.value
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  //   console.log(notesObj);

  
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  notes = JSON.parse(localStorage.getItem("notes"));
  
  if(notes == null){
    func2([]);
    return;
  }else{
    func2(notes);
  }
  // if (notes == null) {
  //   notesObj = [];
  // } else {
  //   notesObj = notes;
  // }
  let html = "";
  notes.forEach(function (element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title" > ${element.title}</h5>
                        <p class="card-text"> ${element.text}</p>
                        <button id="${index}"class="btn btn-primary delete-note">Delete Note</button>
                    </div>
                </div>`;
  });
  if (notes.length != 0) {
    notesElm.innerHTML = html;
    func3();
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// Function to delete a note


search.addEventListener("input", function (e) {
  searchTxt = e.target.value;
  console.log(searchTxt);
})

logoutBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("Signout clicked");
  localStorage.clear();
  window.location.href = "http://127.0.0.1:5500/index.html";
})
































// let search = document.getElementById('searchTxt');
// search.addEventListener("input", function(){

//     let inputVal = search.value.toLowerCase();
//     // console.log('Input event fired!', inputVal);
//     let noteCards = document.getElementsByClassName('noteCard');
//     Array.from(noteCards).forEach(function(element){
//         let cardTxt = element.getElementsByTagName("p")[0].innerText;
//         if(cardTxt.includes(inputVal)){
//             element.style.display = "block";
//         }
//         else{
//             element.style.display = "none";
//         }
//         // console.log(cardTxt);
//     })
// })

/*
Further Features:
1. Add Title
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
*/ 