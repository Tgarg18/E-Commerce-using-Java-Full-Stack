package outfitoasis;

import io.github.cdimascio.dotenv.Dotenv;

import java.nio.file.Paths;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		loadEnvironmentVariables();
		SpringApplication.run(BackendApplication.class, args);
	}

	public static void loadEnvironmentVariables() {

		String workingDirectory = Paths.get(".").toAbsolutePath().normalize().toString();
		String envFilePath;

		if (workingDirectory.endsWith("backend"))
			envFilePath = workingDirectory + "/.env";
		else
			envFilePath = workingDirectory + "/backend/.env";

		Dotenv dotenv = Dotenv.configure()
				.directory(envFilePath)
				.load();

		System.setProperty("FRONTEND_BASE_URL", dotenv.get("FRONTEND_BASE_URL"));
		System.setProperty("DB", dotenv.get("DB"));
		System.setProperty("DB_PORT", dotenv.get("DB_PORT"));
		System.setProperty("DB_NAME", dotenv.get("DB_NAME"));
		System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
		System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
		System.setProperty("SECRET_KEY", dotenv.get("SECRET_KEY"));
		System.setProperty("RAZORPAY_API_KEY", dotenv.get("RAZORPAY_API_KEY"));
		System.setProperty("RAZORPAY_API_SECRET", dotenv.get("RAZORPAY_API_SECRET"));
		System.setProperty("SMTP_USERNAME", dotenv.get("SMTP_USERNAME"));
		System.setProperty("SMTP_PASSWORD", dotenv.get("SMTP_PASSWORD"));
		System.setProperty("GOOGLE_CLIENT_ID", dotenv.get("GOOGLE_CLIENT_ID"));
		System.setProperty("GOOGLE_CLIENT_SECRET", dotenv.get("GOOGLE_CLIENT_SECRET"));
		System.setProperty("GOOGLE_REDIRECT_URI", dotenv.get("GOOGLE_REDIRECT_URI"));

	}
}
