function startDrag(ev) {
    console.log(this.className);
    draggedShip = this;
    draggedShipLength = this.childElementCount;
    ev.dataTransfer.dropEffect = "move";
}

function dragDrop() {
    if (num2 != 0) {
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
                let shipDirectionCurrent

                if (i === 0) shipDirectionCurrent = 'start';
                if (i === draggedShipLength - 1) shipDirectionCurrent = 'end';
                pSquares[i + parseInt(this.dataset.id) - selectedShipIndex].classList.add('taken', 'horizontal', shipDirectionCurrent, shipClass);
                pSquares[i + parseInt(this.dataset.id) - selectedShipIndex].dataset.start = parseInt(this.dataset.id - selectedShipIndex);
            }
        }
        else if (!(isTaken) && !(hori) && !newNotVert.includes(shipLastId)) {
            for (let i = 0; i < draggedShipLength; i++) {
                let shipDirectionCurrent

                if (i === 0) shipDirectionCurrent = 'start'
                if (i === draggedShipLength - 1) shipDirectionCurrent = 'end'
                pSquares[9 * i + parseInt(this.dataset.id) - selectedShipIndex].classList.add('taken', 'vertical', shipDirectionCurrent,shipClass);
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
    if (hori) {
        a = pSquares[parseInt(elem.dataset.id) - pointerIndex].classList.contains('taken');
        b = pSquares[parseInt(elem.dataset.id) - pointerIndex + 1].classList.contains('taken');
        c = pSquares[parseInt(elem.dataset.id) - pointerIndex + 2].classList.contains('taken');
        d = pSquares[parseInt(elem.dataset.id) - pointerIndex + 3].classList.contains('taken');
        e = pSquares[parseInt(elem.dataset.id) - pointerIndex + 4].classList.contains('taken');
    }
    if (!hori) {
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