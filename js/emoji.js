
function emoji(){

let emojis=["😀","😂","😍","👍","🔥","🙏","😎","🎉"];

let e=prompt("Pick emoji:\n"+emojis.join(" "));

if(e){
document.getElementById("msg").value+=e;
}

}
