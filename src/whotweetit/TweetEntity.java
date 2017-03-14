package whotweetit;

import java.util.Date;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;

@PersistenceCapable(identityType=IdentityType.APPLICATION)
public class TweetEntity {
	@PrimaryKey
	@Persistent(valueStrategy=IdGeneratorStrategy.IDENTITY)
	Long id;

	@Persistent
	String content; // content of the tweet
	
	@Persistent
	String authorScreen; // author of the tweet
	
	@Persistent
	String authorName; // author of the tweet
	
	@Persistent
	Date date; // date of the tweet
	
	@Persistent
	String category; // category of the tweet (political, music artist etc.)
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getAuthorScreen() {
		return authorScreen;
	}
	public void setAuthorScreen(String authorScreen) {
		this.authorScreen = authorScreen;
	}
	public String getAuthorName() {
		return authorName;
	}
	public void setAuthorName(String authorName) {
		this.authorName = authorName;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public boolean isCategory(String category) {
		return this.category.equals(category);
	}



}