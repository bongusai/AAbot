// CHECK ADMIN SESSION
if(localStorage.getItem("adminSession") !== "true"){

window.location="index.html";

}

// ADMIN LOGIN TIME
let loginTime = Date.now();

// AUTO LOGOUT AFTER 5 MINUTES
setInterval(()=>{

let now = Date.now();

if(now - loginTime > 300000){

alert("Session expired. Admin logged out.");

logout();

}

},5000);


// LOGOUT FUNCTION
function logout(){

localStorage.removeItem("adminSession");

window.location="index.html";

}


// CREATE ROOM
function createRoom(){

let code = prompt("Enter secret room code");

if(!code) return;

db.ref("rooms/"+code).set({
created:Date.now()
});

loadRooms();

}


// DELETE ROOM
function deleteRoom(room){

if(confirm("Delete room?")){

db.ref("rooms/"+room).remove();

}

}


// LOAD ROOMS
function loadRooms(){

db.ref("rooms").on("value",snap=>{

let data = snap.val();

let html="";

for(let room in data){

html+=`
<div class="card p-2 mb-2 d-flex justify-content-between align-items-center">

<b>${room}</b>

<div>

<a href="chat.html?room=${room}" class="btn btn-success btn-sm">Open Chat</a>

<button onclick="deleteRoom('${room}')" class="btn btn-danger btn-sm">Delete</button>

</div>

</div>
`;

}

document.getElementById("rooms").innerHTML=html;

});

}

loadRooms();