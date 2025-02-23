package com.growsafe.locker;

import android.accessibilityservice.AccessibilityService;
import android.content.Intent;
import android.util.Log;
import android.view.accessibility.AccessibilityEvent;

import com.growsafe.locker.lock_unlocks_creens.AppUnlockActivity;

import java.util.Set;

public class AppLockService extends AccessibilityService {

        @Override
        public void onAccessibilityEvent(AccessibilityEvent event) {
            if (event.getEventType() == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) {
                String packageName = event.getPackageName().toString();

                // Get all locked apps
                Set<String> lockedApps = AppLockManager.getLockedApps();
                Log.d("AppLockService", "Locked apps list: " + lockedApps);

                // Check if the current app is locked
                boolean isLocked = lockedApps.contains(packageName);
                Log.d("AppLockService", "App Package: " + packageName + " Locked: " + isLocked);

                if (isLocked) {
                    Intent intent = new Intent(this, AppUnlockActivity.class);
                    intent.putExtra("app_package", packageName);
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
                    startActivity(intent);
                }
            }
        }



        @Override
    public void onInterrupt() {
        // Handle interruptions if needed
    }
}
