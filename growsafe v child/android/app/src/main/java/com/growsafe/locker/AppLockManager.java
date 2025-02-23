package com.growsafe.locker;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import java.util.HashSet;
import java.util.Set;

public class AppLockManager {
    private static final String PREFS_NAME = "AppLockPrefs";
    private static final String LOCKED_APPS_KEY = "LockedApps";
    private static AppLockManager instance;
    private static SharedPreferences preferences;

    private AppLockManager(Context context) {
        preferences = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
    }

    public static synchronized AppLockManager getInstance(Context context) {
        if (instance == null) {
            instance = new AppLockManager(context);
        }
        return instance;
    }

    // Lock an app
    public void lockApp(String packageName) {
        Set<String> lockedApps = getLockedApps();
        lockedApps.add(packageName);
        preferences.edit().putStringSet(LOCKED_APPS_KEY, lockedApps).apply();
        Log.d("AppLockManager", "App locked: " + packageName);
    }

    // Unlock an app
    public void unlockApp(String packageName) {
        Set<String> lockedApps = getLockedApps();
        lockedApps.remove(packageName);
        preferences.edit().putStringSet(LOCKED_APPS_KEY, lockedApps).apply();
        Log.d("AppLockManager", "App unlocked: " + packageName);
    }

    // Get all locked apps
    public static Set<String> getLockedApps() {
        Set<String> lockedApps = preferences.getStringSet(LOCKED_APPS_KEY, new HashSet<>());
        Log.d("AppLockManager", "Current locked apps: " + lockedApps);
        return lockedApps;
    }


}
