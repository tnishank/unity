#pragma strict
import SimpleJSON;
private var state=true;
private var id_dim="ADM00";
private var val: float=1.0;
private var val_change: float=1.0;
private var dim=16;
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
	jso["transducer_id"]=id_dim;
	jso["type"]="forward";
	var json=jso.ToString();	
	Debug.Log(json);
	
	var request = WWW(url,encoding.GetBytes(json) , headers);
	yield request;
	if (request.error != null)
	{
    		Debug.Log("request error: " + request.error);
	}
	else
	{
    		Debug.Log("request success");
    		Debug.Log("returned data" + request.data);
    		var res = request.data;
    		var recieved = JSONNode.Parse(res);
    		var res2=JSONNode.Parse(recieved["payload"]);
    		Debug.Log(res2["value"]);
    		//change value recieved to integer
    		var str =res2["value"].ToString();
    		var c=str[0];
			var rec :int =c;
    		if (rec>=65 && rec<=80)
    		{
    			rec=81-rec;
    			val=rec*1.0;
    		}
    		
	}
	val_change=val;

}

function Update(){
	if (Input.touchCount==1 ){
		if (TouchPhase.Began==Input.GetTouch(0).phase)
			state=false;
		if (TouchPhase.Ended==Input.GetTouch(0).phase)
			state=true;	

	}
}



function OnGUI () {
	//	val = GUI.VerticalScrollbar(Rect (30, 30, 200, 200), val, 1.0, 17.0, 1.0);
		if (Mathf.Abs(val-val_change)>1 && state==true){
			send();
			Debug.Log(val);
			val_change=val;
		}
}
function send(){
	var form = new WWWForm();
	var headers = new Hashtable();
	headers.Add("Content-Type", "application/json");
	headers.Add("token","c2b1c38da84b8b94bc7b8e38d7dea0f54880b21c");
	var encoding = new System.Text.UTF8Encoding();
	
	var jsodm = JSONNode.Parse("{}");
	jsodm["method"]="PUT";
	jsodm["transducer_id"]=id_dim;
	jsodm["type"]="forward";
//	change integer to vlaue that has to be send
	dim= val;
	var c=81-dim;
	jsodm["payload"] = System.Convert.ToChar( c ).ToString();
	var json2=jsodm.ToString();			
	Debug.Log(json2);		
	var request2 = WWW(url,encoding.GetBytes(json2) , headers);
	
	yield request2;
	if (request2.error != null)
	{
    		Debug.Log("request error: " + request2.error);
	}
	else
	{
    		Debug.Log("request success");
    		Debug.Log("returned data" + request2.data);
	}
}