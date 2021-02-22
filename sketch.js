var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running,ghost
var banana ,bananaImage, obstacle, obstacleImage,scenry,scenery1
var FoodGroup, obstacleGroup
var survive,score
var ground,invisibleGround
var die,eat
var restart,restart1
var cloud,cloudImage

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  
  ghost=loadImage("ghost.jfif");
  
  obstacleImage = loadImage("obstacle.png");
 
  scenry1=loadImage("background2.jfif")
  
  eat=loadSound("140. Die.mp3")
  
  die=loadSound("142. Die-Bee.mp3")
  
  restart1=loadImage("restart.png")
  
  cloudImage=loadImage("cloud.png")
}



function setup() {
 createCanvas(400,400)
 //scenry=createSprite(200,180,400,400)
  //scenry.addImage(scenry1)
  //scenry.scale=2
  //scenry.depth=-100
  
  ground = createSprite(200,380,800,50)
  ground.shapeColor="saddleBrown"
  ground.x=ground.width/2

  monkey=createSprite(50,345,40,30)
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.1
  
  survive=0
  score=0

   restart = createSprite(200,200);
  restart.addImage(restart1);
  restart.scale=0.5
  
  
 invisibleGround=createSprite(200,382,400,20)
  invisibleGround.visible=false;
  
  obstacleGroup=new Group();
  foodGroup=new Group();
  cloudsGroup=new Group();
  
 
}

function draw() {
background("aquamarine")
  
  text("survival time: "+ survive, 290,50,textSize(15),stroke("black"));
  
   text("score: "+ score, 290,80,textSize(15),stroke("black"));
  
 if(gameState===(PLAY)){ 
   restart.visible=false;
   
if(keyDown("space")&&monkey.y>330){
  monkey.velocityY=-18
}

   survive = survive + Math.round(frameCount/80);

   
   monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(invisibleGround);

  spawnObstacle();
   food()
  spawnClouds()
  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
  }
   
   if(foodGroup.isTouching(monkey)){
     score=score+1
     foodGroup.destroyEach();
     eat.play();
   }
   
  }
  
   if(gameState===END){

     restart.visible = true;
     
      ground.velocityX = 0;
      monkey.velocityY = 0
     
      obstacleGroup.setLifetimeEach(-1);
     obstacleGroup.setVelocityXEach(0);
    
     cloudsGroup.setLifetimeEach(-1);
     cloudsGroup.setVelocityXEach(0);
     
     foodGroup.setLifetimeEach(-1);
     foodGroup.setVelocityXEach(0);
    
    
      
  if(mousePressedOver(restart)) {
      reset();
    }
   }
  

    drawSprites();
}
function spawnObstacle(){
if(frameCount%90===0){
  obstacle=createSprite(400,345,20,20)
  obstacle.velocityX=-5     
  obstacle.lifetime=80
  obstacle.addImage(obstacleImage)
  obstacle.scale=0.15
  obstacleGroup.add(obstacle)
   
}
}
function food(){
if(frameCount%120===0){
  banana=createSprite(400,345,20,20)
  banana.y = Math.round(random(120,200));
  banana.velocityX=-5     
  banana.lifetime=80
  banana.addImage(bananaImage)
  banana.scale=0.1
  foodGroup.add(banana)
   
}
}
function reset(){
  gameState=PLAY;
  
  restart.visible=false;
  
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  score=0;
  survive=0;
  
  monkey.addAnimation("running",monkey_running)
  
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.9;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
  
   
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}
