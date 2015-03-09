#pragma strict
import SimpleJSON;
private var url ="http://client.atikadhandhia.com/g/rule/";



function profile1(){
	//sleep	
	rulecall("11111");
}
function profile2(){
	//home
	rulecall("22222");
}
function profile3(){
	//away
	rulecall("33333");
}


function rulecall(id:String){
	var form = new WWWForm();
	var headers = new Hashtable();
	headers.Add("Content-Type", "application/json");
	headers.Add("token","c2b1c38da84b8b94bc7b8e38d7dea0f54880b21c");
	var encoding = new System.Text.UTF8Encoding();
	var jso = JSONNode.Parse("{}");
	jso["rule_id"]=id;
	jso["command"]="actuate";
	
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
	}
}