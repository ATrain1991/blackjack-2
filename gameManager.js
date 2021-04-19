import deck from "./deck.js"
import canvas from "./canvas.js"
let hand = new Array();
let dealerHand = new Array();
let player = {points: 0, Hand: hand};
let dealer = {points: 0, Hand: dealerHand};
let dealerTurn =false;
let activeDeck = new deck();
const gameArea = new canvas();
activeDeck.shuffle();
let hitbutton = document.getElementById("hit")
let startButton = document.getElementById("start")
startButton.addEventListener("click",startGame);
let stayButton = document.getElementById("stay");
const buffer = 10;

function startGame()
{
    startButton.innerHTML = "restart";
    gameArea.drawCenterLine();
    redraw();
    hand = new Array();
    dealerHand = new Array();
    player = {points: 0, Hand: hand};
    dealer = {points: 0, Hand: dealerHand};
    activeDeck = new deck();
    activeDeck.shuffle();
    hitbutton.addEventListener("click",playerHit);
    stayButton.addEventListener("click",stay);
    dealerHit();
    dealerHit();
    playerHit();
    playerHit();
    redraw("","");
    if(scoreCheck(player) == "blackJack")
    {
        redraw("Loser",'Winner');
        hitbutton.removeEventListener("click",playerHit);
        stayButton.removeEventListener("click",stay);
    } 
}
function SetText(dealerText,playerText)
{
    gameArea.drawText(`dealer: ${getHandValue(dealer.Hand)} ${dealerText}`,700,100,"black","40px Arial"); 
    gameArea.drawText(`player: ${getHandValue(player.Hand)} ${playerText}`,700,450,"black","40px Arial"); 
}
function dealerHit()
{
    dealer.Hand.push(activeDeck.cards.pop());
    let text = scoreCheck(dealer)
    if(text =="busted")
    {
        redraw("Busted","Winner");
        endGame();//player wins.
    } 
    else if(text == "blackJack")
    {
        redraw("Winner","Loser");
        endGame();//player loses.
    }
    else redraw();
}
function redraw(dealerText="",playerText="")
{
    gameArea.clearArea(0,0,gameArea.canvas.width*50,gameArea.canvas.height);
    gameArea.drawCard(25,25,false,activeDeck.length);
    //dealer hand draw.
    let handLength = dealer.Hand.length
    for(let i = 0;i<handLength;i++)
    {
        let CardLocationX = 150+(118+buffer)*i+2;
        console.log(CardLocationX);
        if(i == 0 && !dealerTurn) gameArea.drawCard(CardLocationX,700*.25,false,"");   
        else gameArea.drawCard(CardLocationX,700*.25,true,dealer.Hand[i].string,dealer.Hand[i].color);
    }
    //player hand draw.
    handLength = player.Hand.length;
    for(let i = 0;i<handLength;i++)
    {
        let CardLocationX = 150+(118+buffer)*i+2;
        console.log(CardLocationX);
        gameArea.drawCard(CardLocationX,700*.75,true,player.Hand[i].string,player.Hand[i].color);    
    }
    SetText(dealerText,playerText);
    if(dealerTurn) gameArea.drawCircle(680,96);
    else gameArea.drawCircle(680,446);
}
function playerHit()
{
    player.Hand.push(activeDeck.cards.pop());
    let text = scoreCheck(player)
    if(text =="busted")
    {
        dealerTurn = true;
        redraw("Winner","Busted");       
    }
    else if(text == "blackJack")
    {
        dealerTurn = true;
        redraw("Loser","blackJack");
    } 
    else redraw();
}
function getHandValue(hand)
{
    let value = 0;
    for(let i =0;i<hand.length;i++)
    {
        if(hand == dealer.Hand && !dealerTurn && i==0) continue;
        else value+=hand[i].primaryPoints
    };
    if(value > 21)
    {
        let Aces = 0;
        let count = 0;
        for(let i = 0;i<hand.length;i++)
        {
            if(hand[i].value == 'A')Aces++;
        }
        while(value>21 && count < Aces)
        {
            value-=10;
            count++;   
        }
    }
    return value;
}
function scoreCheck(participant)
{
    if(getHandValue(participant.Hand) > 21)
    return "busted";
    else if(getHandValue(participant.Hand) == 21)
    return "blackJack";
    else return "";
}
function endGame()
{

}
function stay()
{
    redraw();
    dealerTurn=true;
    hitbutton.removeEventListener("click",playerHit);
    stayButton.removeEventListener("click",stay);
    DealerTurn();
}
function DealerTurn()
{  
    
    for(var i = 0;i<dealer.Hand.length;i++)
    {
        let CardLocationX = 50+(118+buffer)*(i+1);
        gameArea.drawCard(CardLocationX,700*.25,true,dealer.Hand[i].string,dealer.Hand[i].color);
    }
    setTimeout(() =>console.log('small delay'),5000);
    while(getHandValue(dealer.Hand) < 17)
    {
        dealerHit();
        setTimeout(() =>console.log('small delay'),1000);
    }
    if(getHandValue(player.Hand) > getHandValue(dealer.Hand) || getHandValue(dealer.Hand) > 21)
    {
        redraw("Loser",'Winner');
    }
    else redraw('Winner','Loser');
}