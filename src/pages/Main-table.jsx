import { useEffect, useState } from 'react'
import { MainTable } from '../cmps/table/Main-table'
import { globalService } from '../services/global.service'

export const MainTablePage = () => {
    const FIRST_DAY_OF_WEEK = 0
    const [days, setDays] = useState([])
    const [hours, setHours] = useState([])
    
    
    useEffect(() => {
        setDays(globalService.getTableDays())
        setHours(globalService.getTableHours())
    }, [])

    const getNextDayOfWeek = (date, dayOfWeek) => {
        var resultDate = new Date(date.getTime());
        resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
        return resultDate;
    }

    return <MainTable days={days} startDate={getNextDayOfWeek(new Date(), FIRST_DAY_OF_WEEK)} notes={['hanuka1', 'hanuka2','ישיבת צוות','','wedding']} />
}
