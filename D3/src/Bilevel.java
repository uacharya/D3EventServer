import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

/**
 * @author Ujjwal Acharya : ServerEndPoint that implements web socket protocol
 *         to communicate with the D3 webpages by providing them dimensions
 *         about the part of web page they need to display and also sends same
 *         event that occurs in either one of the 9 browsers
 */
@ServerEndpoint(value = "/bilevelserver")
public class Bilevel {
	private static final double height = 6480;
	private static final double width = 11520;

	// list of all the sessions into one container
	private static final Set<Session> allSessions = Collections.synchronizedSet(new HashSet<Session>());

	/**
	 * This method handles the incoming connection from d3 web page to the d3
	 * synchronize server
	 * 
	 * @param session
	 *            started by a d3 webpage client
	 */
	@OnOpen
	public void handleOpen(Session session) {
		// adding all of the sessions connected
		allSessions.add(session); // add all the new sessions into one set
		System.out.println("The number of client connected are " + allSessions.size());
	}

	/**
	 * This method responds to each or all of the open browsers based on the
	 * type of message sent from either one of them
	 * 
	 * @param session
	 *            specific to a connection from a browser running a d3 page
	 * @param message
	 *            sent by either one of the browser or d3 page
	 */
	@OnMessage
	public void handleMessage(Session session, String message) {
		// getting ip address of the browser that has sent a message from web filter used for the server
		String IPAddress = session.getRequestParameterMap().get("IP").get(0);
		System.out.println("the ip address for this connection is " + IPAddress);
		// message received from either one of the client browser
		System.out.println("recieved event from the client is " + message);
		// send dimension if dimension coordinates are requested for browser
		// belonging to screen in particular node
		if (message.contains("dimensionFor")) {
			sendDisplayDimension(session, IPAddress, message);
		} else {
			sendMessageToAll(message);// sending events to all
		}

	}

	/**
	 * This method sends event data to all the browsers that has open connection
	 * with the server
	 * 
	 * @param message
	 *            event data to send
	 */
	private void sendMessageToAll(String message) {
		// iterate over all active sessions and send the same event
		synchronized (allSessions) {
			for (Session ssn : allSessions) {
				if (ssn.isOpen()) {
					ssn.getAsyncRemote().sendText(message); //before synchronously message was sent blocking until message was sent
				}
			}
		}
	}

	/**
	 * This method creates and sends dimension data for each browser based on
	 * where the connection comes from
	 * 
	 * @param session
	 *            specific to a connection from a browser running a d3 page
	 * @param IPAddress
	 *            of the browser which is requesting for dimension data
	 * @param monitorLocation
	 *            screenX coordinate of the browser which is requesting
	 *            dimension data
	 */
	private void sendDisplayDimension(Session session, String IPAddress, String monitorLocation) {
		// getting parameter for the particular browser instance and sending it
		if (session.isOpen()) {
			try {
				session.getBasicRemote().sendText(determineParametersToReturn(IPAddress, monitorLocation));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	/**
	 * This method creates and returns dimension data based on the connection Ip
	 * address and the monitor screenX location
	 * 
	 * @param IPAddress
	 *            of the browser which is requesting for dimension data
	 * @param monitorLocation
	 *            screenX coordinate of the browser which is requesting
	 *            dimension data
	 * @return the required dimension data
	 */
	private String determineParametersToReturn(String IPAddress, String monitorLocation) {
		String dimension = "";
		if (IPAddress.equalsIgnoreCase("192.168.10.3")) {
			int browserLocation = Integer.parseInt(monitorLocation.split("For")[1]);
			if (browserLocation >= 0 && browserLocation < 3840) {
				dimension = "?height=" + (int) height + "&width=" + (int) Math.ceil(width / 3) + "&x=0" + "&y="
						+ (int) Math.ceil((height / 3) * 2);
			} else if (browserLocation >= 3840 && browserLocation < 7680) {
				dimension = "?height=" + (int) height + "&width=" + (int) Math.ceil(width / 3) + "&x="
						+ (int) Math.ceil(width / 3) + "&y=" + (int) Math.ceil((height / 3) * 2);
			} else if (browserLocation >= 7680) {
				dimension = "?height=" + (int) height + "&width=" + (int) Math.ceil(width / 3) + "&x="
						+ (int) (int) Math.ceil((width / 3) * 2) + "&y=" + (int) Math.ceil((height / 3) * 2);
			}

			return dimension;
		} else if (IPAddress.equalsIgnoreCase("192.168.10.4")) {
			int browserLocation = Integer.parseInt(monitorLocation.split("For")[1]);
			if (browserLocation >= 0 && browserLocation < 3840) {
				dimension = "?height=" + (int) height + "&width=" + (int) Math.ceil(width / 3) + "&x=0" + "&y="
						+ (int) Math.ceil(height / 3);
			} else if (browserLocation >= 3840 && browserLocation < 7680) {
				dimension = "?height=" + (int) height + "&width=" + (int) Math.ceil(width / 3) + "&x="
						+ (int) Math.ceil(width / 3) + "&y=" + (int) Math.ceil(height / 3);
			} else if (browserLocation >= 7680) {
				dimension = "?height=" + (int) height + "&width=" + (int) Math.ceil(width / 3) + "&x="
						+ (int) Math.ceil((width / 3) * 2) + "&y=" + (int) Math.ceil(height / 3);
			}

			return dimension;
		} else {
			int browserLocation = Integer.parseInt(monitorLocation.split("For")[1]);
			if (browserLocation >= 0 && browserLocation < 3840) {
				dimension = "?height=" + (int) height + "&width=" + (int) Math.ceil(width / 3) + "&x=0" + "&y=0";
			} else if (browserLocation >= 3840 && browserLocation < 7680) {
				dimension = "?height=" + (int) height + "&width=" + (int) Math.ceil(width / 3) + "&x="
						+ (int) Math.ceil(width / 3) + "&y=0";
			} else if (browserLocation >= 7680) {
				dimension = "?height=" + (int) height + "&width=" + (int) Math.ceil(width / 3) + "&x="
						+ (int) Math.ceil((width / 3) * 2) + "&y=0";
			}

			return dimension;
		}
	}

	/**
	 * This method closes the session if the web page is closed in the browser
	 * 
	 * @param session
	 *            specific to a connection from a browser running a d3 page
	 */
	@OnClose
	public void handleClose(Session session) {
		System.out.println("client is now closed with ID " + session.getId());
		allSessions.remove(session);
	}

	/**
	 * This method prints stack trace if some kind of unwanted error occurred
	 * while running server
	 * 
	 * @param t
	 *            the error object
	 */
	@OnError
	public void handleError(Throwable t) {
		t.printStackTrace();

	}

}