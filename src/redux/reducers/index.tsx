import user from './user/UserReducer';
import VoiceKeys from './VoiceKey/reducer';
import VoiceResultReducer from './VoiceResult/reducer';
import VoiceReducer from './VoiceToText/reducer';
import SerchScreenSort from './SerchScreenReducer/reducer'
import LoadProfileScreen from './ProfileScreenReducer/reducer';
import Profilescreenstate from './Prostatesfile/reducer';
import FefatchorderReducer from './Fefatchorder/reducer';
const reducers = {
  user,
  VoiceReducer,
  VoiceKeys,
  VoiceResultReducer,
  SerchScreenSort,
  LoadProfileScreen,
  Profilescreenstate,
  FefatchorderReducer
};

export default reducers;
