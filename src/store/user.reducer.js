const initialState = {
    userData: [],
    loggedInUser: null
}
export function userReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_LOGGED_IN_USER':
            newState = { ...state, loggedInUser: action.loggedInUser }
            break;
        case 'SET_USER_DATA':
            newState = { ...state, userData: action.userData }
            break;

        default:

    }
    // For debug:
    window.userState = newState;
    return newState;
}
