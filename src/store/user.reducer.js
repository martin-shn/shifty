// import { storgeService } from "../service/storage.service";



const initialState = {
    users: [],
}
export function userReducer(state = initialState, action) {
    var newState = state;
    let users = [...state.users]
    switch (action.type) {
        case 'SET_USERS':
            newState = { ...state, users: action.users }
            break;

        case 'UPDATE_USER':
            const idx = users.findIndex(user => user.id === action.userToUpdate.id)
            users.splice(idx, 1, action.userToUpdate)
            newState = { ...state, users }
            // storgeService.SaveToLocalStorge(newState.users)
            break;


    }
    // For debug:
    window.userState = newState;
    return newState;

}
