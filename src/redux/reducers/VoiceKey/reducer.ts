const initialState = {
  voicekey:""
  };
  const VoiceKeys = (state = initialState, action:any) => {
    switch (action.type) {
      case "voicekey":
      return state = action.payload;

      default:
        return state;
    }
  };
  
  export default VoiceKeys;
  