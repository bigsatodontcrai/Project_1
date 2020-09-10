

function markSquare(element) {

    return () => 
    {
        if (element.firstChild.className == 'hitit') {
            
            let miss;
            miss = document.createElement('span');
            miss.className = 'missme';
            element.removeChild(element.firstChild);
            element.append(miss);
            
        }
        else {
            let hit;
            hit = document.createElement('span');
            hit.className = 'hitit';
            element.removeChild(element.firstChild);
            element.append(hit);
            
        }
    }
    
}

function destroy(element) {
    return () => {
        element.removeChild(element.firstChild);
        circ = document.createElement('span');
        circ.className = 'circle';
        element.append(circ);

    }
}

function markShip(square) {
    return () => {
        if (square.classList.contains('taken')) {

            let hit;
            hit = document.createElement('span');
            hit.className = 'hitit';
            square.removeChild(square.firstChild);
            square.append(hit);

        }
        else {
            let miss;
            miss = document.createElement('span');
            miss.className = 'missme';
            square.removeChild(square.firstChild);
            square.append(miss);

        }
    }
}

function rotate(element) {

}
/*
for rotate, switch class names between vert and hori, or do the same toggle as Brian's code
but also, switch the base from base to base-vert so that the container can stay the same relatively speaking
*/

function gameCheck() {

}

function sinking() {

}

function setShipNumber() {

}