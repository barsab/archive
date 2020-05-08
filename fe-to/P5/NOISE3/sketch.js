//FEDERICO TOPA IN COLLAB CON
//G.VACCARI - M.G.MILINCI

let ball = [];
let n = 40;
let dimensione_ini = 20;
let contatto = 0;
var r; // variabili per avere i colori randomici delle palline
var g;
var b;
var a;

 

let xdirection = 1; // Left or Right
let ydirection = 1; // Top to Bottom

 

function setup() {
 createCanvas(windowWidth, windowHeight);
  noStroke();
  for (let i = 0; i < n; i++) {
   ball.push(new Ball());
  }
}

 

class Ball {
  constructor () {
    this.x = 0;
    this.y = 0;
    this.randomX = Math.random() * 100000;
    this.randomY = Math.random() * 100000;
  }
  
  update () {
   
      this.x = noise(this.randomX + millis() * 0.0002 * xdirection) * width;
      this.y = noise(this.randomY + millis() * 0.0002 * ydirection) * height;
    if (this.x > width - dimensione_ini || this.x < dimensione_ini) {
    xdirection *= -1;
    }
    if (this.y > height - dimensione_ini || this.y < dimensione_ini) {
    ydirection *= -1;
    }
    
    }
  
  
  draw () {
    dimensione_ini = dimensione_ini + contatto;
    //fill(255);
    fill( r, g, b ); // posso aggiungere l'alfa se voglio
    circle(this.x, this.y, dimensione_ini); //posizione iniziale + dimensione palline
    
    r = random(255); // r is a random number between 0 - 255
    g = random(255); // g is a random number betwen 100 - 200
    b = random(255); // b is a random number between 0 - 100
    //a = random(200,255); // a is a random number between 200 - 255
   
  }
  
  scontro(){ //aumenta la dimensione ogni incontro con un altra pallina
    for (let i = 0; i < n; i++){ //ciclo per scegliere la pallina da confrontare con 
      for (let j = 0; j < n; j++){ // ciclo che cicla tutte le palline di nuovo
        if (ball[i].x ==  ball[j].x && ball[i].y ==  ball[j].y){ // quando x e y sono uguali allora-->
          contatto = contatto + 0.00000001;
          // aumenta la dimensione solo della pallina che ha fatto il contatto(in teoria)
          ball[i].dimensione_ini = ball[i].dimensione_ini * 400; 
          
          console.log ("contatto" + millis());
    
        }
      }
    }
  }
}

 

function draw() {
  background(0); // se spento le palline disegnano! se acceso fluttuano
    // fill(255, 255, 255); //Non sembra cambiare nulla acceso o spento. mah?! probabilmene è il colore del primo frame di palline
  //rect(0, 0, width, height);
  ball.forEach((pallina) => {
    pallina.update();
    pallina.draw();
    pallina.scontro();
  });
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
