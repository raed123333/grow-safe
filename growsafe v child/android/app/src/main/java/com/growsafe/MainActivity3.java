package com.growsafe;

import android.content.Intent;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;
import android.widget.ListView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.growsafe.locker.AppListAdapter;
import com.growsafe.locker.AppLockManager;
import com.growsafe.locker.AppModel;
import com.growsafe.locker.lock_unlocks_creens.LockAppActivity;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class MainActivity3 extends AppCompatActivity {
    private ListView appListView;
    private AppListAdapter adapter;
    private List<AppModel> installedApps;
    private AppLockManager appLockManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_locker);

        appLockManager = AppLockManager.getInstance(this);
        appListView = findViewById(R.id.appListView);
        installedApps = getInstalledApps();
        adapter = new AppListAdapter(this, installedApps);
        appListView.setAdapter(adapter);

        // Show toast of locked apps
        showLockedAppsToast();

        appListView.setOnItemClickListener((parent, view, position, id) -> {
            AppModel selectedApp = installedApps.get(position);
            Intent intent = new Intent(MainActivity3.this, LockAppActivity.class);
            intent.putExtra("app_package", selectedApp.getPackageName());
            startActivity(intent);
        });

        if (!isAccessibilityEnabled()) {
            Intent intent = new Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS);
            startActivity(intent);
            Toast.makeText(this, "Find and enable 'App Lock Service'", Toast.LENGTH_LONG).show();
        }
    }

    private void showLockedAppsToast() {

        Set<String> lockedApps = appLockManager.getLockedApps();
        Log.d("MainActivity3", "Locked Apps List: " + lockedApps);

        if (!lockedApps.isEmpty()) {
            StringBuilder lockedAppsList = new StringBuilder("Locked Apps:\n");
            for (String app : lockedApps) {
                lockedAppsList.append(app).append("\n");
            }
            Toast.makeText(this, lockedAppsList.toString(), Toast.LENGTH_LONG).show();
        } else {
            Toast.makeText(this, "No apps are locked", Toast.LENGTH_SHORT).show();
        }
    }

    private List<AppModel> getInstalledApps() {
        List<AppModel> apps = new ArrayList<>();
        PackageManager pm = getPackageManager();
        List<ApplicationInfo> packages = pm.getInstalledApplications(PackageManager.GET_META_DATA);

        for (ApplicationInfo appInfo : packages) {
            if (pm.getLaunchIntentForPackage(appInfo.packageName) != null) {
                String appName = pm.getApplicationLabel(appInfo).toString();
                Drawable icon = pm.getApplicationIcon(appInfo);
                String packageName = appInfo.packageName;
                apps.add(new AppModel(appName, packageName, icon));
                Log.d("MainActivity3", "App Installed: " + packageName);
            }
        }
        return apps;
    }

    private boolean isAccessibilityEnabled() {
        try {
            return Settings.Secure.getInt(getContentResolver(), Settings.Secure.ACCESSIBILITY_ENABLED) == 1;
        } catch (Settings.SettingNotFoundException e) {
            return false;
        }
    }
}
