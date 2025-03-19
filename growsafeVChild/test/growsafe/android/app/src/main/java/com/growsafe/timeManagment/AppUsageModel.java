package com.growsafe;


public class AppUsageModel {
    private String appName;
    private long timeUsed;

    public AppUsageModel(String appName, long timeUsed) {
        this.appName = appName;
        this.timeUsed = timeUsed;
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public long getTimeUsed() {
        return timeUsed;
    }

    public void setTimeUsed(long timeUsed) {
        this.timeUsed = timeUsed;
    }
}
