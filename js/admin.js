
function login(){

let user=document.getElementById("username").value;
let pass=document.getElementById("password").value;

let now=new Date();
let hh=now.getHours().toString().padStart(2,'0');
let mm=now.getMinutes().toString().padStart(2,'0');

let correct=hh+mm;

if(user==="admin" && pass===correct){
window.location="index.html";
}else{
alert("Invalid Login");
}

}

function createRoom(){

let code=prompt("Enter secret room code");

if(!code) return;

db.ref("rooms/"+code).set({
created:Date.now()
});

loadRooms();

}

function loadRooms(){

db.ref("rooms").on("value",snap=>{

let data=snap.val();
let html="";

for(let room in data){

html+=`
<div class="card p-2 mt-2">
${room}
<a href="chat.html?room=${room}" class="btn btn-success btn-sm">Open</a>
<button onclick="deleteRoom('${room}')" class="btn btn-danger btn-sm">Delete</button>
</div>`;

}

document.getElementById("rooms").innerHTML=html;

});

}

function deleteRoom(room){

db.ref("rooms/"+room).remove();

}

if(document.getElementById("rooms")){
loadRooms();
}
