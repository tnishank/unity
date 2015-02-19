#pragma strict
private var timePressed: float =0.0f;
private var timeLastPress: float =0.0f;
private var timeDelayThreshold: float =1.0f;
private var tim: float =1f;

function Start () {

}

function Update () {
if (Input.touchCount==1){
				var ray = Camera.main.ScreenPointToRay (Input.GetTouch(0).position);
				var hit : RaycastHit;
				if (Physics.Raycast (ray, hit, 1000.0)) 
				{
					if (hit.collider.gameObject.name == "washing_machine_room_plane")
					{
						if (Input.GetTouch(0).phase == TouchPhase.Began)
							timeLastPress = Time.time;	
						if (Input.GetTouch(0).phase == TouchPhase.Ended) {// If the user puts her finger on screen...
							timePressed = Time.time - timeLastPress;
							if (timePressed <= tim){
									Application.LoadLevel ("for_washing_machine");
								}
					
				}

			}
	}
}
}