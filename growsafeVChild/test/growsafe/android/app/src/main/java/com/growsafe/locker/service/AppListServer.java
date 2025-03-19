package com.growsafe.locker.service;

import fi.iki.elonen.NanoHTTPD;

import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.content.pm.ApplicationInfo;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.util.Base64;
import android.util.Log;


import com.growsafe.locker.AppLockManager;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AppListServer extends NanoHTTPD {

    private final Context context;
    private static final String TAG = "AppListServer";

    public AppListServer(Context context, int port) {
        super(port);  // Ensure it's using port 8080
        this.context = context;
    }

    @Override
    public Response serve(IHTTPSession session) {
        Log.d(TAG, "Received request: " + session.getUri());

        if (session.getUri().equals("/get-apps")) {
            // Get the installed apps list
            JSONArray appList = getInstalledApps();
            try {
                JSONObject response = new JSONObject();
                response.put("apps", appList);
                Log.d(TAG, "Responding with app list");
                return newFixedLengthResponse(Response.Status.OK, "application/json", response.toString());
            } catch (Exception e) {
                Log.e(TAG, "Error processing app list", e);
                return newFixedLengthResponse(Response.Status.INTERNAL_ERROR, "text/plain", "Error processing app list");
            }
        }

        if (session.getUri().equals("/lock-app")) {
            // Parse the body data from the request
            Map<String, String> postParams = new HashMap<>();
            try {
                session.parseBody(postParams);
            } catch (IOException | ResponseException e) {
                e.printStackTrace();
                return newFixedLengthResponse(Response.Status.INTERNAL_ERROR, "text/plain", "Error parsing body");
            }

            // Check if the postData exists and parse the packageName and password
            String postData = postParams.get("postData");
            if (postData != null) {
                try {
                    JSONObject json = new JSONObject(postData);
                    String packageName = json.getString("packageName");
                    String password = json.getString("password");

                    // Lock the app
                    lockApp(packageName, password);
                    return newFixedLengthResponse(Response.Status.OK, "text/plain", "App locked successfully");
                } catch (Exception e) {
                    Log.e(TAG, "Error processing lock-app data", e);
                    return newFixedLengthResponse(Response.Status.INTERNAL_ERROR, "text/plain", "Error processing lock-app data");
                }
            } else {
                return newFixedLengthResponse(Response.Status.BAD_REQUEST, "text/plain", "Missing postData");
            }
        }

        Log.w(TAG, "URI not found: " + session.getUri());
        return newFixedLengthResponse(Response.Status.NOT_FOUND, "text/plain", "Not Found");
    }

    private JSONArray getInstalledApps() {
        JSONArray appsArray = new JSONArray();
        PackageManager packageManager = this.context.getPackageManager();
        List<ApplicationInfo> installedApplications = packageManager.getInstalledApplications(PackageManager.GET_META_DATA);
        PackageManager pm = context.getPackageManager();
        Log.d(TAG, "Number of installed applications: " + installedApplications.size());

        for (ApplicationInfo appInfo : installedApplications) {
            try {
                // Skip system apps
                if (pm.getLaunchIntentForPackage(appInfo.packageName) != null) {
                    JSONObject appObject = new JSONObject();
                    appObject.put("appName", packageManager.getApplicationLabel(appInfo).toString());
                    appObject.put("packageName", appInfo.packageName);

                    // Get the app icon
//                    Drawable appIcon = packageManager.getApplicationIcon(appInfo.packageName);
//                    String iconBase64 = drawableToBase64(appIcon);  // Convert the icon to Base64 string
//                    appObject.put("icon", iconBase64);

                    // Check if the app is locked
                    boolean isLocked = AppLockManager.getLockedApps().contains(appInfo.packageName);
                    appObject.put("isLocked", isLocked);

                    if (isLocked) {
                        // Get the password (you may have a method in AppLockManager to retrieve it)
                        String password = AppLockManager.getInstance(context).getPasswordForApp(appInfo.packageName);
                        appObject.put("password", password);  // Only if the app is locked
                    }

                    appsArray.put(appObject);
                }
            } catch (Exception e) {
                Log.e(TAG, "Error processing app: " + appInfo.packageName, e);
            }
        }

        return appsArray;
    }

    // Helper method to convert Drawable to Base64
    private String drawableToBase64(Drawable drawable) {
        Bitmap bitmap = ((BitmapDrawable) drawable).getBitmap();
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
        byte[] byteArray = byteArrayOutputStream.toByteArray();
        return Base64.encodeToString(byteArray, Base64.DEFAULT);
    }

    private void lockApp(String packageName, String password) {
        // Logic to lock the app using AppLockManager or any other way
        AppLockManager.getInstance(context).lockApp(packageName);
        // Save the password securely in SharedPreferences or similar secure storage
        SharedPreferences.Editor editor = context.getSharedPreferences("AppLockPrefs", Context.MODE_PRIVATE).edit();
        editor.putString(packageName + "_password", password);
        editor.apply();
    }

    public static void startServer(Context context) {
        try {
            // Start the local server on port 8080 (make sure the IP is correct)
            AppListServer server = new AppListServer(context, 8080); // Port 8080
            server.start();
            Log.d(TAG, "Server started on port 8080");
        } catch (IOException e) {
            Log.e(TAG, "Error starting server", e);
        }
    }


}