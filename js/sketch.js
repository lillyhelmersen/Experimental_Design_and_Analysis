var wi = window.innerWidth-10;
var hi = window.innerHeight-60;
var randomSetCol = -1;
var randomSetRow = -1;

var styleArray = [];
var styleArrayCounter = 0;
var styleD;
/*{
  colorS : "",
  shapeS : "",
};*/

//startOfTrail();
var lastWasCorrect;
var startTime;
var spottingTime;

var colorTab = ['#FAEF27','#AD132F'];
var shapeTab = ["Circle", "Squer"];
var shape;
var color;
var shapeD;
var colorD;
//Shape size
var cSais = wi/30;

var colHit;
var rowHit;
var col;
var row;
var finichedBol = false;
var bol1 = true;

var secuens = -1;
var quantity = 3;

let table;

var notFirst = 0;

function preload(){

}

function setup() {
  createCanvas(wi, hi);
  //secuens =
  background(255);
  console.log("tryli index: " + ctx.trialIndex);
  defoltStyle();
  setupTable();
  //pick(quantity);
  //startOfTrail();
}

function startOfTrail(){
  clear();
  //printPalet(3);
  setHitBox();
  printStartScreen();
  //printPalet(3);
}
function printStartScreen(){
  textSize1 = 30;
  textSize2 = 60;
  textSize(wi/30);
  textAlign(CENTER, CENTER);
  fill(0);
  text("Multiple shapes will get displayed.",wi/2,hi/4);
  textSize(wi/textSize2);
  text("Only _one shape_ is different from all other shapes. ",wi/2,hi/4+(wi/30));
  text("1. Spot it as fast as possible and press _Space_ bar.",wi/2,hi/4+(wi/30)+(wi/30));
  text("2. The click on the placeholder over that shape.",wi/2,hi/4+(wi/30)+(wi/30)+(wi/textSize2));
  text("Press _Enter_ key when you are ready to start.",wi/2,hi/4+(wi/30)+(wi/30)+(wi/textSize2)+(wi/30));

  noFill();
}

function next(){
  clear();
  //console.log("In next secuens: " + secuens);
  switch(secuens){
    case 0: wait();
    break;
    case 1: look();
            setHitBox();
    break;
    case 2: secuens = 0;
            if(lastWasCorrect){
              nextTrial();
            }
            pick();

            return;
  }
  secuens++;
}

function wait(){
  //console.log("Im in wate");
  var par = -1;
  var parLast = -1;
  console.log("In wait cpt: " + ctx.cpt);
  if(notFirst > 1 && ctx.cpt != 0){
    par = ctx.trials[ctx.cpt][ctx.participantIndex];
    parLast = ctx.trials[ctx.cpt-1][ctx.participantIndex];
    //console.log("par: " + par);
    //console.log("parLast: " + parLast);
    //console.log("parLastInedex: " + ctx.participantIndex);
  }
  //console.log("par: " + par);
  //console.log("parLast: " + parLast);

  if(par != parLast){
    finiched();
  } else {
    notFirst++;
    textSize(wi/10);
    fill(0);
    text("Wait",wi/2,hi/2);
    textSize(wi/30);
    text("Klikk _Space_ when you are reddy to se the next shapes", wi/2,hi/2+(wi/10));
    noFill();
  }
}
function look(){
  trailIndex();
  startTime = new Date().getTime();
}
function pick(){
  //console.log("in pick count");
    bol1 = true;

  spottingTime = new Date().getTime() - startTime;
  //console.log("Time of tril: " + spottingTime);
  var theCircle;
  noStroke();
  fill('#BABABA');
  for (i = 0; i < quantity; i++){
    for (j = 0; j < quantity; j++){
      //console.log("i = " + i + " j = " + j );
        ellipse(col[i],row[j],cSais,cSais);
    }
  }
  noFill();
  //Makes new data entry

}

function cordinatInArray(distans, amount){
  var array = [];//= new Array();
  var j = 3;
  array[0] = distans;
  for (i = 1; i < amount; i++){
    array[i] = distans*j;
    j = j + 2;
  }
  //console.log("C in Array 0: " + array[0]);
  return array;
}
function trailIndex(){
  console.log("ObjektCount: " + ctx.trials[ctx.cpt] + " : " +   ctx.cpt);

  var objectCount = ctx.trials[ctx.cpt][ctx.objectsCountIndex];
  var vv = ctx.trials[ctx.cpt][ctx.vvIndex];

  //console.log("Objekt count: " + objectCount);

  quantity =
    (objectCount === "Low") ? 3 :
    (objectCount === "Medium") ? 5 : 7;

    printPalet(quantity);

}

function printPalet(){
  clear();
  var num = quantity*2;
  var hor = hi/num;
  var wer = wi/num;
  col = cordinatInArray(wer,quantity);//[hor,hor*3,hor*5];
  row = cordinatInArray(hor, quantity);//[wer,wer*3,wer*5];

  setDifferent();
  setStail();
  noStroke();
  for (i = 0; i < quantity; i++){
    for (j = 0; j < quantity; j++){
      //console.log("i = " + i + " j = " + j );

      if(isNotDifferent(i+1,j+1)){
        //colorIt();
        printObjekt(col[i],row[j],styleArray.pop());
      } else {
        //!!!!!!!!!print the different shape
        //theDifferent();
        console.log("Trying to print other");
        printObjekt(col[i],row[j],styleD);
      }
    }
  }
}
function setDifferent(){
  randomSetCol = round(random(1,quantity));
  randomSetRow = round(random(1,quantity));
  //console.log("random col: " + round(randomSetCol) +" random row: " + round(randomSetRow));
}
function isNotDifferent(i,j) {
  //if cordinets is diferent;
  //console.log("i and j: " + i + ", " + j);
  if(i == randomSetCol && j == randomSetRow){
    return false;
    //console.log("bæ");
  }
  return true;
}

function setStail(){
  var vv = ctx.trials[ctx.cpt][ctx.vvIndex];
  defoltStyle();
  //console.log("VV: " + vv);
  if (vv == "ColorShape"){
    setColor();
    setShape();
    setCSStyleArray();
  } else if (vv == "Color"){
    setColor();
    setCArray();
  } else {//Shape
    setShape();
    setSArray();
  }
  shuffle(styleArray);
}
function setShape(){
  //console.log("Set Shape");
  shape = random(shapeTab);
  if(shape == shapeTab[0]){
    shapeD = shapeTab[1];
  }  else {
    shapeD = shapeTab[0];
  }
}
function setColor(){
  //console.log("Set Color");
  color = random(colorTab);
  if(color == colorTab[0]){
    colorD = colorTab[1];
  }  else {
    colorD = colorTab[0];
  }
}
function setSArray(){
  styleArray = [];
  styleD = {
    colorS : color,
    shapeS : shapeD,
  };
  console.log("set S Array staylD: " + styleD.color)
  for(i = 0; i < quantity*quantity; i++){
    styleArray.push({
      colorS : color,
      shapeS : shape,
    });
  }
}
function setCArray(){
  styleArray = [];
  styleD = {
    colorS : colorD,
    shapeS : shape,
  };
  console.log("setCArray styleD: C " + styleD.colorS + " S: " + styleD.shapeS);
  for(i = 0; i < quantity*quantity; i++){
    styleArray.push({
      colorS : color,
      shapeS : shape,
    });
  }
}
function setCSStyleArray(){
//color
  styleArray = [];
  var j = 1;
  shapeTemp = shape;
  colorTemp = color;
  styleD = {
    colorS : colorD,
    shapeS : shapeD,
  };
  //console.log("ColorD in setCSStyleArray: " + styleD.colorS);
  //console.log("quantity^2 : " + quantity*quantity);
  for(i = 0; i < (quantity*quantity); i++){
    if(j == 1){
      j = 2;
      shapeTemp = shape;
      colorTemp = color;
    } else if( j == 2){
      j = 3;
      shapeTemp = shapeD;
      colorTemp = color;
    } else if (j == 3){
      j = 1;
      shapeTemp = shape;
      colorTemp = colorD;
  }
  //console.log("ColorTemp in setCSStyleArray: " + colorTemp);
    styleArray.push({
      colorS : colorTemp,
      shapeS : shapeTemp,
    });

  }
  //shuffle(styleArray);
}

function printObjekt(x,y,styleTemp){
  /*  var shape;
      var color;  */
  var tempStyle = styleTemp;//styleArray.pop();
  //console.log("321 Color in print OBject: " + tempStyle.colorS);
  fill(tempStyle.colorS);
  if(tempStyle.shapeS == "Circle"){
    ellipse(x,y,cSais,cSais);
  } else if(tempStyle.shapeS == "Squer"){
    square(x - cSais/2, y - cSais/2, cSais);
  }
  noFill();
}
function printDifObjekt(x,y){
  /*  var shape;
      var color;  */
      var tempStyle = styleD;
      fill(tempStyle.colorS);
      if(tempStyle.shapeS == "Circle"){
        ellipse(x,y,cSais,cSais);
      } else if(tempStyle.shapeS == "Squer"){
        square(x - cSais/2, y - cSais/2, cSais);
      }
      noFill();
/*
  if(shapeD == "Circle"){
    ellipse(x,y,cSais,cSais);
  } else if(shapeD == "Squer"){
    square(x - cSais/2, y - cSais/2, cSais);
  }
*/
}

//Cosmetics XD
function colorIt(){
  fill(color);
}
function theDifferent(){
  fill(colorD);
}
function defoltStyle(){
  shape = random(shapeTab);
  color = random(colorTab);
  shapeD = shape;
  colorD = color;
}

function draw() {

  fill(255);
  //console.log(ctx.w);
}

function setHitBox(){
  var paterHiSize = hi/quantity;
  var paterWiSize = wi/quantity;
  colHit = [];
  rowHit = [];
  colHit[0] = 0;
  rowHit[0] = 0;
  /*
  console.log("hi: " + hi + " wi: " + wi);
  console.log("paterHiSize: " + paterHiSize);
  console.log("paterWiSize: " + paterWiSize);
  */
print("quantity:" + quantity);
  for(i = 1; i < (quantity * 2) +1; i++){
    rowHit[i] = paterHiSize * (i);
    colHit[i] = paterWiSize * (i);
    //console.log(" - hiTab: " + rowHit[i]);
    //console.log(" - wiTab: " + colHit[i])
  }
}
function inHitBox(x,y){
  //console.log("Open Hitbox");

  //x,y = mouse cordinats
  //colHit, rowHit: randomSetCol, randomSetRow
  //print("Mouse at x: " + x + " y: " + y);
  //print(colHit);
  //print(rowHit);

  for(i = 0; i < colHit.length; i++){
    for(j = 0; j < rowHit.length; j++){
      //console.log("j:" +j+ " X: " + colHit[i] + "-" + colHit[i+1] + " Y: " + rowHit[j] + "-" + rowHit[j+1]);
      //print("i: " + i + " j: " + j);

      if(i+1 == randomSetCol && j+1 == randomSetRow){
        if(x > colHit[i] && x < colHit[i+1]){
          if(y > rowHit[j] && y < colHit[j+1]){
            //console.log("A hitt at x: " + x + " y: " + y);
            return true;
          }
        }
      }

    }
  }
  return false;
}

function finiched(){
  finichedBol = true;
  console.log("Im finched");
  textSize(wi/10);
  fill(0);
  text("Finiched",wi/2,hi/2);
  textSize(wi/30);
  text("Thank you for partisipating", wi/2,hi/2+(wi/10));
  noFill();


  saveMyTable();
}
function setupTable() {
  table = new p5.Table();

  table.addColumn('Participant');
  table.addColumn('Practice');
  table.addColumn('Block');
  table.addColumn('Trial');
  table.addColumn('OC');
  table.addColumn('VV');
  table.addColumn('Time');
}
function newRowInTable(time){

    var par = ctx.trials[ctx.cpt][ctx.participantIndex];
    var blo = ctx.trials[ctx.cpt][ctx.blockIndex];
    var tra = ctx.trials[ctx.cpt][ctx.trialIndex];
    var vv = ctx.trials[ctx.cpt][ctx.vvIndex];
    var obj = ctx.trials[ctx.cpt][ctx.objectsCountIndex];

    let newRow = table.addRow();
    newRow.setNum('Participant',  par);
    newRow.setNum('Block',        blo);
    newRow.setNum('Trial',        tra);
    newRow.setString('OC',        obj);
    newRow.setString('VV',        vv);
    newRow.setNum('Time',         time);

}
function saveMyTable(){
  var par = ctx.trials[ctx.cpt][ctx.participantIndex-1];
  var tableName = "tableForPartisipant_" + par;
  saveTable(table, tableName, 'csv');
}

function keyTyped() {
  if (!finichedBol) {
    if (key === ' ') {
      //console.log("Space was presed secuens:" + secuens);
      if(secuens == 1){
        next();
        //start time
      } else if(secuens == 2){
        //end time
        //console.log("Space was presed secuens:" + secuens);
        //next task
        next();
      }
    }
  }

}
function keyPressed() {
  if (keyCode === ENTER) {
    console.log("Enter is presed secuens: " + secuens);
    if(secuens == -1){
      secuens++;
      next();
    }
  }
}
function mousePressed() {
  if (!finichedBol) {//finiched
    if(true){
      bol1 = false;
    //mouseX, mouseY
    mX = mouseX;
    mY = mouseY;
      //console.log("Mouse presed in x: " + mouseX + " y: " + mouseY);
      //console.log(" - Secuens: " + secuens);
      var notDone = true;

      if(secuens == 0){
        for(i = 0; i < quantity && notDone; i++){
          for(j = 0; j < quantity && notDone; j++){
            if(inHitBox(mX,mY)){
              console.log("Mouse is in the box");
              lastWasCorrect = true;
              newRowInTable(spottingTime);
              notDone = false;
            } else {
              lastWasCorrect = false;
              notDone = false;
            }
          }
        }
        next();
      }
  }
}

}
