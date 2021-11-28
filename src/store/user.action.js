// import { storgeService } from "../service/storage.service";
import { userService } from "../services/user.service";
import { globalService } from "../services/global.service";

export function setLoggedInUser(){
    const loggedInUser = userService.getLoggedInUser()
    const userData = userService.getUserData(loggedInUser?._id)
    const globalData = globalService.getGlobalData()
    return (dispatch) => {
        dispatch({ type: 'SET_LOGGED_IN_USER', loggedInUser })
        dispatch({ type: 'SET_USER_DATA', userData })
        dispatch({ type: 'SET_GLOBAL_DATA', globalData })
    }
}

// export function setUserData(loggedInUser){
//     const userData = userService.getUserData(loggedInUser._id)
//     return (dispatch) => {
//         dispatch({ type: 'SET_USER_DATA', userData })
//     }
// }

// export function loadUsers() {
//     return async (dispatch) => {
//         const users = await userService.getUsers()
//         try {
//             dispatch({ type: 'SET_USERS', users })

//         } catch (err) {
//             console.log('err with set users !!!', err);
//         }
//     }
// }

// export function addUserToFavorites(user) {

//     const userToUpdate = { ...user, isFav: !user.isFav }
//     return (dispatch) => {
//         try {
//             dispatch({ type: 'UPDATE_USER', userToUpdate })
//         } catch (err) {
//             console.log(err);
//         }
//     }
// }
