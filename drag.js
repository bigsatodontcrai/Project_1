/**
* @file contains all functions that control the drag and drop of the ships onto the board
*/

/**
 * startDrag - this function initiates the drag and sets the dragged object
 *
 * @param  {Object} ev event
 * @return {void}  sets the drag type ('move')
 */

function startDrag(ev) {
    console.log(this.className);
    draggedShip = this;
    draggedShipLength = this.childElementCount;
    ev.dataTransfer.dropEffect = "move";
}

/**
 * dragDrop - this function handles the drop of the ship onto the board. Transfering ship data to the board. Checks for edge cases of horizontal ships
 *
 * @return {void}  description
 */

function dragDrop() {
    if (num2 != 0) {
        let shipNameWithLastId = draggedShip.lastElementChild.id;
        let shipClass;
        shipClass = shipNameWithLastId.slice(0, -2);
        let lastShipIndex = parseInt(shipNameWithLastId.substr(-1));
        let shipLastId = lastShipIndex + parseInt(this.dataset.id);
        if(!(hori)) {
            shipLastId = 9 * lastShipIndex + parseInt(this.dataset.id)
        }
        let isTaken = false;
        let selectedShipIndex = parseInt(shipById.substr(-1));
        shipLastId = shipLastId - selectedShipIndex;
        const notWrapHori = [0, 9, 18, 27, 36, 45, 54, 63, 72, 1, 10, 19, 28, 37, 46, 55, 64, 73, 2, 11, 20, 29, 38, 47, 56, 65, 74];
        let newNotHori = notWrapHori.splice(0, 9 * lastShipIndex)
        isTaken = checkTaken(this, selectedShipIndex);

        if (!(isTaken) && hori && !newNotHori.includes(shipLastId)) {
            for (let i = 0; i < draggedShipLength; i++) {
                let shipDirectionCurrent

                if (i === 0) shipDirectionCurrent = 'start';
                if (i === draggedShipLength - 1) shipDirectionCurrent = 'end';
                pSquares[i + parseInt(this.dataset.id) - selectedShipIndex].classList.add('taken', 'horizontal', shipDirectionCurrent, shipClass);
                pSquares[i + parseInt(this.dataset.id) - selectedShipIndex].dataset.start = parseInt(this.dataset.id - selectedShipIndex);
                pSquares[i + parseInt(this.dataset.id) - selectedShipIndex].dataset.size = draggedShipLength;
            }
        }
        else if (!(isTaken) && !(hori)) {
            for (let i = 0; i < draggedShipLength; i++) {
                let shipDirectionCurrent

                if (i === 0) shipDirectionCurrent = 'start'
                if (i === draggedShipLength - 1) shipDirectionCurrent = 'end'
                pSquares[9 * i + parseInt(this.dataset.id) - selectedShipIndex].classList.add('taken', 'vertical', shipDirectionCurrent,shipClass);
                pSquares[9 * i + parseInt(this.dataset.id) - selectedShipIndex].dataset.start = parseInt(this.dataset.id - selectedShipIndex);
                pSquares[9 * i + parseInt(this.dataset.id) - selectedShipIndex].dataset.size = draggedShipLength;
            }
        }
        if (!isTaken && hori && !(newNotHori.includes(shipLastId))) {

            base.removeChild(draggedShip);

        }
        else if(!isTaken) {
            base.removeChild(draggedShip);
        }
    }

}


/**
 * checkTaken - This function takes in the currently selected ship's index and the ship object itself
 *
 * @param  {Object} elem     ship being selected
 * @param  {Number} pointerIndex the selected index of the ship
 * @return {boolean}  returns whether or not the spaces are taken based on the ship length cases
 */

function checkTaken(elem, pointerIndex) {
    let check = new Array(false, false, false, false, false);

    if (hori) {
        for(let i = 0; i < draggedShipLength; i++) {

            check[i] = pSquares[parseInt(elem.dataset.id - pointerIndex + i)].classList.contains('taken');
        }
    }
    if (!hori) {
        for (let i = 0; i < draggedShipLength; i++) {
            try{
                check[i] = pSquares[parseInt(elem.dataset.id - pointerIndex + 9 * i)].classList.contains('taken');
            } catch(error) {
                return true;
            }

        }
    }
    return (check[0] || check[1] || check[2] || check[3] || check[4]);
}

/**
 * moveOver - handles dragover HTML API behavior
 *
 * @param  {Object} ev passes in the event taking place
 * @return {void}    overrides the normal behavior of dragover
 */

function moveOver(ev) {
    ev.preventDefault();
}
/**
 * moveEnter - handles dragenter HTML API behavior
 *
 * @param  {Object} ev passes in event
 * @return {void}    overrides the normal behavior of dragenter
 */

function moveEnter(ev) {
    ev.preventDefault();

}
