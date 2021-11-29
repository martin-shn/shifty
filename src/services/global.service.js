import {globalData} from '../data/globalData';

export const globalService = {
    getGlobalData,
    updateRoles,
    loadGlobalData,
    getTableHours,
    getTableDays,
}

const GLOBALDATA_DB = 'globalData';

function getTableHours(){
    return globalData.tableHours
}

function getTableDays(){
    return globalData.tableDays
}

function loadGlobalData(){
    localStorage.setItem(GLOBALDATA_DB, JSON.stringify(globalData));
}
function getGlobalData(userId){
    return globalData
}

function updateRoles(role){
    
}
