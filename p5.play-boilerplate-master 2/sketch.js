var hotairballoon, hotairballoonImage
var bird1,bird2
var obstacle1,obstacle2
var tree1, tree2
var backgroundimage
var canvas
var view
var PLAY =1
var END =0
var gameState = PLAY
var gameOver , gameOverimg
var restart,restartimg


function preload(){
    hotairballoonImage=loadImage("images/Hotballoon.png");
    bird1=loadImage("images/bird1.png");
    bird2=loadImage("images/bird2.png");
    obstacle1 = loadImage("images/obstacle1.png");
    obstacle2 = loadImage("images/obstacle2.png");
    tree1 = loadImage("images/tree1.png");
    tree2 = loadImage("images/tree2.png");
    backgroundimage= loadImage("images/mount.jpg");
     restartimg= loadImage("images/restart.png")
    gameOverimg = loadImage("images/gameOver.png")
}
function setup() {
  canvas =createCanvas(600,600);
  
  

  view = createSprite(300,300,100,100)
  view.addImage(backgroundimage)
  view.scale=1
  
  

  hotairballoon = createSprite(200,200,50,50);
  hotairballoon.addImage(hotairballoonImage)
  hotairballoon.scale = 0.4
  
  restart = createSprite(300,300,20,20)
  restart.addImage(restartimg)
  restart.scale=0.3
  
   gameOver = createSprite(300,250,20,20)
   gameOver.addImage(gameOverimg)
   gameOver.scale=0.4
  

  ObstacleGroup = createGroup()
  treeGroup = createGroup()
  birdGroup = createGroup()
  

}

function draw() {
  background("white")

  if(gameState === PLAY){

    gameOver.visible = false
    restart.visible = false

  if(keyDown(UP_ARROW)){
    hotairballoon.y-= 0.8
  }

  if(keyDown(DOWN_ARROW)){
    hotairballoon.y+= 0.8
  }
  view.velocityX = -0.5
  if(view.x<0){
    
    view.x = view.width/2
  }
  
  spawnObstacles();
  spawntrees();
  spawnbirds();


  if(ObstacleGroup.isTouching(hotairballoon)|| treeGroup.isTouching(hotairballoon) || birdGroup.isTouching(hotairballoon)  ){
    gameState = END
    console.log ("END")
  }
}
else if(gameState === END){
  gameOver.visible = true
  restart.visible = true

  hotairballoon.velocityX = 0
  
  ObstacleGroup.setLifetimeEach(0)
 birdGroup.setLifetimeEach(0)
 treeGroup.setLifetimeEach(0)
 
 if(mousePressedOver(restart)){
   reset()
 }

}
  drawSprites();

}

function spawnObstacles(){
if(frameCount % 75 === 0){
  var obstacle = createSprite(500,550,20,20);
  obstacle.velocityX = -4;

   var rand = Math.round(random(1,2));
   switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break; 
      default: break;
   }

      obstacle.scale = 0.7
      ObstacleGroup.add(obstacle);
    
  }
   }
   function spawntrees(){
    if(frameCount % 125 === 0){
      var tree = createSprite(500,550,20,20);
      tree.velocityX = -4;
    
       var rand = Math.round(random(1,2));
       switch (rand) {
          case 1:
            tree.addImage(tree1);
            break;
          case 2:
            tree.addImage(tree2);
            break; 
          default: break;
       }
    
       tree.scale=1.2
       treeGroup.add(tree)
      }
    }

    function spawnbirds(){
      if(frameCount % 70 === 0){
        var bird = createSprite(550,50,20,20);
        bird.velocityX = -4;
      
         var rand = Math.round(random(1,2));
         switch (rand) {
            case 1:
              bird.addImage(bird1);
              break;
            case 2:
              bird.addImage(bird2);
              break; 
            default: break;
         }
      
         bird.scale=0.4
         birdGroup.add(bird)
        }
      }
     function reset(){
       gameState = PLAY
       ObstacleGroup.destroyEach()
       birdGroup.destroyEach()
       treeGroup.destroyEach()
     }      
         

 




