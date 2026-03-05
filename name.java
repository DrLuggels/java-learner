public class name{
    public static void main(String[] args){


}}

abstract class Fahrzeug{
private String name;

Fahrzeug(String name){
    this.name = name;
}

public String getName(){
    return name;
}

abstract int getGeschwindigkeit();
}


class Auto extends Fahrzeug{
    private int ps;

    Auto(int ps, String name){
        super(name);
        this.ps = ps;
    }

    int getGeschwindigkeit(){
        return ps*2;
    }
}

class Fahrrad extends Fahrzeug{
    Fahrrad(String name){
        super(name);
    }

    int getGeschwindigkeit(){
        return 25;
    }
}