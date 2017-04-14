package whotweetit;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;
import javax.servlet.ServletException;
import javax.servlet.http.*;

import twitter4j.JSONArray;
import twitter4j.JSONException;
import twitter4j.JSONObject;
import twitter4j.Paging;
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
		//Authentification à notre app twitter
		ConfigurationBuilder cb = new ConfigurationBuilder();
		cb.setDebugEnabled(true)
			  .setOAuthConsumerKey("IYUoQdqaJZZaiz9n4AiDU1UrS")
			  .setOAuthConsumerSecret("7YO3C9mOueSsmJu74JzzOrixAap2MoTx1mjYXYL2mu9PypEa07")
			  .setOAuthAccessToken("838801334237282304-5j1PKxHSZbsxtROZ6kbrl92dRYO35IA")
			  .setOAuthAccessTokenSecret("Llmve5ueG9ALDen7auROu1sn06NKsbcwlP9qBgj3WjBw3");
		TwitterFactory tf = new TwitterFactory(cb.build());
		Twitter twitter = tf.getInstance();
		TweetEntityEndpoint tEp = new TweetEntityEndpoint();
		TweetEntity newTweet = new TweetEntity();
		Long i = 1L;
		String MediaTest[] = new String[99999];// = {"JLMelenchon","EmmanuelMacron","MLP_Officiel","benoithamon","fhollande"};
		
		
		String chaine="";
		//String fichier ="C:\\Users\\Théo\\Desktop\\media.txt";
		String fichier = "/WEB-INF/media.txt";
		
		
		
		
		

				
				
		int nbr = 0;		
		//lecture du fichier texte	
		try{
			/*InputStream ips=new FileInputStream(fichier); 
			InputStreamReader ipsr=new InputStreamReader(ips);
			BufferedReader br=new BufferedReader(ipsr);*/
			

			//InputStream inputStream=this.getClass().getClassLoader().getResourceAsStream("/WEB-INF/media.txt"); 
			InputStream inputStream = new FileInputStream(new File("WEB-INF/media.txt"));

			BufferedReader br=new BufferedReader(new InputStreamReader(inputStream)); 
			String ligne;
			
			//System.out.println("lol");
			while ((ligne=br.readLine())!=null){
				System.out.println(nbr);
				MediaTest[nbr]=ligne;
				//chaine+=ligne+"\n";
				nbr++;
				//resp.getWriter().println(ligne);
			}
			br.close(); 
		}		
		catch (Exception e){
			System.out.println(e.toString());
		}
		
		//resp.getWriter().println(chaine);
		//Requete
		//Suppression des anciens tweet
		for(long x = 1; x <= 100; x++)
		{
			System.out.println("Lu : "+x);
			try{
				tEp.removeTweetEntity(x);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		String contenuquiz = "\"category\" : \"music\",\"";
		System.out.println("<------------- HERE1 ------------>");
		
		
		
		
		
		//FileWriter fileWriter = new FileWriter("InitDestroyCounter.initial");
		//Requete
		for(int z = 0 ; z < nbr - 1 ; z++)
		{
			try {
				Paging paging = new Paging(1, 10);
				List<Status> tweets = twitter.getUserTimeline(MediaTest[z],paging);
			    for (Status tweet : tweets) {
			    	newTweet.setId(i);
			    	newTweet.setAuthorName(tweet.getUser().getName());
			    	newTweet.setAuthorScreen(tweet.getUser().getScreenName());
			    	newTweet.setContent(tweet.getText());
			    	newTweet.setCategory("Media");
			    	newTweet.setDate(tweet.getCreatedAt());
			    	tEp.insertTweetEntity(newTweet);
			    	resp.getWriter().println("@" + tweet.getUser().getScreenName());
			    	resp.getWriter().println("Nom : " +  tweet.getUser().getName());
			    	resp.getWriter().println("Tweet :" + tweet.getText());
			    	resp.getWriter().println("Date : " + tweet.getCreatedAt());
			    	resp.getWriter().println("");
			    	i = i +1;
			    	/*contenuquiz = contenuquiz +"\"tweets\" : [{";
			    	contenuquiz = contenuquiz + "\"tweet\" :\"" + tweet.getText() + "\"";
			    	contenuquiz = contenuquiz + "\"r1\" : \"Justin Bieber\",\"r2\" : \"Miley Cyrus\",";
			    	contenuquiz = contenuquiz + "\"r3\" : \"" +   tweet.getUser().getName() + "\",\"answer\" : \"" +  tweet.getUser().getName() + "\"},";
			           */
			           
			           
			           
			    }
			} catch (TwitterException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}
