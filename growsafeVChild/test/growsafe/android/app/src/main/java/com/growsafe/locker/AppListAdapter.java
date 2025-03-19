package com.growsafe.locker;

import android.content.Context;
import android.graphics.drawable.Drawable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.growsafe.R;

import java.util.List;

public class AppListAdapter extends BaseAdapter {
    private final Context context;
    private final List<AppModel> appList;

    public AppListAdapter(Context context, List<AppModel> appList) {
        this.context = context;
        this.appList = appList;
    }

    @Override
    public int getCount() {
        return appList.size();
    }

    @Override
    public Object getItem(int position) {
        return appList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if (convertView == null) {
            convertView = LayoutInflater.from(context).inflate(R.layout.item_app, parent, false);
        }

        ImageView appIcon = convertView.findViewById(R.id.appIcon);
        TextView appName = convertView.findViewById(R.id.appName);

        AppModel app = appList.get(position);
        appIcon.setImageDrawable(app.getIcon());
        appName.setText(app.getName());

        return convertView;
    }
}
