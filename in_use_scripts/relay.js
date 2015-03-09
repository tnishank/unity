#pragma strict
import SimpleJSON;
private var message = "";
private var bool = false;
private var after_state=0;



function api_call(id_relay:String,state:int) {
	var url = "http://client.atikadhandhia.com/w/v1/socket_forward/";
//	var form = new WWWForm();
	var headers = new Hashtable();
	headers.Add("Content-Type", "application/json");
	headers.Add("token","c2b1c38da84b8b94bc7b8e38d7dea0f54880b21c");
	var encoding = new System.Text.UTF8Encoding();
	var jsore = JSONNode.Parse("{}");
	jsore["method"]="PUT";
	jsore["transducer_id"]=id_relay;
	jsore["type"]="forward";
	if (state==0)
	jsore["payload"] = "1" ;
	if (state==1)
	jsore["payload"] = "0" ;
	var json=jsore.ToString();	
	Debug.Log(json);
	var request = WWW(url,encoding.GetBytes(json) , headers);
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
				
			}
			else
			{
				state = 0;
				
			}
			res = request.data;
    		recieved = JSONNode.Parse(res);
    		message=recieved["success"]["message"];
    		
	}
	
	bool=true;
	yield WaitForSeconds (2);
	bool = false;
	after_state=state;
	after_state=1;
	Debug.Log("After state");
	Debug.Log(state);
	//returnvalue(state);
}

function OnGUI() {
        if (bool){
            GUI.skin.label.fontSize = GUI.skin.box.fontSize = GUI.skin.button.fontSize = 60;
             GUI.Box(Rect(0,Screen.height*9.0/10.0,Screen.width,Screen.height),message);
         }
    }
    
function returnvalue(){
    //yield WaitForSeconds (5);
    Debug.Log(after_state);
    return after_state;
}

