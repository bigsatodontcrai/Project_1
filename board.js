let shipById;
let draggedShip;
let draggedShipLength;

const ships = document.querySelectorAll('.ship');

ships.forEach(ship => ship.addEventListener('mousedown', (event) => {
    shipById = event.target.id;
    console.log(shipById);
}))

ships.forEach(ship => ship.addEventListener('dragstart', startDrag));

ships.forEach(ship => ship.setAttribute('draggable', 'true'));

function setup(parent, mark, Squares) {
    let elem;

    for (let i = 0; i < 81; i++) {
        let circ;
        elem = document.createElement('div');
        elem.className = 'square';
        elem.setAttribute('ondragover', 'event.preventDefault()');
        elem.addEventListener('click', mark(elem));
        elem.addEventListener('dblclick', destroy(elem));
        elem.addEventListener('dragstart', startDrag);
        elem.addEventListener('dragover', moveOver);
        elem.addEventListener('dragenter', moveEnter);
        elem.addEventListener('drop', dragDrop);
        
        parent.append(elem);
        elem.dataset.id = i;
        Squares.push(elem);
        circ = document.createElement('span');
        circ.className = 'circle';
        elem.append(circ);
        
    }
    
}

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
    const ships = document.querySelectorAll('.ship');

    ships.forEach(ship => ship.addEventListener('mousedown', (event) => {
        shipById = event.target.id;
        console.log(shipById);
    }))

    ships.forEach(ship => ship.addEventListener('dragstart', startDrag));

    ships.forEach(ship => ship.setAttribute('draggable', 'true'));
    
}

/*function ShipEvents() {
    const ships = document.querySelectorAll('.ship');

    ships.forEach(ship => ship.addEventListener('mousedown', (event) => {
        shipById = event.target.id;
        console.log(shipById);
    }))

    ships.forEach(ship => ship.addEventListener('dragstart', startDrag));

    ships.forEach(ship => ship.setAttribute('draggable', 'true'));
}*/

function breakdown(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
        pSquares = [];
        oSquares = [];
    }
}

function startDrag(ev) {
    console.log('starting drag');
    draggedShip = this;
    draggedShipLength = this.childElementCount;
    ev.dataTransfer.dropEffect = "move";
    console.log(draggedShip.className);
    console.log(draggedShipLength);
    console.log('dragging...');
}

function dragDrop() {
    let shipNameWithLastId = draggedShip.lastElementChild.id;

    let shipClass;
    shipClass = shipNameWithLastId.slice(0, -2);

    let lastShipIndex = parseInt(shipNameWithLastId.substr(-1));
    
    let shipLastId = lastShipIndex + parseInt(this.dataset.id);
   
    let isTaken = pSquares[parseInt(this.dataset.id)].classList.contains('taken');
 
    let selectedShipIndex = parseInt(shipById.substr(-1));
    shipLastId = shipLastId - selectedShipIndex;


    isTaken = checkTaken(this, selectedShipIndex);
    console.log(isTaken);

    if(!(isTaken)) {
        for (let i = 0; i < draggedShipLength; i++) {
            
            
            pSquares[i + parseInt(this.dataset.id) - selectedShipIndex].classList.add('taken', shipClass);
            
            
            
        }
    }
    if(!isTaken) {
        base.removeChild(draggedShip);
    }
    
    
}

function checkTaken(elem, pointerIndex) {
    let complete = false;
    let a = pSquares[parseInt(elem.dataset.id) - pointerIndex].classList.contains('taken');
    let b = pSquares[parseInt(elem.dataset.id) - pointerIndex + 1].classList.contains('taken');
    let c = pSquares[parseInt(elem.dataset.id) - pointerIndex + 2].classList.contains('taken');
    let d = pSquares[parseInt(elem.dataset.id) - pointerIndex + 3].classList.contains('taken');
    let e = pSquares[parseInt(elem.dataset.id) - pointerIndex + 4].classList.contains('taken');
    switch (draggedShipLength) {
        case 1:
            complete = a;
            break;
        case 2:
            complete = (a || b);
            break;
        case 3:
            complete = (a || b || c);
            break;
        case 4:
            complete = (a || b || c || d);
            break;
        case 5:
            complete = (a || b || c || d);
            break;
    }
    return complete;
}



function dragover_handler(ev) {
    ev.preventDefault();
}

function dragLeave() {

}

function moveOver(ev) {
    ev.preventDefault();
}

function moveEnter(ev) {
    ev.preventDefault();

}
