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
import com.google.android.gms.tasks.OnSuccessListener;
import java.io.IOException;
import java.util.List;
import java.util.Locale;

public class MainActivity4 extends AppCompatActivity {

    private static final int LOCATION_PERMISSION_REQUEST_CODE = 1001;
    private FusedLocationProviderClient fusedLocationClient;
    private TextView tvLocation;
    private Button btnGetLocation;
    private Geocoder geocoder;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_localisation);

        // Initialize UI elements
        tvLocation = findViewById(R.id.tvLocation);
        btnGetLocation = findViewById(R.id.btnGetLocation);

        // Initialize FusedLocationProviderClient
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);

        // Initialize Geocoder
        geocoder = new Geocoder(this, Locale.getDefault());

        // Set button click listener
        btnGetLocation.setOnClickListener(v -> getLocation());
    }

    private void getLocation() {
        // Check for location permissions
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {
            // Request permissions if not granted
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.ACCESS_FINE_LOCATION},
                    LOCATION_PERMISSION_REQUEST_CODE);
        } else {
            // Permission already granted, get location
            fetchLocation();
        }
    }

    private void fetchLocation() {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {
            return;
        }
        fusedLocationClient.getLastLocation()
                .addOnSuccessListener(this, location -> {
                    if (location != null) {
                        // Get latitude and longitude
                        double latitude = location.getLatitude();
                        double longitude = location.getLongitude();

                        // Convert coordinates to address
                        String address = getAddressFromLocation(latitude, longitude);
                        tvLocation.setText(address);
                    } else {
                        tvLocation.setText("Unable to retrieve location. Please ensure location is enabled.");
                    }
                });
    }

    private String getAddressFromLocation(double latitude, double longitude) {
        try {
            // Get address list from Geocoder
            List<Address> addresses = geocoder.getFromLocation(latitude, longitude, 1);
            if (addresses != null && !addresses.isEmpty()) {
                Address address = addresses.get(0);

                // Extract address details
                String streetName = address.getThoroughfare(); // Street name
                String cityName = address.getLocality(); // City name
                String stateName = address.getAdminArea(); // State name
                String countryName = address.getCountryName(); // Country name
                String postalCode = address.getPostalCode(); // Postal code
                String fullAddress = address.getAddressLine(0); // Full address

                // Format the address string
                return "Full Address: " + fullAddress + "\n\n"
                        + "Street: " + streetName + "\n"
                        + "City: " + cityName + "\n"
                        + "State: " + stateName + "\n"
                        + "Country: " + countryName + "\n"
                        + "Postal Code: " + postalCode;
            } else {
                return "No address found for the location.";
            }
        } catch (IOException e) {
            e.printStackTrace();
            return "Error fetching address. Please check your internet connection.";
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == LOCATION_PERMISSION_REQUEST_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // Permission granted, fetch location
                fetchLocation();
            } else {
                // Permission denied, show a message
                Toast.makeText(this, "Location permission denied. Please enable it in settings.", Toast.LENGTH_SHORT).show();
            }
        }
    }
}