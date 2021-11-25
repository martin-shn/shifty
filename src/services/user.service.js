import {userData} from '../data/userData';

export const userService = {
    getLoggedInUser,
    login,
    logout,
    getUserData
}

function getLoggedInUser(){
    return sessionStorage.getItem('loggedInUser') ? JSON.parse(sessionStorage.getItem('loggedInUser')) : null;
}

function login(cred){
    if (cred.username==='admin' && cred.password==='1234'){
        const user = {...cred, _id:1, fullname:'מרטין', role:['מנהל','ברמן'], phone:'0526654789', email:'martinshn@gmail.com'}
        delete user.password
        sessionStorage.setItem('loggedInUser', JSON.stringify(user))
        return true
    }
    return false
}

function logout(){
    sessionStorage.removeItem('loggedInUser');
}

function getUserData(userId){
    return userData.find(user => user._id===userId)
}
