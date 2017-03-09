package whotweetit;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.*;

@SuppressWarnings("serial")
public class WhoTweetItServlet extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/plain");
		resp.getWriter().println("lol");
		// The factory instance is re-useable and thread safe.
	    //fdsfdsfdsfdsfsdfds
	}
}
