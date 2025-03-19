package com.growsafe.timeManagment;

import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.Context;

import fi.iki.elonen.NanoHTTPD;

import java.io.IOException;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

public class UsageStatsServer extends NanoHTTPD {

    private Context context;

    public UsageStatsServer(int port, Context context) throws IOException {
        super(port);
        this.context = context;
        start(NanoHTTPD.SOCKET_READ_TIMEOUT, false);
        System.out.println("Server started on port " + port);
    }

    @Override
    public Response serve(IHTTPSession session) {
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
}
