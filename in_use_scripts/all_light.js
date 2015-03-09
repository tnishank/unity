#pragma strict
private var light1_state=0;
private var light1_relay="ARE00";
public var light1_object: GameObject;
private var light2_state=0;
private var light2_relay="ARE01";
public var light2_object: GameObject;
private var fan1_state=0;
private var fan1_relay="ARE02";
public var fan1_object: GameObject;
private var fan2_state=0;
private var fan2_relay="ARE03";
public var fan2_object: GameObject;
var Relay : relay;
var Switch : switch_light; 

function Start(){
//	light1();
}
function Update(){
	if (fan1_state ==1)
		fan1_object.transform.Rotate(Vector3(0,90,0)* Time.deltaTime);
	if (fan2_state ==1)
		fan2_object.transform.Rotate(Vector3(0,90,0)* Time.deltaTime);
}

function light1(){
	yield Relay.api_call(light1_relay,light1_state);
	light1_state=Relay.returnvalue();
	Switch.change_status(light1_object,light1_state);
	Debug.Log(light1_state);
}

function light2(){
	yield Relay.api_call(light2_relay,light2_state);
	light2_state=Relay.returnvalue();
	Switch.change_status(light2_object,light2_state);
	Debug.Log(light2_state);
}

function fan1(){
	yield Relay.api_call(fan1_relay,fan1_state);
	fan1_state=Relay.returnvalue();
	Debug.Log(fan1_state);
}

function fan2() {
	yield Relay.api_call(fan2_relay,fan2_state);
	fan2_state=Relay.returnvalue();
	Debug.Log(fan2_state);
}