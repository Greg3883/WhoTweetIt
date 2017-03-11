package whotweetit;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.*;

import twitter4j.Query;
import twitter4j.QueryResult;
import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.auth.AccessToken;
import twitter4j.conf.ConfigurationBuilder;

@SuppressWarnings("serial")
public class WhoTweetItServlet extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/plain");
		ConfigurationBuilder cb = new ConfigurationBuilder();
		cb.setDebugEnabled(true)
			  .setOAuthConsumerKey("IYUoQdqaJZZaiz9n4AiDU1UrS")
			  .setOAuthConsumerSecret("7YO3C9mOueSsmJu74JzzOrixAap2MoTx1mjYXYL2mu9PypEa07")
			  .setOAuthAccessToken("838801334237282304-5j1PKxHSZbsxtROZ6kbrl92dRYO35IA")
			  .setOAuthAccessTokenSecret("Llmve5ueG9ALDen7auROu1sn06NKsbcwlP9qBgj3WjBw3");
		TwitterFactory tf = new TwitterFactory(cb.build());
		Twitter twitter = tf.getInstance();
		try {
			Query query = new Query("JLMelenchon");
			QueryResult result;
			result = twitter.search(query);
			List<Status> tweets = result.getTweets();
			System.out.println(tweets);
		    for (Status tweet : tweets) {
		    	resp.getWriter().print("@" + tweet.getUser().getScreenName() + ":" + tweet.getText());
		    }
		} catch (TwitterException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
