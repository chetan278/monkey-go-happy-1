var monkey, monkey_running
var bananaImage, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;
var gameState
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var survivaltime = 0
function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600, 400);
  monkey = createSprite(80, 350, 10, 10);
  monkey.debug = true
  monkey.addAnimation("running", monkey_running)
  monkey.scale = 0.1;
  
  ground = createSprite(300, 380, 600, 10);
  invisibleGround = createSprite(200, 390, 400, 10);
  invisibleGround.visible = false;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("skyblue");
  fill("black");
  text("Bananas eaten :- " + score ,400,30);
  text("survival Time :- " + survivaltime,100,30) 
  if (gameState===PLAY){
   survivaltime = survivaltime + Math.round(getFrameRate()/60);
  
   if(keyDown("space") && monkey.y >335) {
      monkey.velocityY = -18;
    }
  monkey.velocityY = monkey.velocityY + 0.8
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
     
  if (monkey.isTouching(FoodGroup)){
    score = score+1;
    FoodGroup.destroyEach();
  }
  
  spawnbananas();
  spawnobstacle();
  if (monkey.isTouching(obstacleGroup)){
    gameState = END;
    }
}
 else if (gameState === END) {
    ground.velocityX = 0;
   monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
   text("Press Space to Restart" ,250,100)
    
    if(keyDown("space")) {
      reset();
    }
  }
  

  monkey.collide(invisibleGround);

  drawSprites();

}

function spawnbananas() {
if(frameCount%40 === 0){
  banana = createSprite(600,100,20,20);
  banana.addImage("banana",bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -7;
  banana.y = Math.round(random(100,250));
  banana.lifetime = 90;
  FoodGroup.add(banana);
}
}

function spawnobstacle() {
  if(frameCount % 60 === 0) {
   obstacle = createSprite(600,339,10,10);
  obstacle.setCollider("rectangle",0,0,500,400);
    obstacle.debug = true
    
    obstacle.velocityX = -6;
   obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
   obstacleGroup.add(obstacle);
   obstacle.Lifetime = 85;
  }
}

function reset(){
  gameState = PLAY;
  obstacleGroup.destroyEach();
 FoodGroup.destroyEach();
 score = 0;
  survivalscore = 0;
}