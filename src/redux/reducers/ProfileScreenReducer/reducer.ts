const initialState = {
    ProfileLoad: 0
};

const LoadProfileScreen = (state = initialState, action: any) => {
    switch (action.type) {
        case "profileLoad":
            return state = action.payload;

        default:
            return state;
    }
};

export default LoadProfileScreen;
