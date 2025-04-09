package com.growsafe;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

public class BootReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {
        if (Intent.ACTION_BOOT_COMPLETED.equals(intent.getAction())) {
            Log.d("BootReceiver", "Device rebooted. Starting service...");
            Toast.makeText(context, "GrowSafe starting after reboot", Toast.LENGTH_SHORT).show();

            Intent serviceIntent = new Intent(context, LocationUpdateService.class);
            context.startForegroundService(serviceIntent);
        }
    }
}
