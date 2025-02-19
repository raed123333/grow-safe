package com.growsafe

import android.content.Intent
import android.util.Log
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.growsafe.MainActivity2
import com.growsafe.MainActivity3

class LoaderModule(context: ReactApplicationContext?) : ReactContextBaseJavaModule(context) {
    override fun getName(): String {
        return "LoaderModule"
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    fun launchARSession() {
        val intent = Intent(
            this.currentActivity,
            MainActivity2::class.java
        )
        this.currentActivity!!.startActivity(intent)
    }
    
    @ReactMethod(isBlockingSynchronousMethod = true)
    fun launchARSession1() {
        val intent = Intent(
            this.currentActivity,
            MainActivity3::class.java
        )
        this.currentActivity!!.startActivity(intent)
    }
  
}