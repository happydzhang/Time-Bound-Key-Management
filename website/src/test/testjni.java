package test;
import java.io.PrintStream;
public class testjni {
	
	static{
		System.loadLibrary("KEY_GEN");
	}
	
	public native static String getkey(int i,String key, int j);

}