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