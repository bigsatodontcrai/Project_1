/**
 * @file variables that are used globally are all defined in here.
 */

let pSquares = [];
let oSquares = [];
let started = false;
let hori = true;
let base;
let sinkCounter = 0;

let shipById;
let draggedShip;
let draggedShipLength;

let ships = document.querySelectorAll('.ship');
let selected = false;
let num2 = 0;

/*
*	GLOBAL AI_CTRL
*	Author: tsopeter
*	Contact: tsopeter@ku.edu
*/
/*
let ai_selector = 0;	//let ai_selector == 0 when off, ai_selector == 1 when on
let ai_level = 1;	//let ai_level == 1 at base level
let ai_check = 0;	//let ai_check == 1 when started or ai_check == 0 when reset
let ai_util = 1;	//let ai_util == 0 when started or ai_util == 1 when reset;
*/
/*
*	GLOBAL AI_DATA
*	Author: tsopeter
*	Contact: tsopeter@ku.edu
*/
//let ai_special_moves = 3;

/*
*	GLOBAL GAME_CTRL
*	Author: tsopeter
*	Contact: tsopeter@ku.edu
*/
//let placeable = 1;	//let placeable be 1 when placeable and 0 when not


ships.forEach(ship => ship.addEventListener('mousedown', (event) => {
    shipById = event.target.id;
    console.log(shipById);
}))

ships.forEach(ship => ship.addEventListener('dragstart', startDrag));

ships.forEach(ship => ship.setAttribute('draggable', 'true'));
