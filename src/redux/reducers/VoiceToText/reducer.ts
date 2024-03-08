const initialState = {
  // voicestart: false,
  state:false
};
const VoiceReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case "voicestart":
    return state = action.payload;
    default:
      return state;
  }
};

export default VoiceReducer;
