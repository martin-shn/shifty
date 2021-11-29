import { users } from '../data/users';
import { userData } from '../data/userData';

export const userService = {
    getLoggedInUser,
    login,
    logout,
    getUserData,
    loadUserData,
    updateUserData,
    saveUserData
};

const USERS_DB = 'usersDB';
const USERDATA_DB = 'userData';
const LOGGEDINUSER = 'loggedInUser';

function loadUserData() {
    localStorage.setItem(USERS_DB, JSON.stringify(users));
    localStorage.setItem(USERDATA_DB, JSON.stringify(userData));
}

function getLoggedInUser() {
    return sessionStorage.getItem(LOGGEDINUSER) ? JSON.parse(sessionStorage.getItem(LOGGEDINUSER)) : null;
}

function login(cred) {
    const usersDb = localStorage.getItem(USERS_DB);
    if (!userData) throw new Error('No users DB in local storage.');
    const user = JSON.parse(usersDb).find((user) => user.username === cred.username);
    if (!user) {
        console.error('No such user.');
        return false;
    }
    if (cred.password === user.password) {
        delete user.password;
        sessionStorage.setItem(LOGGEDINUSER, JSON.stringify(user));
        return true;
    }
    return false;
}

function logout() {
    sessionStorage.removeItem(LOGGEDINUSER);
}

function getUserData(userId) {
    const userData = localStorage.getItem(USERDATA_DB);
    if (!userData) throw new Error('No users DB in local storage.');
    const user = JSON.parse(userData).find((user) => user._id === userId);
    return user ? user : null;
}

function updateUserData(userData) {
    const usersData = JSON.parse(localStorage.getItem(USERDATA_DB));
    const idx = usersData.findIndex((user) => user._id === userData._id);
    usersData.splice(idx, 1, userData);
    localStorage.setItem(USERDATA_DB, JSON.stringify(usersData));
}

function saveUserData(userData) {
    const usersData = JSON.parse(localStorage.getItem(USERDATA_DB));
    usersData.push(userData);
    localStorage.setItem(USERDATA_DB, JSON.stringify(usersData));
}
