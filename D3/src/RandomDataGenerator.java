import java.util.Random;

public class RandomDataGenerator {
	
	public static void main(String[] args){
		Random random = new Random();
		
		System.out.println("layer,data");
		
		for(int i=0;i<5;i++){
			for(int j=0;j<200;j++){
				System.out.println((i+1)+","+(random.nextInt(80)+20));
			}
		}
	}

}
