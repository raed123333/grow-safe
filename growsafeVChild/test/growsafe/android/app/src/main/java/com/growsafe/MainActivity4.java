package com.growsafe;

import android.Manifest;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;

import java.io.IOException;
import java.util.List;
import java.util.Locale;

import fi.iki.elonen.NanoHTTPD;

public class MainActivity4 extends AppCompatActivity {

    private static final int LOCATION_PERMISSION_REQUEST_CODE = 1001;
    private FusedLocationProviderClient fusedLocationClient;
    private TextView tvLocation;
    private Button btnGetLocation;
    private Geocoder geocoder;
    private LocationServer locationServer;
    private double latitude, longitude;
    private String fullAddress = "Unknown";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_localisation);

        tvLocation = findViewById(R.id.tvLocation);
        btnGetLocation = findViewById(R.id.btnGetLocation);
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
        geocoder = new Geocoder(this, Locale.getDefault());

        btnGetLocation.setOnClickListener(v -> getLocation());

        // Lancer le serveur HTTP embarqué
        try {
            locationServer = new LocationServer();
            locationServer.start();
            Toast.makeText(this, "Server started on port 5555", Toast.LENGTH_SHORT).show();
        } catch (IOException e) {
            e.printStackTrace();
            Toast.makeText(this, "Failed to start server", Toast.LENGTH_SHORT).show();
        }
    }

    private void getLocation() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                    LOCATION_PERMISSION_REQUEST_CODE);
        } else {
            fetchLocation();
        }
    }

    @SuppressWarnings("MissingPermission")
    private void fetchLocation() {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {
            return;
        }

        fusedLocationClient.getLastLocation()
                .addOnSuccessListener(this, location -> {
                    if (location != null) {
                        latitude = location.getLatitude();
                        longitude = location.getLongitude();
                        fullAddress = getAddressFromLocation(latitude, longitude);
                        tvLocation.setText(fullAddress);
                    } else {
                        tvLocation.setText("Unable to retrieve location.");
                    }
                });
    }

    private String getAddressFromLocation(double latitude, double longitude) {
        if (!Geocoder.isPresent()) {
            return "Geocoder not available on this device.";
        }

        try {
            List<Address> addresses = geocoder.getFromLocation(latitude, longitude, 1);
            if (addresses != null && !addresses.isEmpty()) {
                Address address = addresses.get(0);
                return address.getAddressLine(0);
            } else {
                return "No address found.";
            }
        } catch (IOException e) {
            e.printStackTrace();
            return "Error fetching address.";
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == LOCATION_PERMISSION_REQUEST_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                fetchLocation();
            } else {
                Toast.makeText(this, "Location permission denied.", Toast.LENGTH_SHORT).show();
            }
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (locationServer != null) {
            locationServer.stop();
        }
    }

    // Serveur HTTP local pour exposer la position
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
