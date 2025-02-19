package com.growsafe;


import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.Handler;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;

import android.app.usage.UsageStats;
import android.app.usage.UsageStatsManager;

import java.util.ArrayList;
import java.util.List;

public class AppUsageService extends Service {

    private boolean isRunning = false;
    private Handler handler = new Handler();
    private List<AppUsageModel> appUsageList = new ArrayList<>();

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        isRunning = true;
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                if (isRunning) {
                    getAppUsage();
                    handler.postDelayed(this, 1000); // Répéter chaque seconde
                }
            }
        }, 1000);
        return START_STICKY;
    }

    private void getAppUsage() {
        UsageStatsManager usageStatsManager = (UsageStatsManager) getSystemService(Context.USAGE_STATS_SERVICE);
        long endTime = System.currentTimeMillis();
        long startTime = endTime - 1000 * 60 * 60; // Dernière heure
        List<UsageStats> stats = usageStatsManager.queryUsageStats(UsageStatsManager.INTERVAL_DAILY, startTime, endTime);

        appUsageList.clear(); // Réinitialiser la liste

        for (UsageStats usage : stats) {
            appUsageList.add(new AppUsageModel(usage.getPackageName(), usage.getTotalTimeInForeground()));
            Log.d("AppUsage", "App: " + usage.getPackageName() + " Time: " + usage.getTotalTimeInForeground());
        }

        // Met à jour l'interface utilisateur (ListView)
        Intent updateIntent = new Intent("UPDATE_LIST");
        updateIntent.putExtra("appUsageList", (ArrayList<AppUsageModel>) appUsageList);
        sendBroadcast(updateIntent);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        isRunning = false;
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
