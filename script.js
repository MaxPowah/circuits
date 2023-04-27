var c = document.getElementById("gameScreen");
var ctx = c.getContext("2d");
ctx.fillStyle = "black";
ctx.lineWidth = 4;
ctx.font = "20px Roboto";
let mousePos = {x: 0, y: 0};
//report the mouse position on click
c.addEventListener("click", function (evt) 
{
  getMousePos(c, evt);

}, false);
//Get Mouse Position
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();

  
  mousePos.x = evt.clientX - rect.left;
  mousePos.y = evt.clientY - rect.top;
}
let ComponentList = [];
/*
let margin = 40; // man kan vara 40 pixlar utanför mitten av anslutningspunkten och det fungerar fortfarande
//för minuspolen
if (Math.abs(ComponentList.first.connectMinus.x - ComponentList.last.connectMinus.x) < margin && Math.abs(ComponentList.first.connectMinus.y - ComponentList.last.connectMinus.y) < margin)
{
  
}
else
{
  alert("Tyvärr, du får rita upp kretsen igen :<");
}
//för pluspolen
if (Math.abs(ComponentList.first.connectMinus.x - ComponentList.last.connectMinus.x) < margin && Math.abs(ComponentList.first.connectMinus.y - ComponentList.last.connectMinus.y) < margin)
{
  
}
else
{
  alert("Tyvärr, du får rita upp kretsen igen :<");
}
*/


function Draw(something)
{
  //för debugging
  //mX = Math.floor(Math.random() * 960); 
  //mY = Math.floor(Math.random() * 640);

  //plan är att ha en lista där saker från den här listan läggs till i ordning. Programmet ska hålla koll på ordningen av vad som placeras och 
  
  switch(something)
  {
    case "battery":
      DrawBattery(mousePos.x, mousePos.y);
      break;
    case "resistor":
        DrawResistor(mousePos.x, mousePos.y);
        break;
    case "conductor":
      a
      DrawConductor(mousePos.x, mousePos.y);
      break;
      case "conductor2":
        ConductorTwo(mousePos.x, mousePos.y);
        break;
    case "lamp":
      alert("hmm, något gick fel");
      break;
      case "volt":
        alert("hmm, något gick fel");
        break;
    case "clearAll":
      location.reload();
      break;
    default:
      alert("hmm, något gick fel");
      break;
    }
}

function DrawBattery(mX, mY)
{
  let U = document.getElementById("voltage").value; //U används i beräkningar
  let voltage = U.toString(); // för att enkelt kunna läggas ihop med en string senare
  if(voltage == null || voltage == 0) // så att man bara kan skriva siffror och att värdet inte blir 0
  {
    voltage = "12"; // så att batteriet inte har 0 i spänning
    U = 12; 
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
  let R = document.getElementById("resistor").value; // för beräkningar
  let resistance = R.toString();
  if(resistance == null || resistance == 0)
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

let mX1,mX2; //? för att.
function DrawConductor(mX, mY) //steg 1
{
  ctx.moveTo(mX,mY);
  alert("tryck en gång till!");
  ctx.fillStyle = "black";
  mX1  = mX;
  mY1 = mY;
  let connectMinus = (mX,mY); // platsen vid minuspolen där andra saker kan anslutas

}
function ConductorTwo(mX2, mY2) //steg 2
{

  ctx.lineWidth = 3;
  ctx.lineTo(mX2);
  ctx.stroke(mY2);
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
  alert("inte fasen vet jag ¯|_(ツ)_/¯. \nFör att placera ut en komponent, gör såhär:\n\n 1. Klicka på den vita rutan\n 2. Klicka sen på en knapp för vad du vill rita (om du gör ett batteri eller en resistor så får du även skriva in värden. Lämnar du fälten tomma kommer standardvärden att användas) \n 3. Den klickade komponenten kommer dyka upp på skärmen.");
}