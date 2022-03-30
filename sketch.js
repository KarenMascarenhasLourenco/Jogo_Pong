//variáveis do jogo || game variables
//variáveis da bola
let xBola =300;
let yBola = 200;
let diametro = 20;
let velocidadeX = 5;
let velocidadeY= 5;
let raio = diametro/2;

//variáveis da raquete;
let xRaquete = 10;
let yRaquete = 150;

//raquete do oponente
let xRaqueteOponente = 580;
let yRaqueteOponente =150;
let velocidadeYOponente;

let comprimentoRaquete = 10;
let alturaRaquete = 90;

//placar do jogo
let meusPontos = 0;
let pontosOponente =0;
let colidiu = false;

//sons do jogo
let ponto;
let raquetada;
let trilha;

//funções de jogabilidade // gameplay functions
function mostraBola(){
  circle(xBola,yBola,diametro);
}
function movimentoBola(){
  xBola += velocidadeX;
  yBola += velocidadeY;
}
function verificaColisaoBorda(){
   if(xBola + raio > width || xBola - raio < 0){
    velocidadeX *= -1;
  }
  if(yBola + raio > height || yBola - raio < 0){
    velocidadeY *= -1;
  }
}
function mostraRaquete(x,y){
  fill(255)
  rect(x,y,comprimentoRaquete,alturaRaquete)
}
function movimentoRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}
function verificaColisaoRaquete(){
  if((xBola-raio < xRaquete + comprimentoRaquete)&& (yBola-raio < yRaquete+alturaRaquete) && (yBola+ raio > yRaquete)){
    velocidadeX *= -1;
    raquetada.play()
  }
}
function colisaoRaqueteBiblioteca(x,y){
  colidiu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBola, yBola, raio);
  if(colidiu ==true){
    velocidadeX *= -1;
    raquetada.play()
  }
}
function movimentaRaqueteOponente(){
if(keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  if(keyIsDown(83)){
    yRaqueteOponente += 10;
  }
  
}

function incluiPlacar(){
  stroke(255)
  textAlign(CENTER)
  textSize(25)
  fill(color(255,140,0))
  rect(130,1,40,35)
  fill(255) 
  text(meusPontos, 150, 26)
  fill(color(255,140,0))
  rect(430,1,40,35)
  fill(255) 
  text(pontosOponente, 450, 26)
}
function marcaPonto(){
  if(xBola>590){
    meusPontos +=1;
    ponto.play()
  }
  if(xBola <10){
    pontosOponente +=1;
    ponto.play()
  }
}

function preload(){
  trilha=loadSound("trilha.mp3");
  ponto=loadSound("ponto.mp3")
  raquetada=loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop()
}

//jogo || game
function draw() {
  background(0);
  mostraBola();
  movimentoBola()
  verificaColisaoBorda()
  mostraRaquete(xRaquete,yRaquete)
  mostraRaquete(xRaqueteOponente,yRaqueteOponente)
  movimentoRaquete()
  //verificaColisaoRaquete()
  colisaoRaqueteBiblioteca(xRaquete,yRaquete)
  colisaoRaqueteBiblioteca(xRaqueteOponente,yRaqueteOponente)
  movimentaRaqueteOponente();
  incluiPlacar()
  marcaPonto()
}
