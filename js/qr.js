
function createQR(room){

let url=location.origin+"/user.html?room="+room;

QRCode.toCanvas(document.getElementById("qr"),url);

}
