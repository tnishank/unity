#pragma strict
import SimpleJSON;
private var state = 0;
//TODO    Change these
private var id_IR="AIR00";
private var id_relay="ARE04";

public var tv_plane: GameObject;
private var timePressed: float =0.0f;
private var timeLastPress: float =0.0f;
private var timeDelayThreshold: float =1.0f;
private var tim: float =1f;
public var ItemDIRAC3: GameObject;
private var url = "http://client.atikadhandhia.com/w/v1/socket_forward/";
function Start()
{
	tv_plane.gameObject.SetActive(false);
	ItemDIRAC3.gameObject.SetActive(false);
	//var url = "http://client.atikadhandhia.com/w/v1/user/socket_forward/";
	var form = new WWWForm();
	var headers = new Hashtable();
	headers.Add("Content-Type", "application/json");
	headers.Add("token","c2b1c38da84b8b94bc7b8e38d7dea0f54880b21c");
	var encoding = new System.Text.UTF8Encoding();
	var jso = JSONNode.Parse("{}");
	jso["method"]="GET";
	//todo change id
	jso["transducer_id"]=id_relay;
	jso["type"]="forward";
	
	var json=jso.ToString();	
	Debug.Log(json);
	
	var request = WWW(url,encoding.GetBytes(json) , headers);
	yield request;
	if (request.error != null)
	{
    		Debug.Log("request error: " + request.error);
    		//ItemDIRAC3.gameObject.SetActive(false);
			tv_plane.gameObject.SetActive(false);
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
				tv_plane.gameObject.SetActive(false);
    			Debug.Log("device off");
    			}
    		else {
    		  state=1;
			tv_plane.gameObject.SetActive(true);
		//ItemDIRAC3.gameObject.SetActive(true);
		     }
	}
}
function Update(){
	if (Input.touchCount==2){
		ItemDIRAC3.gameObject.SetActive(false);
		}
			if (Input.touchCount==1){
				var ray = Camera.main.ScreenPointToRay (Input.GetTouch(0).position);
				var hit : RaycastHit;
				if (Physics.Raycast (ray, hit, 1000.0)) 
				{
					if (hit.collider.gameObject.name == "TV_plane")
					{
						if (Input.GetTouch(0).phase == TouchPhase.Began)
							timeLastPress = Time.time;	
						if (Input.GetTouch(0).phase == TouchPhase.Ended) {// If the user puts her finger on screen...
							timePressed = Time.time - timeLastPress;
							if (timePressed <= tim){
									ontvtouch();
									ItemDIRAC3.gameObject.SetActive(false);
								}
							else 
							{
								ItemDIRAC3.gameObject.SetActive(true);
							}

						}
						
						
						
					}
				}
			}
}

function new1(){
	if(state==0)
	{
		state = 1;
		Debug.Log("on");
		tv_plane.gameObject.SetActive(true);
	}
	else{
		state = 0;
		Debug.Log("off");
		tv_plane.gameObject.SetActive(false);
	}
}


function tv_power()
{
	tv_codesend("I");
}
function tv_mute()
{
	tv_codesend("K");
}
function tv_up()
{
	tv_codesend("N");
}	
function tv_down()
{
	tv_codesend("O");
}
function tv_left()
{
	tv_codesend("P");
}
function tv_right()
{
	tv_codesend("Q");
}
function source()
{
	tv_codesend("L");
}

function tv_channelup()
{
	tv_codesend("U");
}
function tv_channeldown()
{
	tv_codesend("V");
}
function tv_volumeup()
{
	tv_codesend("S");
}
function tv_volumedown()
{
	tv_codesend("T");
}
function tv_menu()
{
	tv_codesend("M");
}
function tv_exit()
{
	tv_codesend("R");
}
function tv_ok()
{
	tv_codesend("W");
}
function close()
{
ItemDIRAC3.gameObject.SetActive(false);
}

function tv_codesend(str:String){
	//var url = "http://client.atikadhandhia.com/w/v1/socket_forward/";
	var form = new WWWForm();
	var headers = new Hashtable();
	headers.Add("Content-Type", "application/json");
	headers.Add("token","c2b1c38da84b8b94bc7b8e38d7dea0f54880b21c");
	var encoding = new System.Text.UTF8Encoding();
	
	var jsoac = JSONNode.Parse("{}");
	jsoac["method"]="PUT";
	jsoac["transducer_id"]=id_IR;
	jsoac["type"]="forward";
	//jsore["payload"] ="{}";
	//jsoac["payload"]["key"] = "Button";
	jsoac["payload"]=str;
	
	//jsodm["payload"]["value"].AsInt = newdim;
	var json2=jsoac.ToString();			
	Debug.Log(json2);		
	var request2 = WWW(url,encoding.GetBytes(json2) , headers);
	
	yield request2;
	if (request2.error != null)
	{
    		Debug.Log("request error: " + request2.error);
    		// display not connected
	}
	else
	{
    		Debug.Log("request success");
    		Debug.Log("returned data" + request2.data);
    		
	}
	//ItemDIRAC3.gameObject.SetActive(false);
}
function ontvtouch() {
	//var url = "http://client.tq.com/w/v1/user/socket_forward/";
	var form = new WWWForm();
	var headers = new Hashtable();
	headers.Add("Content-Type", "application/json");
	headers.Add("token","c2b1c38da84b8b94bc7b8e38d7dea0f54880b21c");
	var encoding = new System.Text.UTF8Encoding();
	
	var jsore = JSONNode.Parse("{}");
	jsore["method"]="PUT";
	//todo change id
	jsore["transducer_id"]=id_relay;
	jsore["type"]="forward";
	//jsore["payload"]["key"] = "relay";
	//jsore["payload"].AsInt = val;
	
	var newval=0;
	if (state ==1)
		newval=0;
	else 
		newval=1;
	jsore["payload"].AsInt = newval;
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
    		new1();
    		//change bulb or toggle bulb
    		
	}
	
}