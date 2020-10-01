/**
*	AI_Function_switch
*
*	This toggles the ai_functionality switch
*	It sets ai_selector to 0 if 1 and vice versa
*	All ai_functions depend on this switch
*	Switch deactivates when game has started
*/
function ai_button_switch() {
	console.log("ai_switcher_toggled");

	//activate when the game has not started
	if (started == false) {
		//toggle ai_selector to 1 if it is 0
		if (ai_selector == 0) {
			ai_selector = 1;
			console.log("ai_selector: " + ai_selector);
			document.querySelector("#ai_switch").style.background = "hsl(115, 63%, 51%)";
		}
		//toggle ai_selector to 0 if it is 1
		else if (ai_selector == 1) {
			ai_selector = 0;
			console.log("ai_selector: " + ai_selector);
			document.querySelector("#ai_switch").style.background = "red";
		}
	}
}
/**
*	AI_level_switch
*
*	This switch controls the level of ai
*	Depends on ai_selector to be 1
*	Toggles from 1 => 2 => 3 => 1...
*/
function ai_level_switch() {
	console.log("ai_switch_toggled");
	//toggle works if ai_selector is 1
	if (ai_selector == 0) {
		ai_level = 1;
		alert("The AI is off");
		return;
	}
	//toggle commands
	if (ai_check != 0) {
		alert("The AI difficulty cannot be changed. Your current difficulty is: " + ai_level);
		return;
	}
	if (ai_level == 1) {
		ai_level = 2;
	}
	else if (ai_level == 2) {
		ai_level = 3;
	}
	else if (ai_level == 3) {
		ai_level = 1;
	}
	alert("The AI difficulty has been set to: " + ai_level);
}
/**
*	AI_functionality
*
*	This function implements .addEventListener to the ai_level_swtich, ai_start_switch
*	ands adds further ability to start swtich
*	Calls ai_level_switch, ai_button_switch and ai_starter
*/
function ai_functionality() {
	console.log("ai_func_called");
	//adds functionality dependent on addEventListener
	document.querySelector("#ai_level_switch").addEventListener("click", ai_level_switch);
	document.querySelector("#ai_switch").addEventListener("click", ai_button_switch);
	document.querySelector("#start").addEventListener("click", ai_starter);
}
/**
*	@param parent Object
*
*	This function allows marking with new_mark_system or old mark system
*	Implements set_ship_alert_hander for ai ships
*	See opponent_turn in opponent.js for set_ship_alert_handler_playerSide
*/
function mark_selector(parent) {
	for (var i = 0; i < 81; i++) {
		let elem = parent.children[i];
		if (ai_selector == 1) {
			elem.addEventListener('click', new_mark_system_0(elem));
			//elem.addEventListener("click", set_ship_alert_handler_playerSide);
			elem.addEventListener("click", set_ship_alert_handler);
			//elem.addEventListener("click", set_ship_alert_handler_playerSide);
		}
		else {
			if (parent.id == "ocean") {
				elem.addEventListener("click", markShip(elem));
			}
			else {
				elem.addEventListener("click", markSquare(elem));
			}
		}
	}
}

/**
*	Ai_starter
*
*	The AI starter sets the markers onto the board depending on the
*	ai_selector switch.
*	It adds the ai ships onto the board, sets the ai_util flag to zero
*	to disable adding ships
*	It adds playerSide ships to check array
*/
function ai_starter() {
	//set the markers on the board
	mark_selector(document.querySelector("#content"));
	mark_selector(document.querySelector("#ocean"));
	console.log("ai_starter_called");

	//use the following if the ai is on (call once until reset)
	if (ai_selector == 1 && ai_check == 0 && num2 != 0) {
		//set ai_check flag to disable ai_starter
		ai_check = 1;

		//add the logic to each button with addEvetnListener
		ai_add_to_grid();

		//set the ai_util flag to disable placing ships, and other functionality
		ai_util = 0;

		//set the upper_bound of the board
		let upper_bound = 81;

		//set the parent to be the ai_board
		let parent = document.querySelector("#content");

		//set the ship_playerSide to player_board
		let ship_playerSide = document.querySelector("#ocean");

		//increment through the number of ships
		for (let i = 1; i <= num2; i++) {
			//place down the ai_ships
			opponent_place_ships(parent, i);

			//add logic to detech sinking of player ship
			//necessary as if ai_selector is enabled, the original
			//detection does not work
			add_ship_playerSide(ship_playerSide, i);
		}
	}
}
/**
*	ai_add_to_grid
*
*	This function adds .addEventListener(opponent_turn) and
*	.addEventListener(game_state_multiplex) to the content board
*	where the player can access
*/
function ai_add_to_grid() {
	console.log("ai_add_to_grid_called");
	let parent = document.querySelector("#content");
	for (let i = 0; i < 81; i++) {
		parent.children[i].addEventListener("click", opponent_turn);
		parent.children[i].addEventListener("click", game_state_multiplex);
	}
}

