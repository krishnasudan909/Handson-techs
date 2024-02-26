package Java_file_sharing;

import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Scanner;

public class ClientExample {
    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.print("Enter the server IP address: ");
            String serverIp = scanner.nextLine();

            try (Socket socket = new Socket(serverIp, 12345);
                 PrintWriter writer = new PrintWriter(new OutputStreamWriter(socket.getOutputStream()), true)
            ) {
                System.out.println("Connected to server. Enter messages (type 'exit' to close):");

                String message;
                while (true) {
                    message = scanner.nextLine();

                    if ("exit".equalsIgnoreCase(message)) {
                        break;
                    }

                    // Send a message to the server
                    writer.println(message);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
