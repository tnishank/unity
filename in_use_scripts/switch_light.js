#pragma strict


function change_status(object : GameObject,state:int){
	if (state ==0)
		object.gameObject.SetActive(false);
	else
		object.gameObject.SetActive(true);

}