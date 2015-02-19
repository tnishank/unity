#pragma strict

import SimpleJSON;
private var id_relay="ARE00";
private var state = 0;
public var mb_ac_led: GameObject;
private var bool=false;
private var message="Active";
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
    		mb_ac_led.gameObject.renderer.material.color = Color.red;
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
    			mb_ac_led.gameObject.renderer.material.color = Color.red;
    			Debug.Log("device off");
    			}
    		else {
    		  state=1;
    		  mb_ac_led.gameObject.renderer.material.color = Color.green;
		     }
    			
	}
	
}
function Update(){
	if (Input.touchCount==1){
				var ray = Camera.main.ScreenPointToRay (Input.GetTouch(0).position);
				var hit : RaycastHit;
				if (Physics.Raycast (ray, hit, 1000.0)) 
				{
					if (hit.collider.gameObject.name == "cube_AC_touch")
					{
						devicetouched();	
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
	
	var json1=jsore.ToString();	
	Debug.Log(json1);
	var request = WWW(url,encoding.GetBytes(json1) , headers);
	yield request;
	if (request.error != null)
	{
    		Debug.Log("request error: " + request.error);
    		var res = request.data;
    		var recieved = JSONNode.Parse(res);
    		message=recieved["error"]["message"];
    		
	}
	else
	{
    		Debug.Log("request success");
    		Debug.Log("returned data" + request.data);
    		if(state==0)
			{
				state = 1;
				mb_ac_led.gameObject.renderer.material.color = Color.green;
			}
			else
			{
				state = 0;
				mb_ac_led.gameObject.renderer.material.color = Color.red;
			}
			res = request.data;
    		recieved = JSONNode.Parse(res);
    		message=recieved["success"]["message"];
    		
	}
	disp();
}


function OnGUI() {
        if (bool){
            GUI.skin.label.fontSize = GUI.skin.box.fontSize = GUI.skin.button.fontSize = 60;
             GUI.Box(Rect(0,Screen.height*9.0/10.0,Screen.width,Screen.height),message);
         }
    }
    
function disp(){
    //yield WaitForSeconds (5);
    bool=true;
    Debug.Log("on");
    yield WaitForSeconds (2);
    Debug.Log("off");
    bool=false;
}