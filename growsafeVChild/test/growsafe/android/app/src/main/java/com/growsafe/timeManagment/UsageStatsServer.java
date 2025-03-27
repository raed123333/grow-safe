package com.growsafe.timeManagment;

import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.Context;

import fi.iki.elonen.NanoHTTPD;

import java.io.IOException;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

public class UsageStatsServer extends NanoHTTPD {

    private final Context context;

    public UsageStatsServer(int port, Context context) throws IOException {
        super(port);
        this.context = context;
        start(NanoHTTPD.SOCKET_READ_TIMEOUT, false);
        System.out.println("Server started on port " + port);
    }

    @Override
    public Response serve(IHTTPSession session) {
        switch (session.getMethod()) {
            case GET:
                return handleGetUsageStatsRequest();
            case POST:
                return handlePostUsageStatsRequest(session);
            default:
                return newFixedLengthResponse(Response.Status.BAD_REQUEST, "text/plain", "Invalid Request");
        }
    }

    // Handle GET request to fetch usage stats
    private Response handleGetUsageStatsRequest() {
        JSONObject responseJson = new JSONObject();
        JSONArray usageArray = new JSONArray();

        UsageStatsManager usm = (UsageStatsManager) context.getSystemService(Context.USAGE_STATS_SERVICE);
        long currentTime = System.currentTimeMillis();
        List<UsageStats> stats = usm.queryUsageStats(UsageStatsManager.INTERVAL_DAILY, currentTime - 1000 * 10000, currentTime);

        if (stats != null && !stats.isEmpty()) {
            for (UsageStats usageStats : stats) {
                long totalTime = usageStats.getTotalTimeInForeground() / 1000; // Convert to seconds
                if (totalTime > 0) {
                    JSONObject appData = new JSONObject();
                    try {
                        appData.put("packageName", usageStats.getPackageName());
                        appData.put("usageTime", totalTime);
                        usageArray.put(appData);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        }

        try {
            responseJson.put("usageStats", usageArray);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return newFixedLengthResponse(Response.Status.OK, "application/json", responseJson.toString());
    }

    // Handle POST request to receive usage stats data
    private Response handlePostUsageStatsRequest(IHTTPSession session) {
        try {
            Map<String, String> files = new HashMap<>();
            session.parseBody(files);

            String postData = files.get("postData");
            if (postData == null) {
                return newFixedLengthResponse(Response.Status.BAD_REQUEST, "text/plain", "Missing post data");
            }

            JSONObject json = new JSONObject(postData);
            String packageName = json.optString("packageName", "Unknown");
            long usageTime = json.optLong("usageTime", 0);

            System.out.println("Received POST data:");
            System.out.println("Package: " + packageName + ", Usage Time: " + usageTime + " seconds");

            return newFixedLengthResponse(Response.Status.OK, "application/json", "{\"status\":\"success\"}");
        } catch (IOException | ResponseException e) {
            e.printStackTrace();
            return newFixedLengthResponse(Response.Status.INTERNAL_ERROR, "text/plain", "Error processing request");
        } catch (Exception e) {
            e.printStackTrace();
            return newFixedLengthResponse(Response.Status.BAD_REQUEST, "text/plain", "Invalid JSON format");
        }
    }
}
