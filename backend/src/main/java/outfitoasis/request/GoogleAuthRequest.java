package outfitoasis.request;

public class GoogleAuthRequest {
    private String token;

    public GoogleAuthRequest() {}

    public GoogleAuthRequest(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
