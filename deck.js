//used a youtube tutorial to help clean up my version of making a deck of cards. https://www.youtube.com/watch?v=NxRwIZWjLtE
const suits = ["♠", "♥", "♦", "♣"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const cardHeight = 156;
const cardWidth = 118;
export default class deck
{
    constructor(cards = newDeck()) 
    {
        this.cards = cards;
    }
    shuffle()
    {
        for(let i = this.cards.length-1;i>=0;i--)
        {
            const newIndex = Math.floor(Math.random()*(i+1))
            let oldvalue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldvalue
            //this.cards[i], this.cards[newIndex] = this.cards[newIndex], this.cards[i] no idea why this doesn't work.
        }
        return this.cards
    }
    get length()
    {
        return this.cards.length;
    }
}   
class Card 
{
    constructor(suit, value,height,width) 
    {
        this.suit = suit;
        this.value = value;
        this.points;
        this._height = height;
        this._width = width;
    }
    get primaryPoints()
    {
        let points = parseInt(this.value);
        if(this.value == 'J' || this.value == 'Q' || this.value == 'K') points = 10;
        else if(this.value == 'A')points = 11;
        return points;
    }
    get width()
    {
        return this._width;
    }
    get height()
    {
        return this._height;
    }
    get SecondaryPoints()
    {
        let points = parseInt(this.value);
        if(this.value == 'J' || this.value == 'Q' || this.value == 'K') points = 10;
        if(this.value == 'A')points = 1;
        return points;
    }
    get color()
    {
    return this.suit == '♠' || this.suit == '♣' ? 'black' : 'red'
}
 getHTML() {
        const cardDiv = document.createElement('div');
        cardDiv.innerText = `${this.value} ${this.suit}`;
        cardDiv.classList.add('card',this.color);
        cardDiv.dataset.value = `${this.value} ${this.suit}`;
        return cardDiv;
    }
    get string()
{
    return `${this.value} ${this.suit}`;
}
}

function newDeck() 
{
    return suits.flatMap(suit =>
    {
        return values.map(value =>
            {
            return new Card(suit,value,cardHeight,cardWidth)
            })
    })
}