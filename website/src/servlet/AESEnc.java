package servlet;

import java.io.BufferedReader;
import java.io.IOException; 
import java.io.PrintWriter; 

import javax.servlet.ServletConfig;
import javax.servlet.ServletException; 
import javax.servlet.http.HttpServlet; 
import javax.servlet.http.HttpServletRequest; 
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.ServletContext;
import javax.sql.DataSource;

import java.io.FileReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

import org.apache.struts.action.ActionForward;

import test.JNI;
import utool.DateTool;

import java.lang.*;

public class AESEnc extends HttpServlet{
	/**
	 * initial the ServletContext
	 */
	ServletContext sc;
    public void init(ServletConfig config) throws ServletException {
       super.init(config);
       sc=config.getServletContext();
   }
    
	
	/**
	 * Constructor of the object.
	 */
	public AESEnc() {
		super();
	}


	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}
	
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) 
	throws ServletException, IOException { 
	
		doPost(request, response);
	
	}
	
	public void doPost(HttpServletRequest request, HttpServletResponse response)
	throws ServletException, IOException {
		Connection conn=null;
		java.sql.PreparedStatement prepStmt = null;
		PrintWriter out=response.getWriter();
		HttpSession session = request.getSession();
		
		//get the method to be used
		String method = request.getParameter("method");
		System.out.println("Run method: "+method);
		
		String newsTitle = null;	//title of news
        String newsID = null;		//ID of news
        String userID = null;		//ID of user
        String flag = null;			//chosen section
		
        //construct relevant information needed for database connection 
		String url = "jdbc:Mysql://localhost:3306/";
        String dbName = "firststruts";
        String driver = "com.mysql.jdbc.Driver";
        String userName = "root"; 
        String password = "123456";
        
        //connect to database
        try {
            Class.forName(driver).newInstance();
            conn = DriverManager.getConnection(url+dbName,userName,password);
        }
        catch (InstantiationException ie)
        {
             ie.printStackTrace();
        }
        catch (IllegalAccessException iae)
        {
             iae.printStackTrace();
        }
        catch (ClassNotFoundException cnfe) {
             cnfe.printStackTrace();
        } 
        catch (SQLException se)
        {
             se.printStackTrace();  
        }
        /**
         * Run method Title
         * The method will send back available Titles of a specific section
         */
        if(method.equals("Title")){
        	System.out.println("into method Title");	//print the method used
        	flag = request.getParameter("flag");	//get the chosen section
    		System.out.println("get flag: "+flag);		//print the chosen section
    		
    		try {
            	/*
            	 * generate and run sql sentence to get all news from the news table
            	 */
                ResultSet rs1 = null;
                
                String sql="select * from news where section= ?";
                prepStmt = conn.prepareStatement(sql);
    			prepStmt.setString(1, flag);
    			rs1 = prepStmt.executeQuery();
                
                System.out.println("get all news.");
                /*
                 * construct the response message
                 */
                out.println("<ul>");
                while (rs1.next()){
                    newsTitle=rs1.getString("name");
                    newsID=String.valueOf(rs1.getInt("idnews"));
                    out.println("<a onclick=\"read("+newsID+")\"><li id=\""+newsID+"\" class = \"list\">");	//trigger read function in index.jsp by click Title
                    out.println("<p>Title: " + newsTitle );
                    out.println("</p></li></a>");
                }
                out.println("</ul>");
                System.out.println("the response is:"+out);
            }
            catch (SQLException se)
            {
                 se.printStackTrace();  
            }finally {            
                out.close();
            }
        }
        
        if(method.equals("read")){
        	System.out.println("into method read");	//print the method used
        	newsID=request.getParameter("newsID");	//get the ID of chosen news
			userID=request.getParameter("userID");	//get userID
			flag=request.getParameter("flag");	//get chosen section
			System.out.println("get newsID: "+newsID);	//print newsID
			System.out.println("get userID: "+userID);	//print userID
			System.out.println("get section: "+flag);	//print chosen section
			
			String keyi = null;	//reading clearance of user
			int keyj = 0;	//reading requirements of news
			String keyi_y = null;	//y-coordinate value of keyi
			String keyj_y = null;	//y-coordinate value of keyj
	        String keyjt = null;	//the AES encryption key
	        
	        boolean iReadj = false;
	        
			/*
			 * build script engine to read js file
			 */
        	ScriptEngineManager manager = new ScriptEngineManager();
    	    ScriptEngine engine = manager.getEngineByName("js");
    	    
        	try {
                String content = null;
                String postTitle = null;
                
                ResultSet rs1 = null;  
				
				String sql="select * from news where idnews= ?";
                prepStmt = conn.prepareStatement(sql);
    			prepStmt.setString(1, newsID);
    			rs1 = prepStmt.executeQuery();

				if (rs1.next()){
					//get the title of the news
					postTitle=rs1.getString("name");
					System.out.println("get news Title:"+postTitle);
				}else{
					postTitle="no such news.";
					System.out.println("Failure:"+postTitle);
				}
                
                
                if(newsID==""||userID==""||flag==""){	//the method need newsID and userID to finish 
                    System.out.println("Failed to get newsID or userID or flag");
                    out.print(postTitle+"<br>");
                    out.print("Please try login first.");
                }else{
                	/*
                	 * generate and run sql sentence to get all user information from the userinfo table
                	 */ 
	                sql="select * from userinfo where userID= ?";
	                prepStmt = conn.prepareStatement(sql);
	    			prepStmt.setString(1, userID);
	    			rs1 = prepStmt.executeQuery();
	                
	                //get user's clearance of reading
					if (rs1.next()) {
						keyi = rs1.getString("privilegeCateloge");
						System.out.println("get key i: "+keyi);
					}
					
					if (keyi==null){
						System.out.println("fail to get keyi");	//print failure message if failed to get the clearance
						out.print(postTitle+"<br>");
						out.println("System error, not clearance.");	//response the failure message
					}else if(keyi.equals("0")){
						System.out.println("user do not have the right to read anything");	//print failure message of lacking clearnace
						out.print(postTitle+"<br>");
						out.println("You do not have to right to read.");	//response the failure message
					}else{
						
						//get key j
						keyj = (int)Math.pow(2,(Integer.parseInt(flag)-1));
				        System.out.println("get key j:"+keyj);

				        //check whether the user own's the right to read the chosen section 
				        if((Integer.parseInt(keyi)%(keyj*2))>=keyj){
				        	iReadj = true;
				        	System.out.println("user owns the right to read the news.");
				        }
				        
				        //DO the further steps if the user owns the right to read
				        if(!iReadj){
				        	System.out.println("user do not have the right to read the chosen section");	//print failure message of lacking clearnace
							out.print(postTitle+"<br>");
							out.println("You do not have to right to read.");	//response the failure message
				        }else{
				        	//get keyj's y-coordinate value
							sql="select * from ki where ID= ?";
			                prepStmt = conn.prepareStatement(sql);
			    			prepStmt.setString(1, String.valueOf(keyj));
			    			rs1 = prepStmt.executeQuery();
							
							if (rs1.next()){
								//get y-coordinate value
								keyj_y=rs1.getString("Ky");
								System.out.println("The y-coordinate value of key j: "+keyj_y);
							}
							
				        	/*
							 * generate the AES encryption key
							 * user's clearance keyi, the news requirements keyj, and the current time is given
							 * if user owns the right to read the chosen news, an encryption key will be returned
							 */
							keyjt = getEncKey(keyj_y,keyj);
							System.out.println("get key jt: "+keyjt);
							
							if (keyjt==null){
								System.out.println("fail to get keyjt");//print the failure message because of no clearance
								out.print(postTitle+"<br>");
								out.println("System error.");	//response the failure message
							}else{
								/*
								 * After checking the clearance, generate and run sql sentence to get the news
								 */
								sql="select * from news where idnews= ?";
				                prepStmt = conn.prepareStatement(sql);
				    			prepStmt.setString(1, newsID);
				    			rs1 = prepStmt.executeQuery();
	
								if (rs1.next()){
									//get the title and the content of the news
									postTitle=rs1.getString("name");
									content=rs1.getString("content");
									
									/*
									 * encipher the content by AES algorithm with the AES encryption key
									 */
									try {
										//read AES algorithm and encrypt the content
										BufferedReader reader=new BufferedReader(new FileReader(sc.getRealPath("/")+"aes.js"));
										engine.eval(reader);
										Invocable inv = (Invocable) engine;   
										content = (String) inv.invokeFunction("d",content,keyjt);
										System.out.println(content);
										reader.close();
										
										//construct the response message
										out.println("Success<br>");	//<bar> is used to split the message in later steps
										out.println(""+postTitle+"&nbsp;&nbsp;&nbsp;&nbsp;");
										out.println("<br>"+content+"<br>");
										} catch (Exception e) {
										  e.printStackTrace();
										}
								}else{
									out.print(postTitle+"<br>");
								}
							}
				        }
						
					}
                }
        			
        	}
            catch (SQLException se)
            {
                 se.printStackTrace();  
            }finally {            
                out.close();
            }
        }
        
        /*
         * Close the connection to database
         */
        if(conn != null) {
     	   try {
     	    conn.close();
     	   } catch(Exception e) {
     	    e.printStackTrace();
     	   }
     	   conn = null;
     	}
	}

	/**
	 * The function used to calculate AES encryption key
	 * @param keyj_y
	 * @param keyj 
	 * @return
	 */

	private String getEncKey(String keyj_y, int keyj) {
		/*
		 * generate the t used
		 * t is calculated by a fixed start date and the current date
		 */
		String strDateStart="2013-03-01";	//set the start date
		
		//calculate the t
		Date date_start = DateTool.getDate(strDateStart);
		Date curDate = new Date();
		int t=(int) ((curDate.getTime()-date_start.getTime())/86400000);	//86400000 millisec is one day
		
		//display the t selected
		System.out.println("the t is:"+t);
		
		if(keyj_y==null){
			System.out.println("database error, no such keyj");
			return null;
		}else{
			String keyjt = "False to get key";
			System.out.println(System.getProperty("java.library.path"));
			keyjt = JNI.getkey(t, keyj_y, keyj);
			
			return keyjt;
		}
	}
	
	public native static String getkey(int i,String key, int j);
	
}