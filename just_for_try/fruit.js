#pragma strict

public class Fruit
{
    public var color: String;
    
    //This is the first constructor for the Fruit class
    //and is not inherited by any derived classes.
    public function Fruit()
    {
        color = "orange";
        Debug.Log("1st Fruit Constructor Called");
    }
    
    //This is the second constructor for the Fruit class
    //and is not inherited by any derived classes.
    public function Fruit(newColor : String)
    {
        color = newColor;
        Debug.Log("2nd Fruit Constructor Called");
    }
    
    public function Chop()
    {
        Debug.Log("The " + color + " fruit has been chopped.");     
    }
    
    public function SayHello()
    {
        Debug.Log("Hello, I am a fruit.");
    }
}