/*
 * Generated by MyEclipse Struts
 * Template path: templates/java/JavaClass.vtl
 */
package com.yourcompany.struts.form;

import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts.action.ActionErrors;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionMapping;

/** 
 * MyEclipse Struts
 * Creation date: 03-23-2013
 * 
 * XDoclet definition:
 * @struts.form name="purchaseForm"
 */
public class PurchaseForm extends ActionForm {
	/*
	 * Generated fields
	 */

	/** section property */
	private String section;

	/** startdate property */
	private String startdate;

	/** expiredate property */
	private String expiredate;

	/*
	 * Generated Methods
	 */

	/** 
	 * Method validate
	 * @param mapping
	 * @param request
	 * @return ActionErrors
	 */
	public ActionErrors validate(ActionMapping mapping,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return null;
	}

	/** 
	 * Method reset
	 * @param mapping
	 * @param request
	 */
	public void reset(ActionMapping mapping, HttpServletRequest request) {
		// TODO Auto-generated method stub
	}

	/** 
	 * Returns the section.
	 * @return String
	 */
	public String getSection() {
		return section;
	}

	/** 
	 * Set the section.
	 * @param section The section to set
	 */
	public void setSection(String section) {
		this.section = section;
	}

	/** 
	 * Returns the startdate.
	 * @return DateTool
	 */
	public String getStartdate() {
		return startdate;
	}

	/** 
	 * Set the startdate.
	 * @param startdate The startdate to set
	 */
	public void setStartdate(String startdate) {
		this.startdate = startdate;
	}

	/** 
	 * Returns the expiredate.
	 * @return DateTool
	 */
	public String getExpiredate() {
		return expiredate;
	}

	/** 
	 * Set the expiredate.
	 * @param expiredate The expiredate to set
	 */
	public void setExpiredate(String expiredate) {
		this.expiredate = expiredate;
	}
}