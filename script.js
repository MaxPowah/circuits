var c = document.getElementById("gameScreen");
var ctx = c.getContext("2d");
let margin = 15; // man kan vara så här många pixlar utanför mitten av anslutningspunkten och det fungerar fortfarande
ctx.fillStyle = "black";
ctx.lineWidth = 4;
ctx.strokeStyle
ctx.font = "20px Roboto";

let ComponentList = []; //lista som alla utplacera komponenter hamnar i
let circuitComplete = false;

let mousePos = {x: 0, y: 0};
//lyssnar efter att musknappen trycks ner
c.addEventListener("click", function (evt) 
{
  getMousePos(c, evt); // detta utförs vid klick
}, false);

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();//när ett mouse-event sker så tar funktionen reda på hur stor canvasen är
  mousePos.x = evt.clientX - rect.left; //musens x och y-koordinater på canvasen sparas i objektet mousePos
  mousePos.y = evt.clientY - rect.top;
}

function CloseCircuit() 
{
  console.log("testar att sluta kretsen")
  let overlaps = 0; // för att se hur många gånger 
  let comp1, comp2;
  for(let i=0; i< ComponentList.length; i++){
    let comp1 = ComponentList[i];
    let comp2 = ComponentList[i+1];
    //för minuspolen
    Overlaps(comp1, comp2);
    
    if(overlaps == ComponentList.length){
      circuitComplete = true;
      alert("omg it works!!!!!");
    }
  }
}
function Overlaps(comp1, comp2) 
{
  if (Math.abs(comp1.x - comp2.x) < margin && Math.abs(comp1.y - comp2.y) < margin)
    {
      console.log("yay! the x1s overlap for " +comp1 + "and" + comp2);
      return true;
    }
    else if (Math.abs(comp1.x - comp2.x) < margin && Math.abs(comp1.y - comp2.y) < margin)
    {
      console.log("yay! the y1s overlap for " +comp1 + "and " + comp2);
    }
    else
    {
      alert("Tyvärr, du får rita upp kretsen igen (tryck ctrl+r för att böra om) :< \n Du kan också försöka koppla ihop kretsen genom att lägga till ledningar mellan komponenter");
      return false;

    }
  }

function Draw(something)
{
  switch(something)
  {
    case "battery":
      DrawBattery(mousePos.x, mousePos.y);
      break;
    case "resistor":
        DrawResistor(mousePos.x, mousePos.y);
        break;
    case "conductor":
      DrawConductor(mousePos.x,mousePos.y);
      break;
    case "conductor2":
        ConductorTwo(mousePos.x,mousePos.y);

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
function DrawCircle(mX,mY) /// tänkt för att man ska kunna se hur stor marginalen är för att placera komponenter
{
  ctx.fillStyle = "#d8dfe4";
  ctx.beginPath();
  ctx.arc(mX, mY, margin, 0, 2 * Math.PI); //cirkel med radien margin
  ctx.fill();

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
  let b = {
    type:"b",
    x:mX - 15, 
    y: mY + 13, 
    x2:mX + 22, 
    y2: mY + 13, 
    U: U
  }
  ComponentList.push(b); //lägger till batteri-objektet sist i arrayen av komponenter;  
  
  //cirklar för att man ska kunna se var man får ansluta 
  DrawCircle(b.x,b.y);
  DrawCircle(b.x2,b.y2);
  //visuals för självakomponenten
  let Uconcat = voltage.concat(" V");
  ctx.fillStyle = "black";
  ctx.fillRect(mX - 10, mY, 6, 30);
  ctx.fillRect((mX + 10), (mY - 14), 4, 60);
  //draw text elements
  ctx.fillText(Uconcat, mX-20, mY - 20);
  
}
    
function DrawResistor(mX, mY)
{
  let width = 90;
  let height = 30;
  let R = document.getElementById("resistor").value; // för beräkningar
  let resistance = R.toString();
  if(resistance == null || resistance == 0)
  {
    resistance = "10";
    R = 10; // för beräkningar
  }
  let Rconcat = resistance.concat(" Ω");
  let r = {
    type:"r",
    x:mX - (width/2), 
    y: mY, 
    x2:mX + 45, 
    y2: mY, 
    R: R
  }  
  ComponentList.push(r); //lägger till resistor-objektet sist i arrayen av komponenter;  
  
  //cirklar för att man ska kunna se var man får ansluta sladdar
  DrawCircle(r.x,r.y);
  DrawCircle(r.x2,r.y2);

  //visuals för själva komponenten  
  ctx.fillStyle = "black";
  ctx.strokeRect((mX- width/2), mY-height/2, width, height);  
  //ctx.moveTo(mX-40,mY-height/2 - 20);
  ctx.fillText(Rconcat, mX-35, mY + 6);

}

function DrawAmpmeter(mX, mY)
{
  let I = "1"; // placeholder-kod
  let a = {
    type: "a",
    x: mX - (diameter/2), 
    y: mY, 
    x2:mX + (diameter/2), 
    y2: mY, 
    I: I
  }  
  ComponentList.push(a);
  
  //cirklar för att man ska kunna se var man får ansluta 
  //visuals för själva komponenten  
  ctx.fillStyle = "black";
  let diameter = 40;
  ctx.beginPath();
  ctx.arc(mX, mY, diameter, 0, 2 * Math.PI);//cirkel
  ctx.stroke(); 
  ctx.fillText(amps + "A", mX, mY, maxWidth);
  let connectMinus = mX - (diameter/2); // platsen vid minuspolen där andra saker kan anslutas
  let connectPlus = mX + (diameter/2); // samma för pluspolen
}

let mX1,mY1; // för att conductor2 ska komma ihåg var musen var tidigare
function DrawConductor(mX, mY) //steg 1
{
  ctx.moveTo(mX,mY);
  mX1  = mX;
  mY1 = mY;
  console.log("x"+mX1+ "y"+mY1);
}
function ConductorTwo(mX2, mY2) //steg 2
{
  ctx.fillStyle = "black";
  ctx.lineWidth = 3;
  ctx.lineTo(mX2,mY2);
  //ctx.beginPath();
  ctx.stroke();
  let connectPlus = (mX2,mY2); // samma för pluspolen
  let connectMinus = (mX2,mY2); // samma för pluspolen
  console.log("x"+mX1 + "y"+mY1+"    x2"+mX2 + "y2"+mY2);
  let c = {
    type:"c",
    x:mX1, 
    y: mY1, 
    x2:mX2, 
    y2: mY2, 
  }  
  ComponentList.push(c);
}

function Explain()
{
  alert("För att placera ut en komponent, gör såhär:\n\n 1. Klicka på den vita rutan\n 2. Klicka sen på en knapp för vad du vill rita (om du gör ett batteri eller en resistor så får du även skriva in värden. Lämnar du fälten tomma kommer standardvärden att användas) \n 3. Den klickade komponenten kommer dyka upp på skärmen.");
  alert("Om du vill ");

}