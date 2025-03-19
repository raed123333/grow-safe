package com.growsafe.locker.lock_unlocks_creens;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.text.TextUtils;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import com.growsafe.R;
import com.growsafe.locker.AppLockManager;

public class AppUnlockActivity extends Activity {

    private EditText passwordInput;
    private ImageView appIconImage;
    private AppLockManager appLockManager;
    private String appPackage;
    private SharedPreferences sharedPreferences;
    private PackageManager packageManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_unlock_app);

        // Initialize views
        passwordInput = findViewById(R.id.passwordInput);
        appIconImage = findViewById(R.id.appIconImage);
        Button unlockButton = findViewById(R.id.unlockButton);

        packageManager = getPackageManager();
        appLockManager = AppLockManager.getInstance(this);
        sharedPreferences = getSharedPreferences("AppLockPrefs", MODE_PRIVATE);

        // Get the app package name passed from the intent
        appPackage = getIntent().getStringExtra("app_package");

        // Load and display app icon
        try {
            Drawable appIcon = packageManager.getApplicationIcon(appPackage);
            appIconImage.setImageDrawable(appIcon);
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
            Toast.makeText(this, "App not found", Toast.LENGTH_SHORT).show();
        }

        unlockButton.setOnClickListener(v -> {
            String password = passwordInput.getText().toString();

            // Retrieve the saved password
            String savedPassword = sharedPreferences.getString(appPackage + "_password", "");

            if (TextUtils.isEmpty(password)) {
                Toast.makeText(this, "Please enter a password", Toast.LENGTH_SHORT).show();
            } else if (savedPassword.equals(password)) {
                // Unlock the app
                appLockManager.unlockApp(appPackage);

                // Launch the app
                Intent intent = getPackageManager().getLaunchIntentForPackage(appPackage);
                if (intent != null) {
                    startActivity(intent);
                } else {
                    Toast.makeText(this, "App not found", Toast.LENGTH_SHORT).show();
                }
                finish();
            } else {
                Toast.makeText(this, "Incorrect password", Toast.LENGTH_SHORT).show();
            }
        });
    }
}
