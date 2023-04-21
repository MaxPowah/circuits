var c = document.getElementById("gameScreen");
var ctx = c.getContext("2d");
ctx.fillStyle = "black";
ctx.lineWidth = 4;
ctx.font = "20px Roboto";
let mousePos = {x: 0, y: 0};
//report the mouse position on click
c.addEventListener("click", function (evt) {
  getMousePos(c, evt);
}, false);
//Get Mouse Position
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();

  
  mousePos.x = evt.clientX - rect.left;
  mousePos.y = evt.clientY - rect.top;
}

/*
let mX;//mouse x pos
let mY;//mouse y pos


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
let skitenJagValtNu;
function Draw(something)
{
  skitenJagValtNu = something;
  /*
  button is pressed
  canvas is clicked
  stuff is drawn
  */
  //mX = Math.floor(Math.random() * 960);
  //mY = Math.floor(Math.random() * 640);


  switch(something)
  {
    case "battery":
      DrawBattery(mousePos.x, mousePos.y);
      break;
    case "resistor":
        DrawResistor(mousePos.x, mousePos.y);
        break;
    case "conductor":
      DrawConductor();
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
  let U = document.getElementById("voltage").value;
  let voltage = U.toString();
  if(voltage == "" || voltage == "0")
  {
    voltage = "12";
    U = 12; // för beräkningar
  }
  
  let Uconcat = voltage.concat(" V");
  ctx.fillStyle = "black";
  ctx.fillRect(mX - 10, mY, 6, 30);
  ctx.fillRect((mX + 10), (mY - 14), 4, 60);
  //draw text elements
  let connectMinus = mX - 20; // platsen vid minuspolen där andra saker kan anslutas
  let connectPlus = mX + 30; // samma för pluspolen
  ctx.fillText(Uconcat, mX-20, mY - 20);

  return connectPlus, connectMinus;
  
}
    
function DrawResistor(mX, mY)
{
  let R = document.getElementById("resistor").value;
  let resistance = R.toString();
  if(resistance == "" || resistance == "0")
  {
    resistance = "10";
    R = 10; // för beräkningar
  }
  let Rconcat = resistance.concat(" Ω");
  ctx.fillStyle = "black";
  
  //jag skulle vilja att den kan roteras
  let width = 90;
  let height = 30;
  let insideOffset = width * 0.05;
  ctx.strokeRect((mX- width/2), mY, width, height);
  let connectMinus = mX - (width/2); // platsen vid minuspolen där andra saker kan anslutas
  let connectPlus = mX + 30; // samma för pluspolen
  
  ctx.moveTo(mX-40,mY-20);
  ctx.fillText(Rconcat, mX-35, mY+20);
  /*
  ctx.fillStyle = "rgb(234, 242, 248)"; // ser till att insidan är samma färg som bakgrunden
  ctx.fillRect((mX- width/2) + insideOffset/2, (mY + insideOffset/2), (width - insideOffset), height - insideOffset);
  */
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
  //!man kan nog använda matte här för att få saker att bli snyggare
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
  //Draw("conductor");
  //getMousePos(c, mouseClo)
}
//alert("aaaaaaa");

function Explain()
{
  alert("inte fasen vet jag");
}