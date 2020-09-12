let pSquares = [];
let oSquares = [];
let started = false;
let hori = true;
let base;

document.addEventListener('DOMContentLoaded', () => {
    let content = document.getElementById('content');
    let ocean = document.getElementById('ocean');
    base = document.getElementById('base');
    setup(content, markSquare, oSquares);
    setup(ocean, markShip, pSquares);
    let resetButton = document.querySelector('#reset');
    let startButton = document.getElementById('start');
    let rotateButton = document.getElementById('rotate');
    let done = document.getElementById('choose');
    resetButton.addEventListener('click', () => {
        if(started) {
            base.id = 'base';
            hori = true;
            started = false;
            breakdown(content);
            breakdown(ocean);
            pSquares = [];
            oSquares = [];
            setup(content, markSquare, oSquares);
            setup(ocean, markShip, pSquares);
            setupShips(base);
            resetAsk(done);
        }
        else {
            alert('Can reset once started.');
        }
    });
    
    rotateButton.addEventListener('click', () => {
        if(base.id == 'base') {
            base.id = 'base-vert';
            ships.forEach(ship => ship.className += '-vert');
            hori = false;
            
        }
        else if(base.id =='base-vert') {
            base.id = 'base';
            ships.forEach(ship => ship.className = ship.className.slice(0, -5));
            hori = true;
        }
        
    });

    startButton.addEventListener('click', () => {
        console.log('start');
        started = base.childElementCount == 0;
        if (!(started)) {
            alert('Place all the ships first!');
        } else {
            alert('Game has started!');
        }
    });

    let input1 = document.querySelector('#numShips');
    const shipselectclick = document.querySelector('#ok')

    shipselectclick.addEventListener('click', () => {
        let num1 = parseInt(input1.value);
        num2 = num1;
        if(!isNaN(num1) && (num1 > 5 || num1 < 1)) {
            alert('There are only five ships! Try again.');
        }
        else if (!isNaN(num1) && selected == false) {
            shipchoosing(num1);
            breakdown(done);
            selected = true;
            alert('You have chosen ' + num1 + ' ships.');
        } else if(selected == true) {
            alert('You already selected a number!');
            alert('Note: reset only works if ships have been placed');
        } else {
            alert('Please enter a valid value!');
        }
    })

});



