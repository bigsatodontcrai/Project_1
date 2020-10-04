/**
*@file contains functions that controls the ships
*/
/**
 * markSquare - Marks the square on the opponent board if it has been hit (red) or missed (grey) when clicked on that square
 *
 * @param  {Object} element takes in a specific square to
 * @return {void}         change the child of that square which normally contains a div with className ‘circle’ to the classname ‘hitit’, specifying the opponent board has a hit, or, on another click, changes it to ‘missme’, specifying the opponent board has a miss
 */

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

/**
 * destroy - On double click of any square on the opponent board or any piece on the player board that hasn’t been it, the child of the square is reset
 *
 * @param  {Object} element the parent object
 * @return {Object}         replaces the className of the child from ‘hitit’ or ‘missme’ to ‘circle’
 */


function destroy(element) {
    return () => {
        element.removeChild(element.firstChild);
        circ = document.createElement('span');
        circ.className = 'circle';
        element.append(circ);

    }
}

/**
 * markShip - This function marks on the players board if a ship has been hit or not
 *
 * @param  {Object} square
 * @return {Object}        replaces the className of the child of square whose class list contains ‘taken’ with ‘hitit’ OR replaces the className of a circle without ‘taken’ to ‘missme’
 */


function markShip(square) {
	if(ai_selector == 1){
		return;
	}
    return () => {
        if(started) {
            if (square.classList.contains('taken') && square.firstChild.className != 'hitit') {
                square.firstChild.className = 'hitit';
                if(sinking(square)) {
                    alert('Ship of size ' + square.className.substr(-1) + ' has sunk!');
                }
                if(gameCheck()){
                    alert('Game over! All your ships have sunk!');
                    alert('You can click reset to try again.');
                }
            } else if(square.firstChild.className == 'hitit') {
                alert('Ship has already been hit at this location.');
            } else {
                square.firstChild.className = 'missme';
            }
        }

    }
}

/**
 * gameCheck - Checks if all the ships have been labeled as hit or not
 *
 * @return {boolean}  returns true if all players ships have been hit
 */

function gameCheck() {
    if(sinkCounter == num2) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * whichHit - description
 *
 * @param  {Object} elem a passed in document object
 * @return {string}      returns the className of the object passed in
 */

function whichHit(elem) {
    return elem.className;
}

/**
 * sinking - Checks if a ship has sunk
 *
 * @param  {Object} elem takes in a document object and checks if it has sunk
 * @return {boolean}      returns true if all parts of a ship have been hit
 */

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

/**
 * setShipNumber - Sets the number of ships
 *
 * @param  {Number} input1 the number of ships chosen by user
 * @param  {Object} elem   takes in an object which is broken down.
 * @return {type}        either sends an error message or sets the number of ships to be used globally and breaks down the object that contains ‘number:’ input ‘ok’
 */


function setShipNumber(input1, elem) {
    return () => {
        let num1 = parseInt(input1.value);
        num2 = num1;
        if (!isNaN(num1) && (num1 > 5 || num1 < 1)) {
            alert('There are only five ships! Try again.');
        }
        else if (!isNaN(num1) && selected == false) {
            shipchoosing(num1);
            breakdown(elem);
            selected = true;
            alert('You have chosen ' + num1 + ' ships.');
        } else if (selected == true) {
            alert('You already selected a number!');
            alert('Note: reset only works if ships have been placed');
        } else {
            alert('Please enter a valid value!');
        }
    }
}

/**
 * shipchoosing - Changes the base so that only the number of ships is there
 *
 * @param  {number} num1 the number of ships chosen
 * @return {void}      removes the last element in a loop for (5 - num1)
 */


function shipchoosing(num1) {
    for (let i = 0; i < (5 - num1); i++) {
        base.removeChild(base.lastElementChild);
    }
}
