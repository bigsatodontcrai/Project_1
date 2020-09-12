let shipById;
let draggedShip;
let draggedShipLength;

let ships = document.querySelectorAll('.ship');
let selected = false;
let num2 = 0;

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
    ships = document.querySelectorAll('.ship');

    ships.forEach(ship => ship.addEventListener('mousedown', (event) => {
        shipById = event.target.id;
        console.log(shipById);
    }))

    ships.forEach(ship => ship.addEventListener('dragstart', startDrag));

    ships.forEach(ship => ship.setAttribute('draggable', 'true'));
    
}

function breakdown(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function startDrag(ev) {
    console.log(this.className);
    draggedShip = this;
    draggedShipLength = this.childElementCount;
    ev.dataTransfer.dropEffect = "move";
}

function shipNameLastIndex() {
    return draggedShip.lastElementChild.id;
}

function nameOfShip() {
    let s = shipNameLastIndex();
    return s.slice(0, -2);
}

function lastIndexOfShip() {
    let s = shipNameLastIndex();
    return parseInt(s.substr(-1));
}

function lastId(elem) {
    return lastIndexOfShip() + parseInt(elem.dataset.id) - selectedShip();
}

function selectedShip() {
    return parseInt(shipById.substr(-1));
}

function dragDrop() {
    if(num2 != 0) {
        let shipNameWithLastId = draggedShip.lastElementChild.id;

        let shipClass;
        shipClass = shipNameWithLastId.slice(0, -2);

        let lastShipIndex = parseInt(shipNameWithLastId.substr(-1));

        let shipLastId = lastShipIndex + parseInt(this.dataset.id);

        let isTaken = pSquares[parseInt(this.dataset.id)].classList.contains('taken');

        let selectedShipIndex = parseInt(shipById.substr(-1));
        shipLastId = shipLastId - selectedShipIndex;

        const notWrapHori = [0, 9, 18, 27, 36, 45, 54, 63, 72, 1, 10, 19, 28, 37, 46, 55, 64, 73, 2, 11, 20, 29, 38, 47, 56, 65, 74];
        let newNotHori = notWrapHori.splice(0, 9 * lastShipIndex)

        const notWrapVert = [80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45]
        let newNotVert = notWrapVert.splice(0, 9 * lastShipIndex)


        isTaken = checkTaken(this, selectedShipIndex);
        console.log(isTaken);

        if (!(isTaken) && hori && !newNotHori.includes(shipLastId)) {
            for (let i = 0; i < draggedShipLength; i++) {
                pSquares[i + parseInt(this.dataset.id) - selectedShipIndex].classList.add('taken', 'horizontal', shipClass);
                pSquares[i + parseInt(this.dataset.id) - selectedShipIndex].dataset.start = parseInt(this.dataset.id - selectedShipIndex);
            }
        }
        else if (!(isTaken) && !(hori) && !newNotVert.includes(shipLastId)) {
            for (let i = 0; i < draggedShipLength; i++) {
                pSquares[9 * i + parseInt(this.dataset.id) - selectedShipIndex].classList.add('taken', 'vertical', shipClass);
                pSquares[9 * i + parseInt(this.dataset.id) - selectedShipIndex].dataset.start = parseInt(this.dataset.id - selectedShipIndex);
            }
        }
        if (!isTaken && (!newNotHori.includes(shipLastId) || !newNotVert.includes(shipLastId))) {
            base.removeChild(draggedShip);
        }
    }
    
}

function checkTaken(elem, pointerIndex) {
    let complete = false;
    let a;
    let b;
    let c;
    let d;
    let e;
    if(hori) {
        a = pSquares[parseInt(elem.dataset.id) - pointerIndex].classList.contains('taken');
        b = pSquares[parseInt(elem.dataset.id) - pointerIndex + 1].classList.contains('taken');
        c = pSquares[parseInt(elem.dataset.id) - pointerIndex + 2].classList.contains('taken');
        d = pSquares[parseInt(elem.dataset.id) - pointerIndex + 3].classList.contains('taken');
        e = pSquares[parseInt(elem.dataset.id) - pointerIndex + 4].classList.contains('taken');
    }
    if(!hori) {
        a = pSquares[parseInt(elem.dataset.id) - pointerIndex].classList.contains('taken');
        b = pSquares[parseInt(elem.dataset.id) - pointerIndex + 9].classList.contains('taken');
        c = pSquares[parseInt(elem.dataset.id) - pointerIndex + 18].classList.contains('taken');
        d = pSquares[parseInt(elem.dataset.id) - pointerIndex + 27].classList.contains('taken');
        e = pSquares[parseInt(elem.dataset.id) - pointerIndex + 36].classList.contains('taken');
    }
    
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
            complete = (a || b || c || d || e);
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

function resetAsk(chooseBar) {
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
    chooseBar.append(okbtn);


}