package com.growsafe

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.growsafe.LoaderModule


class MyAppPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        // create a list of native modules
        val modules: MutableList<NativeModule> = mutableListOf()
        // add the native module to the list
        modules.add(LoaderModule(reactContext))
        // return the list
        return modules
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}