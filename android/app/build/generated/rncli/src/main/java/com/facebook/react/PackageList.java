
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// @react-native-clipboard/clipboard
import com.reactnativecommunity.clipboard.ClipboardPackage;
// @react-native-community/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// @react-native-firebase/app
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
// @react-native-firebase/auth
import io.invertase.firebase.auth.ReactNativeFirebaseAuthPackage;
// @react-native-firebase/messaging
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;
// @react-native-voice/voice
import com.wenkesj.voice.VoicePackage;
// lottie-react-native
import com.airbnb.android.react.lottie.LottiePackage;
// react-native-bootsplash
import com.zoontek.rnbootsplash.RNBootSplashPackage;
// react-native-camera
import org.reactnative.camera.RNCameraPackage;
// react-native-device-info
import com.learnium.RNDeviceInfo.RNDeviceInfo;
// react-native-fast-image
import com.dylanvann.fastimage.FastImageViewPackage;
// react-native-fs
import com.rnfs.RNFSPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
// react-native-image-crop-picker
import com.reactnative.ivpusic.imagepicker.PickerPackage;
// react-native-inappbrowser-reborn
import com.proyecto26.inappbrowser.RNInAppBrowserPackage;
// react-native-localize
import com.zoontek.rnlocalize.RNLocalizePackage;
// react-native-photo-zoom
import com.retizen.photozoom.PhotoZoomPackage;
// react-native-print
import com.christopherdro.RNPrint.RNPrintPackage;
// react-native-reanimated
import com.swmansion.reanimated.ReanimatedPackage;
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-svg
import com.horcrux.svg.SvgPackage;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;
// react-native-view-shot
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
// sp-react-native-in-app-updates
import com.sudoplz.rninappupdates.SpReactNativeInAppUpdatesPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new ClipboardPackage(),
      new AsyncStoragePackage(),
      new ReactNativeFirebaseAppPackage(),
      new ReactNativeFirebaseAuthPackage(),
      new ReactNativeFirebaseMessagingPackage(),
      new VoicePackage(),
      new LottiePackage(),
      new RNBootSplashPackage(),
      new RNCameraPackage(),
      new RNDeviceInfo(),
      new FastImageViewPackage(),
      new RNFSPackage(),
      new RNGestureHandlerPackage(),
      new PickerPackage(),
      new RNInAppBrowserPackage(),
      new RNLocalizePackage(),
      new PhotoZoomPackage(),
      new RNPrintPackage(),
      new ReanimatedPackage(),
      new SafeAreaContextPackage(),
      new RNScreensPackage(),
      new SvgPackage(),
      new VectorIconsPackage(),
      new RNViewShotPackage(),
      new SpReactNativeInAppUpdatesPackage()
    ));
  }
}
