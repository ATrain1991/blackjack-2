
const Canvas = document.querySelector('canvas');
const context= Canvas.getContext('2d');
Canvas.width = 950;
Canvas.height = 700;
const cardHeight = 156;
const cardWidth = 118;
let dealerAreaY = Canvas.height*(1/4);
let playerAreaY = Canvas.height*(3/4);
  
export default class canvas{
    
    constructor(){
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext('2d');
        this.drawCenterLine();
    }
    get dealerAreaY()
    {
        return this._dealerAreaY;
    }
    get cardWidth()
    {
        return this._cardWidth;
    }
    drawBorder(x,y,thickness=1)
    {
        context.fillStyle="black";
        context.fillRect(x-thickness,y-thickness,cardWidth+(thickness*2),cardHeight+(thickness*2));
    }
    drawText(text,x,y,color,fontSize)
    {
 
        context.font=fontSize;
        context.fillStyle=color;
        context.fillText(text,x,y,100);
    }
    clearArea(x,y,w,h)
    {
        context.clearRect(x-h,y,w,h);
    }
    drawCenterLine()//creates the line down the middle of the play surface.
    {
        context.strokeStyle="black";
        context.beginPath();
        context.moveTo(0,canvas.height/2);
        context.lineTo(canvas.width,canvas.height/2);
        context.lineWidth = "5";
        context.stroke();
    }
    drawCard(x,y,faceUp,text,color="white")
    {
        this.drawBorder(x,y,3);
        if(!faceUp) context.fillStyle="rgba(255,0,0,0.5";
        else context.fillStyle="white";
        context.fillRect(x,y,cardWidth,cardHeight);
        if(!faceUp)this.drawText(text,x+cardWidth/3,y+cardHeight/1.75,"white","35px Arial");
        else this.drawText(text,x+cardWidth/3,y+cardHeight/1.75,color,"35px Arial");
    }
    drawCircle(x,y)
    {
        context.fillStyle="red";
        context.beginPath();
        context.arc(x,y,15,0,2*Math.PI);
        context.fill();
    }
}

