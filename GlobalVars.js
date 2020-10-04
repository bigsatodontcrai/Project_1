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

let possible_ai_attack_positions = [];

ships.forEach(ship => ship.addEventListener('mousedown', (event) => {
    shipById = event.target.id;
    console.log(shipById);
}))

ships.forEach(ship => ship.addEventListener('dragstart', startDrag));

ships.forEach(ship => ship.setAttribute('draggable', 'true'));
