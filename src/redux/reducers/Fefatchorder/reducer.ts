const initialState = {
  FefatchorderState: false
};
const FefatchorderReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "Fefatchordertype":
      return state = action.payload;

    default:
      return state;
  }
};

export default FefatchorderReducer;
