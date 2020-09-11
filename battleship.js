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
    let resetButton = document.querySelector('.reset');
    let startButton = document.getElementById('start');
    let rotateButton = document.getElementById('rotate');
    resetButton.addEventListener('click', () => {
        if(started) {
            base.id = 'base';
            hori = true;
            breakdown(content);
            setup(content, markSquare, oSquares);
            breakdown(ocean);
            setup(ocean, markShip, pSquares);
            setupShips(base);
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
            alert('place all the ships first!');
        }
    });
});

