package com.growsafe;



import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import java.util.List;

public class AppUsageAdapter extends BaseAdapter {

    private Context context;
    private List<AppUsageModel> appUsageList;

    public AppUsageAdapter(Context context, List<AppUsageModel> appUsageList) {
        this.context = context;
        this.appUsageList = appUsageList;
    }

    @Override
    public int getCount() {
        return appUsageList.size();
    }

    @Override
    public Object getItem(int position) {
        return appUsageList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if (convertView == null) {
            LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView = inflater.inflate(android.R.layout.simple_list_item_2, null);
        }

        TextView appNameTextView = convertView.findViewById(android.R.id.text1);
        TextView appTimeTextView = convertView.findViewById(android.R.id.text2);

        AppUsageModel appUsage = appUsageList.get(position);

        appNameTextView.setText(appUsage.getAppName());
        appTimeTextView.setText(formatTime(appUsage.getTimeUsed()));

        return convertView;
    }

    private String formatTime(long timeInMillis) {
        long minutes = timeInMillis / 1000 / 60;
        long seconds = (timeInMillis / 1000) % 60;
        return String.format("%d min %d sec", minutes, seconds);
    }
}
