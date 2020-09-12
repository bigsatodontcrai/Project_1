let sinkCounter = 0;

function markSquare(element) {

    return () => 
    {
        if(started) {
            if (element.firstChild.className == 'hitit') {
                element.firstChild.className = 'missme';

            } else {
                element.firstChild.className = 'hitit';

            }
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
        if(started) {
            if (square.classList.contains('taken')) {
                square.firstChild.className = 'hitit';
                if(sinking(square)) {
                    alert('Ship of size ' + square.className.substr(-1) + ' has sunk!');
                }
                if(gameCheck()){
                    alert('Game over! All your ships have sunk!');
                    alert('You can click reset to try again.');
                }
            } else {
                square.firstChild.className = 'missme';
            }
        }
        
    }
}

function gameCheck() {
    if(sinkCounter == num2) {
        return true;
    }
    else {
        return false;
    }
}

function whichHit(elem) {
    return elem.className;
}

function sinking(elem) {
    let isSink = false;
    whichShip = whichHit(elem);
    loopNum = parseInt(whichShip.substr(-1));
    firstLoc = document.querySelector(whichShip);
    firstNum = parseInt(elem.dataset.start);
    let check = new Array(true, true, true, true, true);
    for(let i = 0; i < 5; i++) {
        if(i < loopNum) {
            check[i] = false;
        }
    }
    if(elem.classList.contains('horizontal')) {
        for(let i = 0; i < loopNum; i++) {
            check[i] = (pSquares[firstNum + i].firstChild.className == 'hitit');
        }
    } else {
        for (let i = 0; i < loopNum; i++) {
            check[i] = (pSquares[firstNum + 9*i].firstChild.className == 'hitit');

        }
    }
    isSink = check[0] && check[1] && check[2] && check[3] && check[4];
    if(isSink == true) {
        sinkCounter++;
    }
    return isSink;
}

function setShipNumber() {

}

function shipchoosing(num1) {
    for (let i = 0; i < (5 - num1); i++) {
        base.removeChild(base.lastElementChild);
    }
}
