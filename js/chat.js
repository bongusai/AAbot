const params = new URLSearchParams(window.location.search);
const room = params.get("room");

let user = localStorage.getItem("user");

if(!user){
user="user"+Math.floor(Math.random()*10000);
localStorage.setItem("user",user);
}

const msgInput = document.getElementById("msg");

// ONLINE STATUS
db.ref("online/"+room+"/"+user).set(true);

window.onbeforeunload=function(){
db.ref("online/"+room+"/"+user).remove();
}

// CHECK ONLINE USERS
db.ref("online/"+room).on("value",snap=>{

let count = snap.numChildren();

if(count>1){
document.getElementById("status").innerText="Online";
}else{
document.getElementById("status").innerText="Offline";
}

});

// TYPING INDICATOR
msgInput.addEventListener("input",()=>{

db.ref("typing/"+room).set(user);

setTimeout(()=>{
db.ref("typing/"+room).remove();
},1500);

});

db.ref("typing/"+room).on("value",snap=>{

let t=snap.val();

if(t && t!==user){
document.getElementById("typing").innerText="typing...";
}else{
document.getElementById("typing").innerText="";
}

});

// SEND MESSAGE
function send(){

let msg = msgInput.value.trim();

if(!msg) return;

db.ref("messages/"+room).push({

text:msg,
sender:user,
time:Date.now(),
seen:false

});

msgInput.value="";

}

// ENTER KEY SEND
msgInput.addEventListener("keypress",function(e){

if(e.key==="Enter"){
send();
}

});

// LOAD MESSAGES
db.ref("messages/"+room).on("value",snap=>{

let data=snap.val();

let html="";

for(let id in data){

let m=data[id];

let date=new Date(m.time);

let t=date.getHours()+":"+date.getMinutes();

let tick="";

if(m.sender===user){

if(m.seen){
tick="✔✔";
}else{
tick="✔";
}

}

let cls = m.sender===user ? "msg-right":"msg-left";

html+=`
<div class="${cls}" data-id="${id}" ontouchstart="hold(this)">

${m.text}

<div class="time">${t} <span class="tick">${tick}</span></div>

</div>
`;

if(m.sender!==user && !m.seen){

db.ref("messages/"+room+"/"+id+"/seen").set(true);

}

}

document.getElementById("messages").innerHTML=html + document.getElementById("typing").outerHTML;

document.getElementById("messages").scrollTop=
document.getElementById("messages").scrollHeight;

});

// DELETE ALL
function deleteAll(){

if(confirm("Delete all chat?")){

db.ref("messages/"+room).remove();

}

}

// LONG PRESS DELETE
let pressTimer;

function hold(el){

pressTimer=setTimeout(()=>{

let id=el.getAttribute("data-id");

if(confirm("Delete this message?")){

db.ref("messages/"+room+"/"+id).remove();

}

},700);

}

document.addEventListener("touchend",()=>{

clearTimeout(pressTimer);

});