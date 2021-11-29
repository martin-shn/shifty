import { HeaderDay } from './Header-day';
import { ShiftCell } from './Shift-cell';

export const MainTable = (props) => {
    const days = props.days;
    const startDate = props.startDate; //new Date(2021,10,29)
    const notes = props.notes; //Array of notes, sort by location for each day

    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };

    return (
        <div className='main-table'>
            <div className='table-header'>
                {days.map((day, idx) => (
                    <HeaderDay day={day} date={startDate.addDays(idx)} note={notes[idx]} />
                ))}
            </div>
            <div className='shift1'>
                {days.map((day, idx) => (
                    <ShiftCell day={day} date={startDate.addDays(idx)} note={notes[idx]} />
                ))}
            </div>
        </div>
    );
};
