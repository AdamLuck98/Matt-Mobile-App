import { Platform } from 'react-native';
import SpInAppUpdates, {
    NeedsUpdateResponse,
    IAUUpdateKind,
    StartUpdateOptions,
  } from 'sp-react-native-in-app-updates';

const versionUpdate =()=>{
   
      
      const inAppUpdates = new SpInAppUpdates(
        false // isDebug
      );
      // curVersion is optional if you don't provide it will automatically take from the app using react-native-device-info
      inAppUpdates.checkNeedsUpdate().then((result) => {
        if (result.shouldUpdate) {
          let updateOptions: StartUpdateOptions = {};
          if (Platform.OS === 'android') {
            // android only, on iOS the user will be promped to go to your app store page
            updateOptions = {
              updateType: IAUUpdateKind.FLEXIBLE,
            };
          }
          inAppUpdates.startUpdate(updateOptions); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
        }
      });  
}
 export default versionUpdate;