#pragma strict
private var id_relay="ARE00";

private var state = 0;
public var ItemLed: GameObject;
private var url = "http://client.atikadhandhia.com/w/v1/socket_forward/";

function Start()
{
	var form = new WWWForm();
	var headers = new Hashtable();
	headers.Add("Content-Type", "application/json");
	headers.Add("token","c2b1c38da84b8b94bc7b8e38d7dea0f54880b21c");
	var encoding = new System.Text.UTF8Encoding();
	var jso = JSONNode.Parse("{}");
	jso["method"]="GET";
	jso["transducer_id"]=id_relay;
	jso["type"]="forward";
	var json=jso.ToString();	
	Debug.Log(json);
	
	var request = WWW(url,encoding.GetBytes(json) , headers);
	yield request;
	if (request.error != null)
	{
    		Debug.Log("request error: " + request.error);
    		//ItemLed2Lamp.gameObject.SetActive(false);
    		state = 0;
	}
	else
	{
    		Debug.Log("request success");
    		Debug.Log("returned data" + request.data);
    		var res = request.data;
    		var recieved = JSONNode.Parse(res);
    		var res2=JSONNode.Parse(recieved["payload"]);
    		Debug.Log(res2["value"].AsInt);
    		//Debug.Log("0");
    		if (res2["value"].AsInt == 0){
    			state=0;
    			ItemLed.gameObject.SetActive(false);
    			Debug.Log("device off");
    			}
    		else {
    		  state=1;
    		  ItemLed.gameObject.SetActive(true);
		//ItemDIRAC3.gameObject.SetActive(true);
		     }
    			
	}
}
function Update(){
	if (Input.touchCount==1 && Input.GetTouch(0).phase == TouchPhase.Began){
				var ray = Camera.main.ScreenPointToRay (Input.GetTouch(0).position);
				var hit : RaycastHit;
				if (Physics.Raycast (ray, hit, 1000.0)) 
				{
					if (hit.collider.gameObject.name == "Cube_light_one")
					{
						/*if (state==0){
							state=1;
							ItemLed.gameObject.SetActive(true);
						}
						else{
							state=0;
							ItemLed.gameObject.SetActive(false);
						}*/devicetouched();	
					}
				}
			}
}
function devicetouched(){
	var form = new WWWForm();
	var headers = new Hashtable();
	headers.Add("Content-Type", "application/json");
	headers.Add("token","c2b1c38da84b8b94bc7b8e38d7dea0f54880b21c");
	var encoding = new System.Text.UTF8Encoding();
	var jsore = JSONNode.Parse("{}");
	jsore["method"]="PUT";
	jsore["transducer_id"]=id_relay;
	jsore["type"]="forward";
	 
	//jsore["payload"]["key"] = "relay";
	if (state==0)
	jsore["payload"] = "1" ;
	if (state==1)
	jsore["payload"] = "0" ;
	
	
//	jsore["payload"]["value"].AsInt = newval;
	var json1=jsore.ToString();	
	Debug.Log(json1);
	var request1 = WWW(url,encoding.GetBytes(json1) , headers);
	yield request1;
	if (request1.error != null)
	{
    		Debug.Log("request error: " + request1.error);
    		
	}
	else
	{
    		Debug.Log("request success");
    		Debug.Log("returned data" + request1.data);
    		if(state==0)
			{
				state = 1;
				ItemLed.gameObject.SetActive(true);
			}
			else
			{
				state = 0;
				ItemLed.gameObject.SetActive(false);			}
    		//change bulb or toggle bulb
    		
	}
}