function new_mark_system_0(element){
	return () => {
		if(started && placeable == 1 && ai_selector == 1){
			if(element.className != "square"){
				element.firstChild.className = "hitit";
			}
			else{
				element.firstChild.className = "missme";
			}
		}
	}
}

function marker(element){
	if(ai_selector == 1){
		return new_mark_system(element);
	}
	return mark(element);
}
