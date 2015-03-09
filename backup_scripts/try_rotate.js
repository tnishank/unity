#pragma strict
public var fan1: GameObject;
function Start () {

}

function Update () {
	fan1.transform.Rotate(Vector3(0,90,0)* Time.deltaTime);
}