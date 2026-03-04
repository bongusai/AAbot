const params=new URLSearchParams(window.location.search);
const room=params.get("room");

const user=localStorage.getItem("user")||"admin";

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

let cls=m.sender==="admin"?"msg-right":"msg-left";

html+=`
<div class="${cls}">
${m.text}
<div class="time">${t}</div>
</div>
`;

}

document.getElementById("messages").innerHTML=html;

document.getElementById("messages").scrollTop=999999;

});

function deleteAll(){

if(confirm("Delete all messages?")){

db.ref("messages/"+room).remove();

}

}