package com.growsafe;

import android.app.AppOpsManager;
import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.provider.Settings;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.growsafe.timeManagment.UsageStatsServer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class MainActivity2 extends AppCompatActivity {

    private Button startButton, stopButton;
    private ListView usageListView;
    private boolean trackingActive = false;
    private ArrayList<String> usageList = new ArrayList<>();
    private ArrayAdapter<String> adapter;
    private final Handler handler = new Handler(Looper.getMainLooper());
    private final Runnable trackingRunnable = this::showUsageStats;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
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

        Toast.makeText(this, "بدأت تتبع استخدام التطبيقات", Toast.LENGTH_SHORT).show();

        // Start periodic updates every 10 seconds
        handler.post(trackingRunnable);
    }

    private void stopTracking() {
        trackingActive = false;
        handler.removeCallbacks(trackingRunnable);
        Toast.makeText(this, "توقف تتبع الاستخدام", Toast.LENGTH_SHORT).show();
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
                    String appData = usageStats.getPackageName() + ": " + totalTime + " ثواني";
                    currentUsageList.add(appData);
                }
            }

            usageList.clear();
            usageList.addAll(currentUsageList);
            runOnUiThread(adapter::notifyDataSetChanged);
        } else {
            runOnUiThread(() -> Toast.makeText(this, "لا توجد بيانات للاستخدام حاليا", Toast.LENGTH_SHORT).show());
        }

        handler.postDelayed(trackingRunnable, 10000); // Repeat every 10 seconds
    }

    private boolean hasUsageStatsPermission() {
        AppOpsManager appOps = (AppOpsManager) getSystemService(Context.APP_OPS_SERVICE);
        int mode = appOps.checkOpNoThrow(AppOpsManager.OPSTR_GET_USAGE_STATS, android.os.Process.myUid(), getPackageName());
        return mode == AppOpsManager.MODE_ALLOWED;
    }

    private void requestUsageAccess() {
        Toast.makeText(this, "من فضلك قم بتفعيل إذن الوصول إلى الاستخدام من الإعدادات", Toast.LENGTH_LONG).show();
        Intent intent = new Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS);
        startActivity(intent);
    }
}
