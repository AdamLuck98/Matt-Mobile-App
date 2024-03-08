const initialState = {
  VoiceResultState: ""
};
const VoiceResultReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "VoiceResulttype":
      return state = action.payload;

    default:
      return state;
  }
};

export default VoiceResultReducer;
