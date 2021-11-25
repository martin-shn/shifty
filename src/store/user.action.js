import { storgeService } from "../service/storage.service";
import { userService } from "../service/user.service";


export function loadUsers() {
    return async (dispatch) => {
        const users = await userService.getUsers()
        try {
            dispatch({ type: 'SET_USERS', users })

        } catch (err) {
            console.log('err with set users !!!', err);
        }
    }
}

export function addUserToFavorites(user) {

    const userToUpdate = { ...user, isFav: !user.isFav }
    return (dispatch) => {
        try {
            dispatch({ type: 'UPDATE_USER', userToUpdate })
        } catch (err) {
            console.log(err);
        }
    }
}
