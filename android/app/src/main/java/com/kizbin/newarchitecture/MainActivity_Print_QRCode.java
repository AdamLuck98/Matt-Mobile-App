package com.kizbin.newarchitecture;

import androidx.appcompat.app.AppCompatActivity;
import androidx.print.PrintHelper;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.journeyapps.barcodescanner.BarcodeEncoder;
import com.kizbin.R;

public class MainActivity_Print_QRCode extends AppCompatActivity {

    RelativeLayout relativeLayout_capture;
    TextView title_Text,txtsize,price,code;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        ImageView imageView = findViewById(R.id.barcode_image);
        relativeLayout_capture = findViewById(R.id.relative);
        title_Text = findViewById(R.id.title_Text);
        txtsize = findViewById(R.id.size);
        price = findViewById(R.id.price);
        code = findViewById(R.id.code);

        String stockNumber= getIntent().getStringExtra("stockNumber");
        String prices= getIntent().getStringExtra("price");
        String title= getIntent().getStringExtra("title");
        String size= getIntent().getStringExtra("size");

        Log.e("TAG", "onCreate:Data "+stockNumber+prices+title+size );

        code.setText(stockNumber);
        price.setText("$"+prices);
        title_Text.setText(title);
        txtsize.setText(size);


        try {
            // Generate a barcode from the string
            BitMatrix bitMatrix = new MultiFormatWriter().encode(
                    stockNumber,
                    BarcodeFormat.CODE_93,
                    1000, 200 // Adjust the width and height as needed
            );

            // Convert the BitMatrix to a Bitmap
            BarcodeEncoder barcodeEncoder = new BarcodeEncoder();
            Bitmap bitmap = barcodeEncoder.createBitmap(bitMatrix);

            // Set the Bitmap to the ImageView
            imageView.setImageBitmap(bitmap);
            captureScreenshot();

        } catch (WriterException e) {
            e.printStackTrace();
        }
    }

    private void captureScreenshot() {
        PrintHelper photoPrinter = new PrintHelper(MainActivity_Print_QRCode.this);
        photoPrinter.setScaleMode(PrintHelper.SCALE_MODE_FIT);
        photoPrinter.printBitmap("droids.jpg - test print", createBitmapFromLayout(relativeLayout_capture));
    }

    private Bitmap createBitmapFromLayout(View tv) {
        int spec = View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED);
        tv.measure(spec, spec);
        tv.layout(0, 0, tv.getMeasuredWidth(), tv.getMeasuredHeight());
        Bitmap b = Bitmap.createBitmap(tv.getMeasuredWidth(), tv.getMeasuredHeight(),
                Bitmap.Config.ARGB_8888);
        Canvas c = new Canvas(b);
        c.translate((-tv.getScrollX()), (-tv.getScrollY()));
        tv.draw(c);
        return b;
    }
}