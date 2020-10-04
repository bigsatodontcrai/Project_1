/**
*	@param	parent Object
*	@param	size	Integer
*	
8	This code controls placing down a ship on a board, the parent Object, and a size
*/
function opponent_place_ships(parent, size) {
	console.log("opponent_place_ship_called");

	//let upper_bound be 81
	var upper_bound = 81;

	//let arg0 be between [0, 1)
	let arg0 = Math.random();

	//let place_here be between [0, 81)
	let place_here = Math.floor(arg0 * upper_bound) + 0;

	//let the check be 1
	var ch = 1;

	//use opponent_place ship when not player board
	if (parent.id == "ocean") {
		return;
	}

	//while loop to place ship
	do {
		//set check to 1 when invalid position
		ch = 1;

		//let orientation between [1, 4] with
		/*
		*	1 == NORTH
		*	2 == EAST
		*	3 == SOUTH
		*	4 == WEST
		*/
		let orientation = Math.floor(Math.random() * 4) + 1;

		//reset place here to a new position
		place_here = Math.floor(Math.random() * upper_bound) + 0;

		//if place here is over 81, then out of bounds
		//dev only
		if (place_here > 81) {
			console.log("out of bounds");
		}
		console.log("placement_spot" + place_here + "size" + size + "orientation" + orientation);

		//check with collisionhandler before placing
		if (collisionHandler(parent, place_here, size, orientation)) {
			console.log("placed_ship");

			//place ship function
			place_ship(parent, place_here, size, orientation);

			//add ship to array
			add_ship(parent, size, upper_bound);

			//set flag to 0
			ch = 0;
		}
	} while (ch == 1);
}
/**
*	@param  t_parent Object
*	@param  t_place_ship_position Integer
*	@param  t_size	Integer
*	@param  t_orientation Integer
*	@return boolean Boolean
*
*	This is the collisionHandler, it the array for valid and invalid positions
8	If the position is invalid, it will return false, else return true
*/
function collisionHandler(t_parent, t_place_ship_position, t_size, t_orientation) {
	//North
	var parent = t_parent;
	var place_ship_position = t_place_ship_position;
	var size = t_size;
	var orientation = t_orientation;
	if (parent.children[place_ship_position].className != "square") {
		return false;
	}
	if (orientation == 1) {
		for (var i = 0; i < size; i++) {
			if (place_ship_position < 0) {
				return false;
			}
			if (parent.children[place_ship_position].className != "square") {
				return false;
			}
			place_ship_position -= 9;
		}
	}
	//South
	else if (orientation == 3) {
		for (var i = 0; i < size; i++) {
			if (place_ship_position >= 81) {
				return false;
			}
			if (parent.children[place_ship_position].className != "square") {
				return false;
			}
			place_ship_position += 9;
		}
	}
	//right
	else if (orientation == 2) {
		for (var i = place_ship_position; i <= place_ship_position + size - 1; i++) {
			if ((i == 8 || i == 17 || i == 26 || i == 35 || i == 44 || i == 53 || i == 62 || i == 71 || i == 80) && i != (place_ship_position + size - 1) || i < 0) {
				return false;
			}
			if (parent.children[i].className != "square") {
				return false;
			}
		}
	}
	//left
	else if (orientation == 4) {
		for (var i = place_ship_position + size; i >= place_ship_position + 1; i--) {
			console.log(i);
			if ((i == 0 || i == 9 || i == 18 || i == 27 || i == 36 || i == 45 || i == 54 || i == 63 || i == 72) && i != (place_ship_position + 1) || i > 80) {
				console.log("init_return_false");
				return false;
			}
			if (parent.children[i].className != "square") {
				return false;
			}
		}
	}
	return true;
}

/**
*	@param	t_parent Object
*	@param t_place_ship_position Integer
*	@param t_size Integer
*	@param t_orientation Integer
*
*	This function places down the ship, must call CollisionHandler beforehand
*	It will place down markers for front, middle, and end
*	The following CSS scripts used are:
*	
*	front:	see .invisi_ship_marker_front;
*	middle: see .invisi_ship_marker;
*	rear:	see .invisi_ship_marker_end;
*/
function place_ship(t_parent, t_place_ship_position, t_size, t_orientation) {
	var parent = t_parent;
	var place_ship_position = t_place_ship_position;
	var size = t_size;
	var orientation = t_orientation;
	//north
	if (orientation == 1) {
		for (var i = 0; i < size; i++) {
			if (i == 0) {
				parent.children[place_ship_position].className = "invisi_ship_marker_front";
			}
			else if (i == size - 1) {
				parent.children[place_ship_position].className = "invisi_ship_marker_end";
			}
			else {
				parent.children[place_ship_position].className = "invisi_ship_marker";
			}
			parent.children[place_ship_position].dataset.size = size;
			place_ship_position -= 9;
		}
	}
	//south
	else if (orientation == 3) {
		for (var i = 0; i < size; i++) {
			if (i == 0) {
				parent.children[place_ship_position].className = "invisi_ship_marker_front";
			}
			else if (i == size - 1) {
				parent.children[place_ship_position].className = "invisi_ship_marker_end";
			}
			else {
				parent.children[place_ship_position].className = "invisi_ship_marker";
			}
			parent.children[place_ship_position].dataset.size = size;
			place_ship_position += 9;
		}
	}
	//right
	else if (orientation == 2) {
		for (var i = place_ship_position; i <= place_ship_position + size - 1; i++) {
			if (i == place_ship_position) {
				parent.children[i].className = "invisi_ship_marker_front";
			}
			else if (i == place_ship_position + size - 1) {
				parent.children[i].className = "invisi_ship_marker_end";
			}
			else {
				parent.children[i].className = "invisi_ship_marker";
			}
			parent.children[i].dataset.size = size;
		}
	}
	//left
	else if (orientation == 4) {
		for (var i = place_ship_position + size; i >= place_ship_position + 1; i--) {
			if (i == place_ship_position + size) {
				parent.children[i].className = "invisi_ship_marker_front";
			}
			else if (i == place_ship_position + 1) {
				parent.children[i].className = "invisi_ship_marker_end";
			}
			else {
				parent.children[i].className = "invisi_ship_marker";
			}
			parent.children[i].dataset.size = size;
		}
	}
}

/**
*	Note that this code is not being used at the moment, see functional code at ai_controller.js
*
*	@param	parent Object
*	@param  mark Object
*	@param  Squares Object
*	@param  level Integer
*
*	This code sets up the ai_ships with given parent, marker (optional), Squares (optional), and level
*	It calls the following functions:
*	
*	function:	level_3
*	function:	set_ship_alert_handler
*	
*	It has high-order functions:
*	.addEventListnener
*	.append
*/
function opponent_setup(parent, mark, Squares, level) {
	let opponent_board_element;
	var upper_bound = 81;

	for (var i = 0; i < upper_bound; i++) {
		opponent_board_element = document.querySelector("#ocean").children[i];
		opponent_board_element.addEventListener("click", level_3);
		opponent_board_element.addEventListener("click", set_ship_alert_handler());
		parent.append(opponent_board_element);
	}

}

/**
*
*	This code alerts the player when the game is finished.
*	It calls two functions, game_state_opponent and game_state_player
*	It will check opponent first, then player
*/
function game_state_multiplex() {
	if (game_state_opponent()) {
		console.log("game_state_opponent_finished");
		return;
	}
	if (game_state_player()) {
		console.log("game_state_player_finished");
		return;
	}
}
/**
*
*	@return boolean
*
*	This function controls the state of the player board,
*	checking to see if the player has lost
*/
function game_state_player() {
	console.log("game_state_player_called");
	var upper_bounds = 81;
	let player_board = document.querySelector("#ocean");
	let ship_counter = 0;
	let hit_counter = 0;
	for (var i = 0; i < upper_bounds; i++) {
		if (player_board.children[i].className != "square") {
			console.log("ship_encountered");
			ship_counter++;
		}
		if (player_board.children[i].firstChild.className == "hitit") {
			console.log("hit_encountered");
			hit_counter++;
		}
	}
	if (ship_counter == hit_counter) {
		ai_util = 1;
		placeable = 0;
		alert("Game Over! The opponent has sunk your ship");
		alert("Please press restart to restart");

		//alert("Game Over! You have sunk all the opponent's ships");
		//alert("Please press restart to restart");
		return true;
	}
	return false;
}
/**
*
*	@return boolean
*
*	This function controls the state of the opponent board,
*	checking to see if the ai has lost
*/
function game_state_opponent() {
	console.log("game_state_opponent_called");
	var upper_bounds = 81;
	let opponent_board = document.querySelector("#content");
	let ship_counter = 0;
	let hit_counter = 0
	for (var i = 0; i < upper_bounds; i++) {
		if (opponent_board.children[i].className != "square") {
			console.log("ship_encountered");
			ship_counter++;
		}
		if (opponent_board.children[i].firstChild.className == "hitit") {
			console.log("hit_encountered");
			hit_counter++;
		}
	}
	if (ship_counter == hit_counter) {
		ai_util = 1;
		placeable = 0;
		alert("Game Over! You have sunk all the opponent's ships");
		alert("Please press restart to restart");

		//alert("Game Over! The opponent has sunk your ship");
		//alert("Please press restart to restart");
		return true;
	}
	return false;
}
/**
*	This code checks the ai_level flag and uses appropiate ai_level
*	The following ai_level function corresponding to each level is:
*	ai_level: 1 => level_1;	easy
*	ai_level: 2 => level_2;	medium
*	ai_level: 3 => level_3;	hard
*
*	It also handles the set_ship_alert_handler_playerSide to check status
*	of ships on the playerSide board
*/
function opponent_turn() {
	if (ai_level == 1) {
		level_1();
	}
	else if (ai_level == 2) {
		level_2();
	}
	else if (ai_level == 3) {
		level_3();
	}
	//after making move call set_ship_alert_handler_playerSide to check
	//on playerSide ships
	set_ship_alert_handler_playerSide();
}


let pick_random_space = (fire) => {
	let upper_bound = possible_ai_attack_positions.length;

	//let fire be a random number between [0, 81)
	fire = Math.floor(Math.random() * Math.floor(upper_bound));
	console.log("fire " + fire);

	//set the board to be the player's board
	let player_board = document.querySelector("#ocean");

	//set the element we intend to hit
	dir = fire;
	return (player_board.children[possible_ai_attack_positions[fire]]);
}

/**
*	Level 1 ai	(easy)
*	
*	This ai loops through randomly on content board until free
*	spot
*/
function level_1() {
	//let loop run if invalid
	let checker = 1;

	//check to see if ai is turned on
	if (ai_util != 0) {
		return;
	}
	do {
		//update checker to 1 when at invalid position
		checker = 1;

		let fire = 0;

		let selected_square = pick_random_space(fire);

		console.log(selected_square);

		if (selected_square.className == "square") {
			selected_square.firstChild.className = "missme";
			possible_ai_attack_positions.splice(dir, 1);
			console.log(possible_ai_attack_positions);
			console.log("ai missed their shot");

		}
		//if the position has a ship, set it to hit marker
		else {
			selected_square.firstChild.className = "hitit";
			possible_ai_attack_positions.splice(dir, 1);
			console.log(possible_ai_attack_positions);
			console.log("ai hit their shot");
		}

		//set checker tp zero to exit do while loop
		checker = 0;

	} while (checker == 1);
}
/**
*	Level 2 ai	(medium)
*
*	This ai loops through randomly on content until free and unhit spot
*	It it reaches player_ship div Object (!= "square"), then it switches to
*	orthogonal_mode (sets the orth_flag = 1). In orthogonal_mode
*	It puts ref. of div Object of the ship and hits until all div object in cache
*	is hit
*/
function level_2() {
	var upper_bound = 81;
	if (ai_util != 0) {
		return;
	}
	//use level_1 logic
	if(orth_flag == 0){
		let fire = 0;
		
		let selected_square = pick_random_space(fire);
		
		console.log(selected_square);
		
		if (selected_square.className == "square") {
			selected_square.firstChild.className = "missme";
			possible_ai_attack_positions.splice(dir, 1);
			console.log(possible_ai_attack_positions);
			console.log("ai missed their shot");

		}
		//if the position has a ship, set it to hit marker
		else {
			selected_square.firstChild.className = "hitit";
			possible_ai_attack_positions.splice(dir, 1);
			console.log(possible_ai_attack_positions);
			console.log("ai hit their shot");

			//when size != 1
			//set flags
			if(selected_square.dataset.size != "1"){
				orth_flag = 1;
			}	
			else{
				orth_flag = 0;
				return;
			}
			
			//setup fire_array
			let parent = document.querySelector("#ocean");
			
			//do this when size != 1
			//insert ship to attack array
			for(var i = 0; i < upper_bound; i++){
				if(parent.children[i].dataset.size == selected_square.dataset.size){
					fire_array.push(parent.children[i]);
				}
			}
		}
	}	
	//this is for level 2 logic
	else {
		let array_chk = 1;
		//increment through fire array
		for (var i = 1; i < fire_array.length; i++) {
			//if the part of the array has not been hit, hit it
			if (fire_array[i].firstChild.className != "hitit") {
				//splice from possible_ai_attack_positions
				for(var k = 0; k < possible_ai_attack_positions.length; k++){
					if(parseInt(fire_array[i].dataset.id) == possible_ai_attack_positions[k]){
						possible_ai_attack_positions.splice(k, 1);
						break;
					}
				}
				
				console.log(possible_ai_attack_positions);

				//set the firstChild.className to hitit
				fire_array[i].firstChild.className = "hitit";
				//exit function
				break;
			}
		}
		//check for places
		for(var i = 1; i < fire_array.length; i++){
			if(fire_array[i].firstChild.className == "hitit"){
				array_chk++;
			}
		}
		//condition when the array is finished
		if (array_chk == fire_array.length) {
			console.log("empty array called");

			//set the orth_flag to zero
			orth_flag = 0;

			//clear fire_array
			//set fire_array to 1 element array
			fire_array = [0];
		}
	}

}

/**
*	Level 3 ai	(hard)
*	
*	This was the easiest to implement of the three levels of ai
*	It features a for loop running until it reaches a unhit, ship div Object
*	If it reaches, it will hit and break. Do this until game has ended
*/
function level_3() {
	//check to see if ai is turned on
	if (ai_util != 0) {
		return;
	}
	console.log("level_3_called");

	//set the upper_bound to 81;
	var upper_bound = 81;

	//let the player_board be the ocean
	let player_board = document.querySelector("#ocean");

	//increment throughout to hit
	for (var i = 0; i < 81; i++) {
		//if the position is not a square and is not hit, hit the marker
		if (player_board.children[i].className != "square" && player_board.children[i].firstChild.className == "circle") {

			//set the marker
			player_board.children[i].firstChild.className = "hitit";

			//exit loop
			break;
		}
	}
}

