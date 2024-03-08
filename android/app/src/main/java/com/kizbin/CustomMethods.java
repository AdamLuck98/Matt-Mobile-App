package com.kizbin;

import android.content.Intent;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.kizbin.newarchitecture.MainActivity_Print_QRCode;

public class CustomMethods extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    CustomMethods(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "CustomMethods";
    }

    @ReactMethod
    public void barcodeParam(
            String stockNumber,
            String price,
            String title,
            String size
    ) {
        Log.d("DEBUG--", String.format("--------- Get All Data %s  %s  %s  %s", stockNumber, price, title, size));

        Intent intent = new Intent(reactContext, MainActivity_Print_QRCode.class);
        intent.putExtra("stockNumber",stockNumber);
        intent.putExtra("price",price);
        intent.putExtra("title",title);
        intent.putExtra("size",size);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        reactContext.startActivity(intent);


    }
}
