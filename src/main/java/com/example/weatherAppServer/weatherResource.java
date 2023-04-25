package com.example.weatherAppServer;

// import com.fasterxml.jackson.databind.ObjectMapper;
// import jakarta.ws.rs.GET;
// import jakarta.ws.rs.Path;
// import jakarta.ws.rs.Produces;
// import jakarta.ws.rs.QueryParam;
// import jakarta.ws.rs.core.MediaType;
// import jakarta.ws.rs.core.Response;
// import org.json.simple.JSONObject;
// import org.json.simple.parser.JSONParser;
// import org.json.simple.parser.ParseException;

// import javax.net.ssl.HttpsURLConnection;
// import javax.net.ssl.SSLContext;
// import javax.net.ssl.TrustManager;
// import javax.net.ssl.X509TrustManager;
// import java.io.BufferedReader;
// import java.io.IOException;
// import java.io.InputStreamReader;
// import java.net.HttpURLConnection;
// import java.net.URL;
// import java.security.KeyManagementException;
// import java.security.NoSuchAlgorithmException;
// import java.security.SecureRandom;
// import java.security.cert.X509Certificate;
// import java.util.Scanner;

// // @Path("/weather-data")
// public class weatherResource {

//     static {
//         // Set SSL trust store properties
//         System.setProperty("javax.net.ssl.trustStore", "clientTrustStore.key");
//         System.setProperty("javax.net.ssl.trustStorePassword", "qwerty");

//         try {
//             // Initialize SSL context
//             SSLContext sslContext = SSLContext.getInstance("TLS");
//             sslContext.init(null, new TrustManager[]{new X509TrustManager() {
//                 public void checkClientTrusted(X509Certificate[] chain, String authType) {
//                 }

//                 public void checkServerTrusted(X509Certificate[] chain, String authType) {
//                 }

//                 public X509Certificate[] getAcceptedIssuers() {
//                     return new X509Certificate[0];
//                 }
//             }}, new SecureRandom());
//             HttpsURLConnection.setDefaultSSLSocketFactory(sslContext.getSocketFactory());
//             HttpsURLConnection.setDefaultHostnameVerifier((hostname, session) -> true);
//         } catch (NoSuchAlgorithmException | KeyManagementException e) {
//             e.printStackTrace();
//         }
//     }

//     private static final String API_KEY = "cee091ccd5e1214c4c45aa93339e9a54";
//     private static final String API_URL_TEMPLATE = "https://api.openweathermap.org/data/2.5/";

//     // @GET
//     // @Produces({MediaType.APPLICATION_JSON})
//     public String getLocation(@QueryParam("location") String location) throws IOException, ParseException {

//         String API_URL = API_URL_TEMPLATE + "weather?q=Toronto&appid=" + API_KEY;

//         URL url = new URL(API_URL);
//         HttpURLConnection con = (HttpURLConnection) url.openConnection();
//         con.setRequestMethod("GET");

// //        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
// //        String inputLine;
// //        StringBuilder response = new StringBuilder();
// //        while ((inputLine = in.readLine()) != null) {
// //            response.append(inputLine);
// //        }
// //        in.close();

//         con.connect();

//         int responseCode = con.getResponseCode();

//         if (responseCode != 200) {
//             throw new RuntimeException("HttpResponseCode: " + responseCode);
//         } else {
//             StringBuilder informationString = new StringBuilder();
//             Scanner scanner = new Scanner(url.openStream());

//             while (scanner.hasNext()) {
//                 informationString.append(scanner.nextLine());
//             }

//             scanner.close();
// //
// ////
//             ObjectMapper objectMapper = new ObjectMapper();
// ////            String val = objectMapper.writeValueAsString(informationString);
// //
//             System.out.println(informationString);


//             JSONParser parse = new JSONParser();
//             JSONObject dataObject = (JSONObject) parse.parse(String.valueOf(informationString));

//             //            System.out.println(dataObject);
//             //            System.out.println(dataObject.get("main"));

//             //JSONObject dO = (JSONObject) parse.parse(String.valueOf(dataObject.get("main")));
//             //System.out.println(dO.get("temp"));
// //            System.out.println(dataObject);

//             Response myResp = Response.status(200).header("Access-Control-Allow-Origin", "http://localhost:63342")
//                     .header("Content-Type", "application/json")
//                     .entity(dataObject)
//                     .build();

// //        return response.toString();


//             return objectMapper.writeValueAsString(informationString);


// //                try{
// //                    val = objectMapper.writeValueAsString(informationString);
// //                }catch (JsonProcessingException e){
// //                    throw new RuntimeException(e);
// //                }


//             //return informationString;

//             //System.out.println(informationString);


//             //JSONObject country = (JSONObject) dataObject.get(0);


//             //System.out.println(country.get("location_type"));


// //            }
// //        } catch (Exception e) {
// //            e.printStackTrace();

//         }
//     }
// }