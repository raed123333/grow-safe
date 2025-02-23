package com.growsafe;


import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.Context;
import android.content.Intent;
import android.provider.Settings;
import android.os.Bundle;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import java.util.ArrayList;
import java.util.List;

public class MainActivity2 extends AppCompatActivity {

    private Button startButton, stopButton;
    private ListView usageListView;
    private boolean trackingActive = false; // To check if tracking is active
    private ArrayList<String> usageList = new ArrayList<>();
    private ArrayAdapter<String> adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        startButton = findViewById(R.id.startButton);
        stopButton = findViewById(R.id.stopButton);
        usageListView = findViewById(R.id.usageListView);

        // Initialize the list adapter
        adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, usageList);
        usageListView.setAdapter(adapter);

        // Start tracking button click event
        startButton.setOnClickListener(view -> {
            if (checkUsagePermission()) {
                startTracking();
            } else {
                // If permission is not granted, prompt user to enable it
                Toast.makeText(MainActivity2.this, "Veuillez activer l'autorisation d'accès à l'utilisation à partir des paramètres", Toast.LENGTH_LONG).show();
                Intent intent = new Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS);
                startActivity(intent);
            }
        });

        // Stop tracking button click event
        stopButton.setOnClickListener(view -> stopTracking());

        // List item click event (Optional: you can add specific actions for clicked items)
        usageListView.setOnItemClickListener((parent, view, position, id) -> {
            // You can handle item clicks here if needed
        });
    }

    private void startTracking() {
        trackingActive = true;
        usageList.clear(); // Clear previous data
        adapter.notifyDataSetChanged(); // Update the list view

        // Start a new thread to track app usage in the background
        new Thread(() -> {
            while (trackingActive) {
                showUsageStats();
                try {
                    Thread.sleep(10000); // Update every 10 seconds (you can adjust the time interval)
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();

        Toast.makeText(MainActivity2.this, "commencé à suivre l'utilisation des applications", Toast.LENGTH_SHORT).show();
    }

    private void stopTracking() {
        trackingActive = false;
        Toast.makeText(MainActivity2.this, "Arrêter de suivre ", Toast.LENGTH_SHORT).show();
    }

    private void showUsageStats() {
        UsageStatsManager usm = (UsageStatsManager) getSystemService(Context.USAGE_STATS_SERVICE);
        long currentTime = System.currentTimeMillis();
        List<UsageStats> stats = usm.queryUsageStats(UsageStatsManager.INTERVAL_DAILY, currentTime - 1000 * 10000, currentTime);

        if (stats != null && !stats.isEmpty()) {
            // Create a new list to track apps being used currently
            ArrayList<String> currentUsageList = new ArrayList<>();

            for (UsageStats usageStats : stats) {
                long totalTime = usageStats.getTotalTimeInForeground() / 1000; // Convert to seconds
                if (totalTime > 0) {
                    String appData = usageStats.getPackageName() + ": " + totalTime + " seconds";
                    currentUsageList.add(appData);
                }
            }

            // Update the usage list and refresh the adapter
            usageList.clear();
            usageList.addAll(currentUsageList);
            runOnUiThread(() -> adapter.notifyDataSetChanged());
        } else {
            runOnUiThread(() -> Toast.makeText(MainActivity2.this, " aucune donnée à utiliser pour le moment", Toast.LENGTH_SHORT).show());
        }
    }

    private boolean checkUsagePermission() {
        UsageStatsManager usm = (UsageStatsManager) getSystemService(Context.USAGE_STATS_SERVICE);
        long currentTime = System.currentTimeMillis();
        List<UsageStats> stats = usm.queryUsageStats(UsageStatsManager.INTERVAL_DAILY, currentTime - 1000 * 10000, currentTime);

        // Check if usage stats are available
        return stats != null && !stats.isEmpty();
    }
}
