#pragma strict
import SimpleJSON;
private var url ="http://client.atikadhandhia.com/g/rule/";
private var r1=0;
private var r2=0;
private var r3=0;
private var r4=0;
private var r5=0;

function rule1(){
	if (r1==0)
		r1=1;
	else  
		r1=0;
	rulecall("11111",r1);
}
function rule2(){
	if (r2==0)
		r2=1;
	else  
		r2=0;
	rulecall("22222",r2);
}
function rule3(){
	if (r3==0)
		r3=1;
	else  
		r3=0;
	rulecall("33333",r3);
}
function rule4(){
	if (r4==0)
		r4=1;
	else  
		r4=0;
	rulecall("44444",r4);
}
function rule5(){
	if (r5==0)
		r5=1;
	else  
		r5=0;
	rulecall("55555",r5);
}

function rulecall(id:String,val:int){
	var form = new WWWForm();
	var headers = new Hashtable();
	headers.Add("Content-Type", "application/json");
	headers.Add("token","c2b1c38da84b8b94bc7b8e38d7dea0f54880b21c");
	var encoding = new System.Text.UTF8Encoding();
	var jso = JSONNode.Parse("{}");
	jso["rule_id"]=id;
	
	if (val==0)
		jso["command"]="deactivate";
	else
		jso["command"]="activate";
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