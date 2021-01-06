export default class game_object{
 x=0
 y=0
 width=0
 height=0

 //para mover los objetos
 moveX(x){
    this.x = this.x+x;
 }

 moveY(y){
     this.y = this.y+y;
 }


 constructor(x,y,width,height){
     this.x = x;
     this.y = y;
     this.width = width;
     this.height = height;
 }

}

