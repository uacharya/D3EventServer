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

	@OnOpen
	public void handleOpen(Session session) {
		// adding all of the sessions connected
		allSessions.add(session); // add all the new sessions into one set
		System.out.println("The number of client connected are " + allSessions.size());
	}

	@OnMessage
	public void handleMessage(Session session, String message) {
		// getting request object from web filter used for the server
		String IPAddress = session.getRequestParameterMap().get("IPAddress").get(0);
		System.out.println("the ip address for this connection is " + IPAddress);
		// message recieved from the client browser
		System.out.println("recieved event from the client is " + message);
		// send dimension if dimension coordinates are requested for browser
		// belonging to screen in particular node
		if (message.contains("dimensionFor")) {
			sendDisplayDimension(session, IPAddress, message);
		} else {
			sendMessageToAll(message);// sending events to all
		}

	}

	private void sendMessageToAll(String message) {
		// iterate over all active sessions and send the same event
		for (Session ssn : allSessions) {
			if (ssn.isOpen()) {
				try {
					ssn.getBasicRemote().sendText(message);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

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

	@OnClose
	public void handleClose(Session session) {
		System.out.println("client is now closed with ID " + session.getId());
		allSessions.remove(session);
	}

	@OnError
	public void handleError(Throwable t) {
		t.printStackTrace();

	}

}