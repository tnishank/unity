#pragma strict
var score : int = 0;
public var light1: GameObject;

function Update() { 
	transform.Rotate(Vector3(0,90,0)* Time.deltaTime);
}

function AddScore() { score ++; }