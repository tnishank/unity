#pragma strict
private var url = "http://192.168.1.2/image/jpeg.cgi";
private var t : boolean =true;

function Start(){
	New();
}
function Update () {
	if(Input.touchCount==1 && Input.GetTouch(0).phase==TouchPhase.Ended){
		if(t==true)
			t=false;
		else{ 
			t=true; 
			New();
		}	
	}
}


function New () {

	while(t==true){
	 // Start a download of the given URL
			var www : WWW = new WWW (url);
	// Wait for download to complete
			yield www;
	// assign texture
			renderer.material.mainTexture = www.texture;
		
	}
}