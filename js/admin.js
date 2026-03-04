function createRoom(){

let code=prompt("Enter secret room code");

if(!code) return;

db.ref("rooms/"+code).set({
created:Date.now()
});

loadRooms();

}

function deleteRoom(room){

if(confirm("Delete room?")){
db.ref("rooms/"+room).remove();
}

}

function loadRooms(){

db.ref("rooms").on("value",snap=>{

let data=snap.val();

let html="";

for(let room in data){

html+=`
<div class="card p-2 mb-2 d-flex justify-content-between">

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