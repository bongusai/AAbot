
const params=new URLSearchParams(window.location.search);
const room=params.get("room");

const user=localStorage.getItem("user")||"admin";

function send(){

let msg=document.getElementById("msg").value;

if(msg==="") return;

db.ref("messages/"+room).push({
text:msg,
sender:user,
time:Date.now(),
seen:false
});

document.getElementById("msg").value="";

}

db.ref("messages/"+room).on("value",snap=>{

let data=snap.val();
let html="";

for(let id in data){

let m=data[id];

let date=new Date(m.time);
let t=date.getHours()+":"+date.getMinutes();

let tick=m.seen ? "✔✔":"✔";

html+=`
<div class="${m.sender==='admin'?'msg-admin':'msg-user'}">
${m.text}
<div class="time">${t} ${tick}</div>
</div>`;

db.ref("messages/"+room+"/"+id+"/seen").set(true);

}

document.getElementById("messages").innerHTML=html;

});

document.getElementById("msg").addEventListener("input",()=>{
db.ref("typing/"+room).set(user+" typing...");
});

db.ref("typing/"+room).on("value",snap=>{
document.getElementById("typing").innerText=snap.val()||"";
});

setInterval(()=>{
db.ref("messages/"+room).remove();
},300000);


