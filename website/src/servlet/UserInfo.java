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

import utool.DateTool;

import java.lang.*;

public class UserInfo extends HttpServlet{

    public void init(ServletConfig config) throws ServletException {
   }
    
	
	/**
	 * Constructor of the object.
	 */
	public UserInfo() {
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
		
		//get userID
		String userID = request.getParameter("userID");
		System.out.println("UserInfo_Get userID: "+userID);
		
		//user's info
		String username = null;					
        String privilegeCateloge = null;		
        String age = null;						
        String gender = null;					
        String Email = null;
        Date birth = null;
        
        //user's subscription
        String sec;
		Date startTime;
		Date expireTime;
		Date subTime;
        
		
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
        
        try {
        	if(userID==""){
        		System.out.println("No userID");
        		out.println("please login first");
        	}else{
        		/*
            	 * generate and run sql sentence to get all info from the user table
            	 */
                ResultSet rs1 = null;
                
                String sql="select * from userinfo where userID= ?";
                prepStmt = conn.prepareStatement(sql);
    			prepStmt.setString(1, userID);
    			rs1 = prepStmt.executeQuery();
    			System.out.println("Get user info by ID");
    			
                /*
                 * construct the response message with user info
                 */
                
                if (rs1.next()){
                    username=rs1.getString("username");
                    privilegeCateloge=rs1.getString("privilegeCateloge");
                    age = rs1.getString("age");					
                    gender = rs1.getString("gender");					
                    Email = rs1.getString("Email");
                    birth = rs1.getDate("birth");
                    out.println("<ul>");
	                out.println("<li id=\"username\" class = \"list\"><p>username:"+username+"</p></li>");
	                out.println("<li id=\"privilegeCateloge\" class = \"list\"><p>Clearance:"+privilegeCateloge+"</p></li>");
	                out.println("<li id=\"age\" class = \"list\"><p>age:"+age+"</p></li>");
	                out.println("<li id=\"gender\" class = \"list\"><p>gender:"+gender+"</p></li>");
	                out.println("<li id=\"Birthday\" class = \"list\"><p>birthday:"+birth+"</p></li>");
	                out.println("<li id=\"email\" class = \"list\"><p>email::"+Email+"</p></li>");
                }
                

				/*
				 * generate and run sql sentence to get all user's subscription by its ID
				 */
				sql = "select * from purchaseinfo where userID=? order by starttime desc";
				prepStmt = conn.prepareStatement(sql);
				prepStmt.setString(1, userID);
				rs1 = prepStmt.executeQuery();
				
				/*
				 * get the section user has subscripted and its available time
				 * generate the current total privilege of reading
				 */
				int i = 1;
				while (rs1.next()){
					sec = rs1.getString("section");
					startTime = rs1.getDate("starttime");
					expireTime = rs1.getDate("expiretime");
					subTime = rs1.getDate("subtime");
					out.println("<li class = \"list\"><p>subscription info "+i+": section:"+sec+", subscripted from "+startTime+" to "+expireTime+"</p></li>");
					i++;
				}
				out.println("</ul>");
                System.out.println("the response is:"+out);
        	}
        }
        catch (SQLException se)
        {
             se.printStackTrace();  
        }finally {            
            out.close();
        }
        
	}
}
