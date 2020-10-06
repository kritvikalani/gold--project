const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var saviour;
var saviourImage;
var corona, coronaImage, coronaGroup;
var mask1, mask1Image, mask1Group;
var mask2, mask2Image, mask2Group;
var score;

function preload() {
saviourImage= loadImage("ppe.png");
mask1Image= loadImage("mask.png");
mask2Image= loadImage("mask2.png");
coronaImage= loadImage("obstacle.png")
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  engine = Engine.create();
    world = engine.world;

    mask1Group = new Group();
    mask2Group = new Group();
    coronaGroup = new Group();

    score = 0;

  saviour= createSprite(displayWidth/2,780,50,50)
  saviour.scale = 0.75
 saviour.addImage(saviourImage);

 /*if(frameCount % 150 === 0){
 for(var i=0; i<1; i++){
  corona.push(new Obstacles(random(0,1200), random(200,1200)));
 }
}*/
}

function draw() {
  background(0); 
  Engine.update(engine);

  if (keyDown(RIGHT_ARROW)) {
    saviour.velocityX = 4;
    saviour.velocityY = 0;
  }

  if (keyDown(LEFT_ARROW)) {
    saviour.velocityX = -4;
    saviour.velocityY = 0;
  }

  if (keyDown(UP_ARROW)) {
    saviour.velocityY = -4;
    saviour.velocityX = 0;
  }

  if (keyDown(DOWN_ARROW)) {
    saviour.velocityY = 4;
    saviour.velocityX = 0;
  }

  if (saviour.isTouching(mask1Group)) {
    score = score + 1
    mask1Group.destroyEach();
  }

  if (saviour.isTouching(mask2Group)) {
    score = score + 1
    mask2Group.destroyEach();
  }

  if (saviour.isTouching(coronaGroup)) {
    saviour.x = displayWidth/2;
    saviour.y = 780;
    saviour.velocityX = 0;
    saviour.velocityY = 0;
    score = 0;
  }

  /*for (var i in corona){

    
      if(saviour.intersects(corona[i])) {
      saviour.x = 380;
     saviour.y = 780;
    }

  }*/
  camera.position.x= displayWidth/2
  camera.position.y= saviour.y

 /* for(var i=0; i<1; i++){
  corona[i].display();
  corona[i].update();
  }*/
  drawSprites();

stroke("white");
textSize(20);  
fill("white");
text("Masks collected= " + score, 600, displayHeight/2)
  
Mask1();
Mask2();
covid();
}

function Mask1() {
  if (frameCount%200===0) {
    mask1 = createSprite(random(0,600), saviour.y - 10, 20,20)
    mask1.addImage(mask1Image);
    mask1.velocityX = 0;
    mask1.velocityY = random(1,3)
    mask1.scale = 0.1;
    mask1.setCollider("circle", 0, 0, 10)
    mask1.debug = 2
    mask1.lifetime = 1200
    mask1Group.add(mask1)
  }
}

function Mask2() {
  if (frameCount%300===0) {
    mask2 = createSprite(random(0,600), saviour.y - 10, 20,20)
    mask2.addImage(mask2Image);
    mask2.velocityX = 0;
    mask2.velocityY = random(1,3)
    mask2.scale = 0.2;
    mask2.setCollider("circle", 0, 0, 20)
    mask2.debug = 2
    mask2.lifetime = 1200
    mask2Group.add(mask2)
  }
}

function covid() {
  if(frameCount%120===0) {
    corona = createSprite(random(0,600), random(0,600), 10);
    corona.velocityY = 2
    corona.addImage("covid", coronaImage)
    corona.scale = 0.08
    corona.setCollider("rectangle", 0, 0, 3, 3)
    corona.debug = 1
    coronaGroup.add(corona);
  }
}

function intersects(other){

  var d = dist(saviour.x,saviour.y,other.x,other.y)
  if(d< saviour.x + other.x){
    return true;
  }
  else{
    return false;
  }
}
