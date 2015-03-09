 #pragma strict
import SimpleJSON;
private var rgb=1;
public var Itemledfinal: GameObject;
public var ledstripremote: GameObject;
private var url = "http://client.atikadhandhia.com/w/v1/socket_forward/";
private var color: Color;

function Update () {
	if (Input.touchCount==2){
		ledstripremote.gameObject.SetActive(false);
	}
if (Input.touchCount==1){
				var ray = Camera.main.ScreenPointToRay (Input.GetTouch(0).position);
				var hit : RaycastHit;
				
				if (Physics.Raycast (ray, hit, 1000.0)) 
				{
					if (hit.collider.gameObject.name == "LED_TOUCH_BOX")
					{
						ledstripremote.gameObject.SetActive(true);
						
					}
				}
			}
}
function close(){
	ledstripremote.gameObject.SetActive(false);
}
function red(){
	
	rgb=2;
	onRGBvalue();
	//ledstripremote.gameObject.SetActive(false);
	Itemledfinal.gameObject.renderer.material.color = Color.red;
	
}
function black(){
	
	rgb=8;
	onRGBvalue();
	//ledstripremote.gameObject.SetActive(false);
	Itemledfinal.gameObject.renderer.material.color = Color.black;
	
}

function green(){
	rgb=3;
	onRGBvalue();
	ledstripremote.gameObject.SetActive(false);
	//Itemledfinal.gameObject.renderer.material.color = Color.green;
	
}
function blue(){
	
	rgb=1;
	onRGBvalue();
	Itemledfinal.gameObject.renderer.material.color = Color.blue;
	//ledstripremote.gameObject.SetActive(false);
}
function yellow(){
	rgb=6;
	onRGBvalue();
	Itemledfinal.gameObject.renderer.material.color = Color.yellow;
	//ledstripremote.gameObject.SetActive(false);
	
}
function aqua(){
	color.r=0;
	color.b=255;
	color.g = 255;
	rgb=5;
	onRGBvalue();
	Itemledfinal.gameObject.renderer.material.color=color;
	
	//ledstripremote.gameObject.SetActive(false);
}
function purple(){
	color.r=178;
	color.b=255;
	color.g = 102;
	rgb=4;
	onRGBvalue();
	//ledstripremote.gameObject.SetActive(false);
	Itemledfinal.gameObject.renderer.material.color=color;
	
}
function white(){
	Itemledfinal.gameObject.renderer.material.color = Color.white;
	rgb=7;
	onRGBvalue();
	Itemledfinal.gameObject.renderer.material.color = Color.white;

	//ledstripremote.gameObject.SetActive(false);
	
}
function onRGBvalue() {
	var form = new WWWForm();
	var headers = new Hashtable();
	headers.Add("Content-Type", "application/json");
	headers.Add("token","c2b1c38da84b8b94bc7b8e38d7dea0f54880b21c");
	var encoding = new System.Text.UTF8Encoding();
	
	var jsorgb = JSONNode.Parse("{}");
	jsorgb["method"]="PUT";
	jsorgb["transducer_id"]="ALE00";
	jsorgb["type"]="forward";
	//jsore["payload"] ="{}";
	//jsorgb["payload"]["key"] = "relay";
	jsorgb["payload"].AsInt=rgb;
	var json2=jsorgb.ToString();			
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
}