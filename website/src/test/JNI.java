package test;
public class JNI {
	
	static{
		System.loadLibrary("KEY_GEN");
	}
	
	public native static String getkey(int i,String key, int j);

}