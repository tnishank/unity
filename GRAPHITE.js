#pragma strict
var a="&from=-10minutes";
var b="&from=-1hours";
var c="&from=-6hours";
var d="&from=-24hours";
var e="&from=-1month";
var url ="http://client.atikadhandhia.com/g/history/?type=room&target=all&from=-24hours";
private var room1 ="http://client.atikadhandhia.com/g/history/?type=room&target=1";
private var room2 ="http://client.atikadhandhia.com/g/history/?type=room&target=2";
private var room3 ="http://client.atikadhandhia.com/g/history/?type=room&target=3";
private var room4 ="http://client.atikadhandhia.com/g/history/?type=room&target=4";
private var roomall ="http://client.atikadhandhia.com/g/history/?type=room&target=all";
//private var url1 = "http://client.atikadhandhia.com/history/?type=value&target=sgl00&from=-80hours";
	
	
private var temp="http://client.atikadhandhia.com/g/history/?type=value&target=temperature";
private var glassbreak="http://client.atikadhandhia.com/g/history/?type=value&target=glassbreak";
private var gasleak="http://client.atikadhandhia.com/g/history/?type=value&target=gasleak";
private var motion="http://client.atikadhandhia.com/g/history/?type=value&target=motion";
private var pressure="http://client.atikadhandhia.com/g/history/?type=value&target=pressure";
//private var luminosity="http://client.atikadhandhia.com/g/history/?type=value&target=SLU00";
private var contact="http://client.atikadhandhia.com/g/history/?type=value&target=contact";
private var humidity="http://client.atikadhandhia.com/g/history/?type=value&target=humidity";	
	
private var ac ="http://client.atikadhandhia.com/g/history/?type=power&target=ARE00";
private var fridge ="http://client.atikadhandhia.com/g/history/?type=power&target=ARE01";
private var tv ="http://client.atikadhandhia.com/g/history/?type=power&target=ARE02";
private var microwave ="http://client.atikadhandhia.com/g/history/?type=power&target=ARE03";
private var geyser ="http://client.atikadhandhia.com/g/history/?type=power&target=ARE04";
private var washingmachine ="http://client.atikadhandhia.com/g/history/?type=power&target=ARE04";
private var alllights ="http://client.atikadhandhia.com/g/history/?type=power&target=ARE05";

function Start () {
	while(true)
	{
		var form = new WWWForm();
       var headers = new Hashtable();
       headers.Add("token","c2b1c38da84b8b94bc7b8e38d7dea0f54880b21c");
	 // Start a download of the given URL
			var www : WWW = new WWW (url,null,headers);
	// Wait for download to complete
			yield www;
	// assign texture
			renderer.material.mainTexture = www.texture;

	}
}

function Update() {
	
}
function buttonroom1()
{
 	url=String.Concat(room1,d);
}
function buttonroom2()
{
	url=String.Concat(room2,d);
}
function buttonroom3()
{
	url=String.Concat(room3,d);
}
function buttonroom4()
{
	url=String.Concat(room4,d);
}
function buttonall()
{
	url=String.Concat(roomall,d);
}
function ac1()
{
	url=String.Concat(ac,d);
}
function tv1()
{
	url=String.Concat(tv,d);
}
function gey1()
{
	url=String.Concat(geyser,d);
}
function microwave1()
{
	url=String.Concat(microwave,d);
}
function fridge1()
{
	url=String.Concat(fridge,d);
}
function washingmachine1()
{
	url=String.Concat(washingmachine,d);
}
function all_lights()
{
	url=String.Concat(alllights,d);
}
function temp1()
{
	url=String.Concat(temp,d);
}
function pressures1()
{
	url=String.Concat(pressure,d);
}
function humidity1()
{
	url=String.Concat(humidity,d);
}
function contact1()
{
	url=String.Concat(contact,d);
}
function gasleak1()
{
	url=String.Concat(gasleak,d);
}
function glassbreak1()
{
	url=String.Concat(glassbreak,d);
}
function motion1()
{
	url=String.Concat(motion,d);
}
function mint1()
{
	url=String.Concat(url,a);
}
function hr1()
{
	url=String.Concat(url,b);
}
function hr6()
{
	url=String.Concat(url,c);
}
function hr24()
{
	url=String.Concat(url,d);
}
function month1()
{
	url=String.Concat(url,e);

}