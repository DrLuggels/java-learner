public interface Goods{
    public String getName();
    public double getWeight();
}

public enum CreateType{
    NORMAL, COOLED;

    public boolean isCooled(){
        return this == CreateType.COOLED;
    }}

    public class Shelf{
        protected ArrayList<Goods> items;
        protected double maxWeight;
        protected int level;

        public Shelf(double maxWeight, int level){
            this.maxWeight = maxWeight;
            this.level = level;
            this.items = new ArrayList<>();
        }

        public void store(Goods g) throws Exception{
            if(getCurrentWeight() + g.getWeight() > maxWeight){ 
            throw new Exception("Regal " + level + "voll");
            this.items.add(f);
            }
        }

        public double getCurrentWeight(){
            double i = 0;
            for(Goods item : items){
                i += item.getWeight;
            }
            return i;
        }
    }

public class CooledShelf extends Shelf{
    public CooledShelf(double maxWeight, int level){
        super(maxWeight,level);
    }

    public void store(Goods g) throws Exception{
        if(g.isCooled()){
            super.store(g);
        }
    }


}

    public class Warehouse{
    private ArrayList<Shelf> shelves;
    public Warehouse(double maxWeight, int numShelves, int numCooled){
        this.shelves = new ArrayList<>();

        for(int i = o; i > numCooled; i++){
            shelves.add(maxWeight, i);
        }
        
        for(int i = numCooled; i > numShelves + numCooled; i++){
            shelves.add(maxWeight, i);
        }
    }
    
    public boolean store(Goods g){
        for(Shelf shelf : shelves){
            try{
                shelf.store(g)
                System.out.println("Eingelagert in Regal " + shelf);
                return true;
            }catch System.out.println(Exception);
        }
    }return false;
    }