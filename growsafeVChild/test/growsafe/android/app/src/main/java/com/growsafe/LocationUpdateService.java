package com.growsafe;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Intent;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.os.Build;
import android.os.IBinder;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import com.google.android.gms.location.*;

import java.io.IOException;
import java.util.List;
import java.util.Locale;

import fi.iki.elonen.NanoHTTPD;

public class LocationUpdateService extends Service {

    private static final int NOTIF_ID = 1;
    private static final String CHANNEL_ID = "location_channel";

    private FusedLocationProviderClient fusedLocationClient;
    private LocationCallback locationCallback;

    private double latitude, longitude;
    private String fullAddress = "Unknown";

    private LocationServer locationServer;

    @Override
    public void onCreate() {
        super.onCreate();

        createNotificationChannel();
        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("GrowSafe Running")
                .setContentText("Tracking location in background")
                .build();
        startForeground(NOTIF_ID, notification);

        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);

        // Start HTTP server
        try {
            locationServer = new LocationServer();
            locationServer.start();
        } catch (IOException e) {
            e.printStackTrace();
        }

        LocationRequest locationRequest = LocationRequest.create();
        locationRequest.setInterval(30000);
        locationRequest.setFastestInterval(15000);
        locationRequest.setPriority(Priority.PRIORITY_HIGH_ACCURACY);

        locationCallback = new LocationCallback() {
            @Override
            public void onLocationResult(LocationResult result) {
                Location location = result.getLastLocation();
                if (location != null) {
                    latitude = location.getLatitude();
                    longitude = location.getLongitude();
                    fullAddress = getAddressFromLocation(latitude, longitude);
                }
            }
        };

        fusedLocationClient.requestLocationUpdates(locationRequest, locationCallback, null);
    }

    private String getAddressFromLocation(double latitude, double longitude) {
        try {
            Geocoder geocoder = new Geocoder(this, Locale.getDefault());
            List<Address> addresses = geocoder.getFromLocation(latitude, longitude, 1);
            if (!addresses.isEmpty()) {
                return addresses.get(0).getAddressLine(0);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "Unknown";
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        if (locationCallback != null) {
            fusedLocationClient.removeLocationUpdates(locationCallback);
        }
        if (locationServer != null) {
            locationServer.stop();
        }
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel serviceChannel = new NotificationChannel(
                    CHANNEL_ID, "GrowSafe Location Service",
                    NotificationManager.IMPORTANCE_DEFAULT);
            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(serviceChannel);
        }
    }

    // Local HTTP server to expose location
    private class LocationServer extends NanoHTTPD {
        public LocationServer() throws IOException {
            super(5555);
        }

        @Override
        public Response serve(IHTTPSession session) {
            if ("/get-location".equals(session.getUri())) {
                String jsonResponse = "{ \"latitude\": " + latitude +
                        ", \"longitude\": " + longitude +
                        ", \"address\": \"" + fullAddress + "\" }";
                return newFixedLengthResponse(Response.Status.OK, "application/json", jsonResponse);
            }
            return newFixedLengthResponse(Response.Status.NOT_FOUND, "text/plain", "Not Found");
        }
    }
}
