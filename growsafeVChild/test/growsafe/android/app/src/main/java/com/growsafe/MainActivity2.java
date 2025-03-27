package com.growsafe;

import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Toast;
import android.content.Context;
import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.os.Build;
import java.io.IOException;
import java.util.List;
import org.json.JSONObject; 
import java.util.HashMap; 
import android.app.AppOpsManager;  // For AppOpsManager
import android.content.Intent;     // For Intent
import android.provider.Settings;  // For Settings
import android.content.Context;    // For Context
import android.os.Build;          // For checking Android version



import androidx.appcompat.app.AppCompatActivity;

import com.growsafe.timeManagment.UsageStatsServer;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

public class MainActivity2 extends AppCompatActivity {

    private Button startButton, stopButton;
    private ListView usageListView;
    private boolean trackingActive = false;
    private ArrayList<String> usageList = new ArrayList<>();
    private ArrayAdapter<String> adapter;
    private final Handler handler = new Handler(Looper.getMainLooper());
    private final Runnable trackingRunnable = this::showUsageStats;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        startButton = findViewById(R.id.startButton);
        stopButton = findViewById(R.id.stopButton);
        usageListView = findViewById(R.id.usageListView);

        // Initialize ListView Adapter
        adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, usageList);
        usageListView.setAdapter(adapter);

        startButton.setOnClickListener(view -> {
            if (hasUsageStatsPermission()) {
                startTracking();
            } else {
                requestUsageAccess();
            }
        });

        stopButton.setOnClickListener(view -> stopTracking());
        
        try {
            new UsageStatsServer(8080, this);  // Start the server on port 8080
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void startTracking() {
        trackingActive = true;
        usageList.clear();
        adapter.notifyDataSetChanged();

        Toast.makeText(this, "Started tracking app usage", Toast.LENGTH_SHORT).show();

        // Start periodic updates every 10 seconds
        handler.post(trackingRunnable);
    }

    private void stopTracking() {
        trackingActive = false;
        handler.removeCallbacks(trackingRunnable);
        Toast.makeText(this, "Stopped tracking app usage", Toast.LENGTH_SHORT).show();
    }

    private void showUsageStats() {
        if (!trackingActive) return;

        UsageStatsManager usm = (UsageStatsManager) getSystemService(Context.USAGE_STATS_SERVICE);
        long currentTime = System.currentTimeMillis();
        List<UsageStats> stats = usm.queryUsageStats(UsageStatsManager.INTERVAL_DAILY, currentTime - 1000 * 10000, currentTime);

        if (stats != null && !stats.isEmpty()) {
            ArrayList<String> currentUsageList = new ArrayList<>();

            for (UsageStats usageStats : stats) {
                long totalTime = usageStats.getTotalTimeInForeground() / 1000; // Convert to seconds
                if (totalTime > 0) {
                    String appData = usageStats.getPackageName() + ": " + totalTime + " seconds";
                    currentUsageList.add(appData);
                    
                    // Send data to server
                    sendUsageDataToServer(usageStats.getPackageName(), totalTime);
                }
            }

            usageList.clear();
            usageList.addAll(currentUsageList);
            runOnUiThread(adapter::notifyDataSetChanged);
        } else {
            runOnUiThread(() -> Toast.makeText(this, "No usage data available", Toast.LENGTH_SHORT).show());
        }

        handler.postDelayed(trackingRunnable, 10000); // Repeat every 10 seconds
    }

    private boolean hasUsageStatsPermission() {
        AppOpsManager appOps = (AppOpsManager) getSystemService(Context.APP_OPS_SERVICE);
        int mode = appOps.checkOpNoThrow(AppOpsManager.OPSTR_GET_USAGE_STATS, android.os.Process.myUid(), getPackageName());
        return mode == AppOpsManager.MODE_ALLOWED;
    }

    private void requestUsageAccess() {
        Toast.makeText(this, "Please enable usage access in settings", Toast.LENGTH_LONG).show();
        Intent intent = new Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS);
        startActivity(intent);
    }

    private void sendUsageDataToServer(String packageName, long usageTime) {
    new Thread(() -> {
        try {
            URL url = new URL("http://192.168.1.101:8080/usage"); // Use 10.0.2.2 for emulator, or real IP for device
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET"); // Change to POST
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setDoOutput(true);
            connection.setDoInput(true);

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("packageName", packageName);
            jsonObject.put("usageTime", usageTime);

            try (OutputStream os = connection.getOutputStream()) {
                byte[] input = jsonObject.toString().getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            int responseCode = connection.getResponseCode();
            if (responseCode != 200) {
                System.out.println("Failed to send data: " + responseCode);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }).start();
}
}
