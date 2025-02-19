package com.growsafe;

import android.os.Bundle;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity3 extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Create a TextView programmatically
        TextView textView = new TextView(this);
        textView.setText("Native code page 2 activity3");
        textView.setTextSize(18f);
        textView.setPadding(20, 20, 20, 20);

        // Set the TextView as the content view
        setContentView(textView);
    }
}
