var c = document.getElementById("gameScreen");
var ctx = c.getContext("2d");
ctx.fillStyle = "black";
ctx.lineWidth = 5;
ctx.font = "20px Roboto";

let mX;//mouse x pos
let mY;//mouse y pos
/*
function  getMousePos(canvas, evt) { //?fattar inte
  var rect = canvas.getBoundingClientRect(), // abs. size of element
  scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
  scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
  
  return {
    mX: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    mY: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  }
}
*/
function GetMousePos()
{
  //code
  return mX, mY;
}
function Draw(something)
{
  //mX = GetMousePos.mX;
  //mY = GetMousePos.mY;
  mX = Math.floor(Math.random() * 700);
  mY = Math.floor(Math.random() * 480);

  GetMousePos();
  switch(something)
  {
    case "battery":
      DrawBattery(mX, mY);
      break;
    case "resistor":
      DrawResistor(mX, mY);
      break;
    case "conductor":
      let mX2 = Math.floor(Math.random() * 700);
      let mY2 = Math.floor(Math.random() * 480);
      DrawConductor(mX, mY, mX2, mY2);
      break;
    case "lamp":
      break;
    case "volt":
      break;
    case "clearAll":
      break;
    default:
      alert("hmm, något gick fel");
      break;
  }
}

function DrawBattery(mX, mY) //!can add 3rd arg to change the voltage
{
  ctx.fillStyle = "black";
  
  ctx.fillRect(mX - 10, mY, 6, 30);
  ctx.fillRect((mX + 10), (mY - 14), 4, 60);
  //draw text elements
  let connectMinus = mX - 20; // platsen vid minuspolen där andra saker kan anslutas
  let connectPlus = mX + 30; // samma för pluspolen
  DrawBattery(mX, mY);
  return connectPlus, connectMinus;
  
}
    
function DrawResistor(mX, mY)
{
  ctx.fillText("Hello World!", mX, mY);
  ctx.fillStyle = "black";
      
  //jag skulle vilja att den kan roteras
  let width = 90;
  let height = 30;
  let insideOffset = width * 0.05;
  ctx.strokeRect((mX- width/2), mY, width, height);
  let connectMinus = mX - (width/2); // platsen vid minuspolen där andra saker kan anslutas
  let connectPlus = mX + 30; // samma för pluspolen
  ctx.fillStyle = "rgb(234, 242, 248)"; // ser till att insidan är samma färg som bakgrunden
  ctx.fillRect((mX- width/2) + insideOffset/2, (mY + insideOffset/2), (width - insideOffset), height - insideOffset);
  return connectPlus, connectMinus;
  
}

function DrawAmpmeter(mX, mY)
{
  let amps = "1";
  ctx.fillStyle = "black";
  let diameter = 40;
  ctx.beginPath();
  ctx.arc(mX, mY, diameter, 0, 2 * Math.PI);//cirkel
  ctx.stroke(); 
  ctx.fillText(amps + "A", mX, mY, maxWidth);
  let connectMinus = mX - (diameter/2); // platsen vid minuspolen där andra saker kan anslutas
  let connectPlus = mX + (diameter/2); // samma för pluspolen
  return connectPlus, connectMinus;
}

function DrawConductor(mX, mY, mX2, mY2)
{
  
  ctx.fillStyle = "black";
  ctx.moveTo(mX,mY);
  ctx.lineTo(mX2,mY2);
  ctx.lineWidth = 3;
  ctx.stroke();
  let connectMinus = (mX,mY); // platsen vid minuspolen där andra saker kan anslutas
  let connectPlus = (mX2,mY2); // samma för pluspolen
  return connectPlus, connectMinus;
}



setInterval(Update, 1/60) //update körs nu 60 ggr per sekund
function Update()
{
  Draw("conductor");
  //getMousePos(c, mouseClo)
}
//alert("aaaaaaa");

function Explain()
{
  alert("inte fasen vet jag");
}