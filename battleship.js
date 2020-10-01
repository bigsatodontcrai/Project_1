
/**
 * @file runs the game of battleship 
 */
document.addEventListener('DOMContentLoaded', () => {
    let content = document.getElementById('content');
    let ocean = document.getElementById('ocean');
    base = document.getElementById('base');
    setup(content, markSquare, oSquares);
    setup(ocean, markShip, pSquares);
    
    for (let index = 0; index < ocean.children.length; index++) {
        possible_ai_attack_positions.push(index);
    }
    console.log(possible_ai_attack_positions);

    let resetButton = document.querySelector('#reset');
    let startButton = document.getElementById('start');
    let rotateButton = document.getElementById('rotate');
    let done = document.getElementById('choose');

    ai_functionality();

    resetButton.addEventListener('click', () => {
        if (started) {
            base.id = 'base';
            hori = true;
            started = false;
            sinkCounter = 0;
            num2 = 0;

            ai_check = 0;
            ai_level = 1;
            ai_util = 1;

            placeable = 1;

            //for ship_handler reset
            ship_array = [0];
            ship_sunk_array = [0];
            ship_array_playerSide = [0];
            ship_sunk_array_playerSide = [0];

            breakdown(content);
            breakdown(ocean);
            pSquares = [];
            oSquares = [];
            setup(content, markSquare, oSquares);
            setup(ocean, markShip, pSquares);
            setupShips(base);
            //opponent_place_ships;
            resetAsk(done);
        }
        else {
            alert('Can reset once started.');
        }
    });

    rotateButton.addEventListener('click', () => {
        if (base.id == 'base') {
            base.id = 'base-vert';
            ships.forEach(ship => ship.className += '-vert');
            hori = false;

        }
        else if (base.id == 'base-vert') {
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

    shipselectclick.addEventListener('click', setShipNumber(input1, done));

});
