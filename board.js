/**
*@file contains all functions that control the game board
*/
/**
 * setup - This function creates the necessary components for the board to work.
 *
 * @param  {Object} parent  takes in a document object namely either the opponent or player board
 * @param  {Function} mark    passes in the mark function, in practice the opponent board mark function or the player board mark function which work differently at runtime
 * @param  {Object} Squares In practice it passes in the empty array and pushes onto it every div element for the given board either the opponent or player is used
 * @return {void}         sets up each board and defines the behavior of each square on click
 */

function setup(parent, mark, Squares) {
    let elem;
    for (let i = 0; i < 81; i++) {
        let circ;
        elem = document.createElement('div');
        elem.className = 'square';
        elem.setAttribute('ondragover', 'event.preventDefault()');
       // elem.addEventListener('click', mark(elem));
       /*
       * added new marking system
       */
       /*
       if(ai_selector == 1){
        	elem.addEventListener('click', new_mark_system_0(elem));
        }
        else{
        	elem.addEventListener("click", mark(elem));
        }
        */
        elem.addEventListener('dblclick', destroy(elem));
        elem.addEventListener('dragstart', startDrag);
        elem.addEventListener('dragover', moveOver);
        elem.addEventListener('dragenter', moveEnter);
        elem.addEventListener('drop', dragDrop);
        /*
        if(parent.id != "ocean"){
        	elem.addEventListener('click', level_3);
        	elem.addEventListener('click', game_state_player);
        }
        if(parent.id != "ocean"){
        	elem.addEventListener('click', game_state_opponent);
        }
	*/
        parent.append(elem);
        elem.dataset.id = i;
        elem.dataset.size = 0;
        Squares.push(elem);
        circ = document.createElement('span');
        circ.className = 'circle';
        elem.append(circ);
    }
    
  //  if(parent.id != "ocean"){
    //	for(var d = 1; d <= document.querySelector("#numShips"); i++){
    /*
    	if(parent.id != "ocean"){
    		opponent_place_ships(parent, 1);
    		//opponent_place_ships(parent, 2);
    		//opponent_place_ships(parent, 3);
    		//opponent_place_ships(parent, 4);
    		//opponent_place_ships(parent, 5);
    	}
    */
    //	}
   // }

      
}

/**
 * setupShips - This function creates the area to store all draggable ships
 *
 * @param  {Object} parent takes in the base of the ships document object
 * @return {void}        places a new ship object everywhere. Only called for reset.
 */

function setupShips(parent) {
    let container;
    for (let i = 1; i < 6; i++) {

        container = document.createElement('div');
        container.className = 'ship';
        container.classList.add('ship' + i + '-container');
        container.setAttribute('draggable', 'true');
        parent.append(container);
        for (let j = 0; j < i; j++) {
            let circ;
            let piece;
            piece = document.createElement('div');
            piece.id = 'ship' + i + '-' + j;
            container.append(piece);
            circ = document.createElement('span');
            circ.id = 'circ';
            piece.append(circ);

        }
    }
    ships = document.querySelectorAll('.ship');

    ships.forEach(ship => ship.addEventListener('mousedown', (event) => {
        shipById = event.target.id;
        console.log(shipById);
    }))

    ships.forEach(ship => ship.addEventListener('dragstart', startDrag));

    ships.forEach(ship => ship.setAttribute('draggable', 'true'));

}

/**
 * breakdown - this is part of the reset function
 *
 * @param  {Object} parent the document object whose children will be deleted
 * @return {void}        deletes every child of a document object
 */

function breakdown(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/**
 * resetAsk - This function specifically resets the part of the page that asks for user input on number of ships
 *
 * @param  {Object} chooseBar a document object namely the bar where input is taken in on the page
 * @return {void}           reconstructs the document object that governs the number of ships in the correct place on the HTML and called in reset
 */

function resetAsk(chooseBar) {
    selected = false;
    let noship = document.createElement('button');
    noship.id = 'Noship';
    noship.className = 'btns';
    noship.innerText = 'Number:';
    chooseBar.append(noship);
    let numShips = document.createElement('input');
    numShips.id = 'numShips';
    numShips.type = 'number';
    chooseBar.append(numShips);
    let okbtn = document.createElement('button');
    okbtn.className = 'btns';
    okbtn.id = 'ok';
    okbtn.innerText = 'ok';
    let input1 = document.querySelector('#numShips');
    okbtn.addEventListener('click', setShipNumber(input1, chooseBar));
    chooseBar.append(okbtn);

}
