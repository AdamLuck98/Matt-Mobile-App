const initialState = {
  profilescreenstate: 0
};
const Profilescreenstate = (state = initialState, action: any) => {
  switch (action.type) {
    case "profilescreenAction":
      return state = action.payload;

    default:
      return state;
  }
};

export default Profilescreenstate;
