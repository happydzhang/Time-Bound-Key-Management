package com.yourcompany.struts.action;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.sql.*;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpSession;

public class registeredAction extends HttpServlet {
	private Connection conn = null;

	/**
	 * Constructor of the object.
	 */
	public registeredAction() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

	/**
	 * The doGet method of the servlet. <br>
	 * 
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request
	 *            the request send by the client to the server
	 * @param response
	 *            the response send by the server to the client
	 * @throws ServletException
	 *             if an error occurred
	 * @throws IOException
	 *             if an error occurred
	 */
	protected void processRequest(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession(true);

		// get the varcode from authImg
		String ver2 = (String) session.getAttribute("rand");
		

		// verify the varcode
		String vercode = request.getParameter("vercode");
		
		String validateMsg = null;
		if (vercode.equals(ver2)){
			validateMsg = "The validate code is correct";
			String url = "jdbc:Mysql://localhost:3306/";
			String dbName = "firststruts";
			String driver = "com.mysql.jdbc.Driver";
			String userName = "root";
			String password = "123456";
			response.setContentType("text/html;charset=UTF-8");
			PrintWriter out = response.getWriter();
			try {
				Class.forName(driver).newInstance();
				conn = DriverManager
						.getConnection(url + dbName, userName, password);
			} catch (InstantiationException ie) {
				ie.printStackTrace();
			} catch (IllegalAccessException iae) {
				iae.printStackTrace();
			} catch (ClassNotFoundException cnfe) {
				cnfe.printStackTrace();
			} catch (SQLException se) {
				se.printStackTrace();
			}
			try {
				String accountName = request.getParameter("username");
				String accountPass = request.getParameter("password");
				String accountAge = request.getParameter("age");
				String accountGender = request.getParameter("gender");
				String accountBirth = request.getParameter("birth");
				String accountEmail = request.getParameter("email");

				String sql1 = "select * from userinfo;";
				Statement stmt = conn.createStatement();
				ResultSet rs1 = stmt.executeQuery(sql1);
				int isExist = 0;
				while (rs1.next()) {
					if (accountName.equals(rs1.getString("username"))) {
						RequestDispatcher rd = getServletContext()
								.getRequestDispatcher("/RegisterFail.jsp");
						rd.forward(request, response);
						isExist = 1;
					}
				}
				if (isExist == 0) {
					stmt = conn.createStatement();
					String sql = "insert into userinfo(username,password,age,gender,birth,Email) values('"
							+ accountName
							+ "','"
							+ accountPass
							+ "','"
							+ accountAge
							+ "','"
							+ accountGender
							+ "','"
							+ accountBirth + "','" + accountEmail + "')";
					int i = stmt.executeUpdate(sql);
					if (i > 0) {
						RequestDispatcher rd = getServletContext()
								.getRequestDispatcher("/RegisterSuc.jsp");
						rd.forward(request, response);
					}
				}
			} catch (SQLException se) {
				se.printStackTrace();
			}
		}
		else {
			validateMsg = "The validate code is not match";
			session.setAttribute("validateMsg", validateMsg);
			RequestDispatcher rd = getServletContext()
			.getRequestDispatcher("/RegisterFail2.jsp");
			rd.forward(request, response);
		}
	}

	@Override
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 * 
	 * This method is called when a form has its tag value method equals to
	 * post.
	 * 
	 * @param request
	 *            the request send by the client to the server
	 * @param response
	 *            the response send by the server to the client
	 * @throws ServletException
	 *             if an error occurred
	 * @throws IOException
	 *             if an error occurred
	 */
	@Override
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

	public void init() throws ServletException {
		// Put your code here
	}

}
