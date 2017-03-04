package whotweetit;

import whotweetit.PMF;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.response.CollectionResponse;
import com.google.appengine.api.datastore.Cursor;
import com.google.appengine.datanucleus.query.JDOCursorHelper;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Nullable;
import javax.inject.Named;
import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;

@Api(name = "tweetentityendpoint", namespace = @ApiNamespace(ownerDomain = "mycompany.com", ownerName = "mycompany.com", packagePath = "services"))
public class TweetEntityEndpoint {

	/**
	 * This method lists all the entities inserted in datastore.
	 * It uses HTTP GET method and paging support.
	 *
	 * @return A CollectionResponse class containing the list of all entities
	 * persisted and a cursor to the next page.
	 */
	@SuppressWarnings({ "unchecked", "unused" })
	@ApiMethod(name = "listTweetEntity")
	public CollectionResponse<TweetEntity> listTweetEntity(@Nullable @Named("cursor") String cursorString,
			@Nullable @Named("limit") Integer limit) {

		PersistenceManager mgr = null;
		Cursor cursor = null;
		List<TweetEntity> execute = null;

		try {
			mgr = getPersistenceManager();
			Query query = mgr.newQuery(TweetEntity.class);
			if (cursorString != null && cursorString != "") {
				cursor = Cursor.fromWebSafeString(cursorString);
				HashMap<String, Object> extensionMap = new HashMap<String, Object>();
				extensionMap.put(JDOCursorHelper.CURSOR_EXTENSION, cursor);
				query.setExtensions(extensionMap);
			}

			if (limit != null) {
				query.setRange(0, limit);
			}

			execute = (List<TweetEntity>) query.execute();
			cursor = JDOCursorHelper.getCursor(execute);
			if (cursor != null)
				cursorString = cursor.toWebSafeString();

			// Tight loop for fetching all entities from datastore and accomodate
			// for lazy fetch.
			for (TweetEntity obj : execute)
				;
		} finally {
			mgr.close();
		}

		return CollectionResponse.<TweetEntity>builder().setItems(execute).setNextPageToken(cursorString).build();
	}

	/**
	 * This method gets the entity having primary key id. It uses HTTP GET method.
	 *
	 * @param id the primary key of the java bean.
	 * @return The entity with primary key id.
	 */
	@ApiMethod(name = "getTweetEntity")
	public TweetEntity getTweetEntity(@Named("id") Long id) {
		PersistenceManager mgr = getPersistenceManager();
		TweetEntity tweetentity = null;
		try {
			tweetentity = mgr.getObjectById(TweetEntity.class, id);
		} finally {
			mgr.close();
		}
		return tweetentity;
	}

	/**
	 * This inserts a new entity into App Engine datastore. If the entity already
	 * exists in the datastore, an exception is thrown.
	 * It uses HTTP POST method.
	 *
	 * @param tweetentity the entity to be inserted.
	 * @return The inserted entity.
	 */
	@ApiMethod(name = "insertTweetEntity")
	public TweetEntity insertTweetEntity(TweetEntity tweetentity) {
		PersistenceManager mgr = getPersistenceManager();
		try {
			if (containsTweetEntity(tweetentity)) {
				throw new EntityExistsException("Object already exists");
			}
			mgr.makePersistent(tweetentity);
		} finally {
			mgr.close();
		}
		return tweetentity;
	}

	/**
	 * This method is used for updating an existing entity. If the entity does not
	 * exist in the datastore, an exception is thrown.
	 * It uses HTTP PUT method.
	 *
	 * @param tweetentity the entity to be updated.
	 * @return The updated entity.
	 */
	@ApiMethod(name = "updateTweetEntity")
	public TweetEntity updateTweetEntity(TweetEntity tweetentity) {
		PersistenceManager mgr = getPersistenceManager();
		try {
			if (!containsTweetEntity(tweetentity)) {
				throw new EntityNotFoundException("Object does not exist");
			}
			mgr.makePersistent(tweetentity);
		} finally {
			mgr.close();
		}
		return tweetentity;
	}

	/**
	 * This method removes the entity with primary key id.
	 * It uses HTTP DELETE method.
	 *
	 * @param id the primary key of the entity to be deleted.
	 */
	@ApiMethod(name = "removeTweetEntity")
	public void removeTweetEntity(@Named("id") Long id) {
		PersistenceManager mgr = getPersistenceManager();
		try {
			TweetEntity tweetentity = mgr.getObjectById(TweetEntity.class, id);
			mgr.deletePersistent(tweetentity);
		} finally {
			mgr.close();
		}
	}

	private boolean containsTweetEntity(TweetEntity tweetentity) {
		PersistenceManager mgr = getPersistenceManager();
		boolean contains = true;
		try {
			mgr.getObjectById(TweetEntity.class, tweetentity.getId());
		} catch (javax.jdo.JDOObjectNotFoundException ex) {
			contains = false;
		} finally {
			mgr.close();
		}
		return contains;
	}

	private static PersistenceManager getPersistenceManager() {
		return PMF.get().getPersistenceManager();
	}

}
