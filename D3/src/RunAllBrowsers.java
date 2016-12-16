import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

/**
 * @author Ujjwal Acharya : Runs 9 browsers at once from the local host node by
 *         using command line psexec tool to perform remote service management
 *         on each one of the nodes in tiled display. This class creates 9 threads 3 for each node which are responsible
 *         for opening a process in each one of their respective node and monitor. The process will a chrome instance running 
 *         the required d3 page created for that node and monitor.
 *         
 */
public class RunAllBrowsers {
	// command line for opening browsers in each node with required credentials
	private static final String[] nodesCommand = { "c:\\psexec.exe -i \\\\wall1 -u walluser -p Spring2015! -c",
			"c:\\psexec.exe -i \\\\wall2 -u walluser -p Spring2015! -c", "c:\\psexec.exe -i \\\\wall3" };
	private static final int numberOfBrowsers = 3;

	public static void main(String[] args) {

		long startTime = System.currentTimeMillis();
		for (int x = 0; x < numberOfBrowsers; x++) {
			createBatchFile(x, args[0]);
		}
		//this is the index of node starting from 0 to 2 from the top
		for (int i = 0; i < nodesCommand.length; i++) {
			for (int j = 0; j < nodesCommand.length; j++) { //the index of monitor
				//creates command to run in command line using psExec
				String[] commandLineArgs = giveFullCommandLineArgs(j, nodesCommand[i].split(" "));
				ExecuteCommand execute = new ExecuteCommand(commandLineArgs, j);
				Thread node = new Thread(execute);
				node.start();
			}
			try {
				Thread.sleep(40);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		long endTime = System.currentTimeMillis();

		System.out.printf("Execution time %d", endTime - startTime);

	}

	
	/** This method creates batch files that will be run when a process is supposed to be started in each one of the nodes
	 * @param index gives the monitor location 
	 * @param filename name of the d3 page which is supposed to be opened in every browser
	 */
	private static void createBatchFile(int index, String filename) {

		ArrayList<String> output = new ArrayList<String>();

		File file = new File("C:\\BrowserLaunchFiles\\Run_File" + (index + 1) + ".bat");

		try {
			BufferedReader fileReader = new BufferedReader(new FileReader(file));
			String line;

			while ((line = fileReader.readLine()) != null) {
				if (line.contains("file")) {
					int start = line.lastIndexOf("\\");
					// int end = line.lastIndexOf(".");
					String name = line.replace(line.substring(start + 1, line.length()), filename);
					output.add(name);
				} else {
					output.add(line);
				}
			}

			fileReader.close();

			BufferedWriter write = new BufferedWriter(new FileWriter(file));

			for (String commandLineArgs : output) {
				write.write(commandLineArgs);
				write.write("\n");
			}
			write.flush();
			write.close();

		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	
	/** This method creates command line syntax that will be passed to the command line interpretor when a process is supposed to be started in each one of the nodes
	 * @param x monitor index where the process is supposed to be started
	 * @param commandlineargs an array to store all the command line syntax's tokens
	 * @return commandlineargs
	 */
	private static String[] giveFullCommandLineArgs(int x, String[] commandlineargs) {
		String[] chromePositionArgs = new String[commandlineargs.length + 1];
		switch (x) {
		case 0:
			for (int i = 0; i < commandlineargs.length; i++) {
				chromePositionArgs[i] = commandlineargs[i];
			}

			chromePositionArgs[chromePositionArgs.length - 1] = "c:\\BrowserLaunchFiles\\Run_File1.bat";
			break;
		case 1:
			for (int i = 0; i < commandlineargs.length; i++) {
				chromePositionArgs[i] = commandlineargs[i];
			}

			chromePositionArgs[chromePositionArgs.length - 1] = "c:\\BrowserLaunchFiles\\Run_File2.bat";
			break;

		case 2:
			for (int i = 0; i < commandlineargs.length; i++) {
				chromePositionArgs[i] = commandlineargs[i];
			}

			chromePositionArgs[chromePositionArgs.length - 1] = "c:\\BrowserLaunchFiles\\Run_File3.bat";
			break;
		}

		return chromePositionArgs;

	}
}
