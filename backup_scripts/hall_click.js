#pragma strict

	private var timePressed: float =0.0f;
	private var timeLastPress: float =0.0f;
	private var timeDelayThreshold: float =1.0f;
	private var tim: float =2f;

function Start()
{
}
function Update(){
for (var touch: Touch in Input.touches) {
			if (touch.phase == TouchPhase.Began)
			{
				var ray = Camera.main.ScreenPointToRay (touch.position);
				var hit : RaycastHit;
				if (Physics.Raycast (ray, hit, 1000.0)) {
					if (hit.collider.gameObject.name == "hall_plane")
					{
					//newscript();
					Application.LoadLevel ("Hall_enter");	
					}
				}
			}
	}
	}
function newscript()
{
	if (Input.GetTouch(0).phase == TouchPhase.Began) { // If the user puts her finger on screen...
			timePressed = Time.time - timeLastPress;
			Application.LoadLevel ("Hall_enter");
			Debug.Log("short_pressed");
		}
		
		if (Input.GetTouch(0).phase == TouchPhase.Began) { // If the user raises her finger from screen
			timeLastPress = Time.time;
			if (timePressed > tim) { 
				Debug.Log("LONG_pressed");
				Application.LoadLevel ("2bhk_model");
				// Is the time pressed greater than our time delay threshold?
				//Do whatever you want
			}
		}
}
