package com.growsafe.locker.lock_unlocks_creens;

import android.app.Activity;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import com.growsafe.R;
import com.growsafe.locker.AppLockManager;

public class LockAppActivity extends Activity {

    private AppLockManager appLockManager;
    private String appPackage;
    private EditText passwordInput;
    private ImageView appIconImage;
    private PackageManager packageManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_lock_app);

        // Initialize views
        Button lockButton = findViewById(R.id.lockButton);
        passwordInput = findViewById(R.id.passwordInput);  // EditText for password input
        appIconImage = findViewById(R.id.appIconImage); // ImageView for app icon
        packageManager = getPackageManager();

        // Get the app package name passed from the intent
        appPackage = getIntent().getStringExtra("app_package");

        // Set app icon dynamically using the package manager
        try {
            Drawable appIcon = packageManager.getApplicationIcon(appPackage);
            appIconImage.setImageDrawable(appIcon);
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
            Toast.makeText(this, "App not found", Toast.LENGTH_SHORT).show();
        }

        lockButton.setOnClickListener(v -> {
            String password = passwordInput.getText().toString();
            if (password.isEmpty()) {
                Toast.makeText(this, "Please enter a password", Toast.LENGTH_SHORT).show();
            } else {
                appLockManager = AppLockManager.getInstance(this);
                appLockManager.lockApp(appPackage);

                // Save the password securely in SharedPreferences
                SharedPreferences.Editor editor = getSharedPreferences("AppLockPrefs", MODE_PRIVATE).edit();
                editor.putString(appPackage + "_password", password);  // Save password with app package as key
                editor.apply();

                Toast.makeText(this, "App Locked Successfully!", Toast.LENGTH_SHORT).show();
                finish();
            }
        });

    }
}
