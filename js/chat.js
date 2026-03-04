const params = new URLSearchParams(window.location.search);
const room = params.get("room");

// CURRENT USER
let user = localStorage.getItem("user");

if(!user){
user="user"+Math.floor(Math.random()*10000);
localStorage.setItem("user",user);
}

function send(){

let msg=document.getElementById("msg").value.trim();

if(!msg) return;

db.ref("messages/"+room).push({

text:msg,
sender:user,
time:Date.now()

});

document.getElementById("msg").value="";

}

// ENTER KEY SEND
document.getElementById("msg").addEventListener("keypress",function(e){

if(e.key==="Enter"){
send();
}

});

db.ref("messages/"+room).on("value",snap=>{

let data=snap.val();

let html="";

for(let id in data){

let m=data[id];

let date=new Date(m.time);

let t=date.getHours()+":"+date.getMinutes();

// CHECK IF MESSAGE SENT BY CURRENT USER
let cls = m.sender === user ? "msg-right" : "msg-left";

html += `
<div class="${cls}">
${m.text}
<div class="time">${t}</div>
</div>
`;

}

document.getElementById("messages").innerHTML = html;

document.getElementById("messages").scrollTop =
document.getElementById("messages").scrollHeight;

});

// DELETE ALL MESSAGES
function deleteAll(){

if(confirm("Delete all messages?")){

db.ref("messages/"+room).remove();

}

}