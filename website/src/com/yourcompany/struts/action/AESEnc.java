package com.yourcompany.struts.action;

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

import java.io.FileReader;

import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

public class AESEnc extends HttpServlet{
	
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
	
	@SuppressWarnings("deprecation")
	public void doPost(HttpServletRequest request, HttpServletResponse response)
	throws ServletException, IOException {

		//response.setContentType("text/html");
		//response.setCharacterEncoding("UTF-8");
		//request.setCharacterEncoding("UTF-8");
		PrintWriter out=response.getWriter();
		
		//ScriptEngineManager manager = new ScriptEngineManager();
	    //ScriptEngine engine = manager.getEngineByName("js");
		
		String flag = request.getParameter("flag");
		String method = request.getParameter("method");
		System.out.println(flag);
		System.out.println(method);
		

		
		//msg=request.getParameter("msg");
		//enKey=request.getParameter("enKey");
		/*
		try {
			BufferedReader reader=new BufferedReader(new FileReader(sc.getRealPath("/")+"aes.js"));
		      engine.eval(reader);
		      Invocable inv = (Invocable) engine;   
		      msg2 = (String) inv.invokeFunction("d",msg,enKey);
		      System.out.println(msg2);
		      reader.close();
		    } catch (Exception e) {
		      e.printStackTrace();
		    }
		*/
		
		/*
         * �����õ�Key ������26����ĸ��������ɣ���ò�Ҫ�ñ����ַ�����Ȼ�����������ô�þ������˿��������
         * �˴�ʹ��AES-128-CBC����ģʽ��key��ҪΪ16λ��
         */
        /*String cKey = "1234567890123456";
        // ��Ҫ���ܵ��ִ�
        String cSrc = "Email : arix04@xxx.com";
        String enString = null;
		
        try {
			enString = AES.Encrypt(cSrc, cKey);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		*/
        out.println(method+","+flag); 
		out.flush(); 
		out.close();
	}
}
