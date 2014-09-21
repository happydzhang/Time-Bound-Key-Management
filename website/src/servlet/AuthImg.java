package servlet;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.Map;
import java.util.Random;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.opensymphony.xwork2.ActionContext;

public class AuthImg extends HttpServlet {

    //set auth code's font and size
    private Font myFont = new Font("Arial Black", Font.PLAIN, 16);

    @Override
    public void init() throws ServletException {
        super.init();
    }

    //generate random color
    Color getRandColor(int fc, int bc) {
        Random random = new Random();
        if (fc > 255)
            fc = 255;
        if (bc > 255)
            bc = 255;
        int r = fc + random.nextInt(bc - fc);
        int g = fc + random.nextInt(bc - fc);
        int b = fc + random.nextInt(bc - fc);
        return new Color(r, g, b);
    }

    @Override
    public void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    	//prevent pages generated from being cached
    	//make sure a new auth code is generated each time
        response.setHeader("Pragma", "No-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);
        response.setContentType("image/jpeg");
        //set authImg's size
        int width = 100, height = 20;
        //generate a new image
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        // draw in the new image
        Graphics g = image.getGraphics();
        Random random = new Random();
        g.setColor(getRandColor(200, 250));
        g.fillRect(1, 1, width - 1, height - 1);
        g.setColor(new Color(102, 102, 102));
        g.drawRect(0, 0, width - 1, height - 1);
        g.setFont(myFont);
        
        //generate random lines to tousle the image 
        g.setColor(getRandColor(160, 200));
        for (int i = 0; i < 155; i++) {
            int x = random.nextInt(width - 1);// 
            int y = random.nextInt(height - 1);// 
            int x1 = random.nextInt(6) + 1;// 
            int y1 = random.nextInt(12) + 1;// 
            g.drawLine(x, y, x + x1, y + y1);
        }
        //
        for (int i = 0; i < 70; i++) {
            int x = random.nextInt(width - 1);
            int y = random.nextInt(height - 1);
            int x1 = random.nextInt(12) + 1;
            int y1 = random.nextInt(6) + 1;
            g.drawLine(x, y, x - x1, y - y1);
        }

        //store the string generate by system
        String sRand = "";
        for (int i = 0; i < 6; i++) {
            //get a random char
            String tmp = getRandomChar();
            sRand += tmp;
            //set the chars on the auth image
            g.setColor(new Color(20 + random.nextInt(110), 20 + random.nextInt(110), 20 + random.nextInt(110)));
            g.drawString(tmp, 15 * i + 10, 15);
        }

        //get user session
        HttpSession session = request.getSession(true);
        //store the auth image in the session
        session.setAttribute("rand", sRand);
        System.out.println("authImg has put the vercode in the session"+sRand);
        g.dispose();
        // 
        ImageIO.write(image, "JPEG", response.getOutputStream());

    }

    //generate a random char 
    private String getRandomChar() {
        int rand = (int) Math.round(Math.random() * 2);//
        long itmp = 0;
        char ctmp = '\u0000';
        // 
        switch (rand) {
        // 
        case 1:
            itmp = Math.round(Math.random() * 25 + 65);
            ctmp = (char) itmp;
            return String.valueOf(ctmp);
            //
        case 2:
            itmp = Math.round(Math.random() * 25 + 97);
            ctmp = (char) itmp;
            return String.valueOf(ctmp);
            // 
        default:
            itmp = Math.round(Math.random() * 9);
            return String.valueOf(itmp);
        }
    }
}
