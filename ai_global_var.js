/*
*	GLOBAL AI_CTRL
*	This controls the global ai_control values and flags
*/
let ai_selector = 0;	//let ai_selector == 0 when off, ai_selector == 1 when on
let ai_level = 1;	//let ai_level == 1 at base level
let ai_check = 0;	//let ai_check == 1 when started or ai_check == 0 when reset
let ai_util = 1;	//let ai_util == 0 when started or ai_util == 1 when reset;

/*
*	GLOBAL AI_DATA
*	This controls the gloval ai_data values
*/
let ai_special_moves = 3;

/**
*	GLOBAL AI_LEVEL_2_CTRL
*	This controls the ai_level_2 control flags
*/
let orth_flag = 0;	//This is the flag for when ai_level_2 is in orthogonal mode
let ship_length = "";	//This is the ship_length of the code

//this holds the elements to hit
//init as a 1 element array
//ignore the first element when writing code
let fire_array = [0];	//This is the fire
let dir = 0;

/**
*	GLOBAL AI_SHIP_DECT
*	This controls the global_ai_ship detection
*/
//let the following arrays be the array of ships
//init as a 1 element array
//ignore the first element when writing code
let ship_array = [0];	//this is the ship_array, it has a 0th element to facilitate ship_number
let ship_sunk_array = [0];	//this is the ship_sunk_array, it has a 0th element
//same as above but for playerSide
let ship_array_playerSide = [0];	//this is the playerSide ship_array
let ship_sunk_array_playerSide = [0];	//this is the playerSide ship_sunk_array

/*
*	GLOBAL GAME_CTRL
*	This controls the global game_control placeable flag
*/
let placeable = 1;	//let placeable be 1 when placeable and 0 when not
