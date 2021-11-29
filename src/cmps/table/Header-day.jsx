export const HeaderDay = ({day, date, note=''}) => {
    return (
        <div className="header-day cell">
            <h3>{day}</h3>
            <h4>{date.toLocaleDateString('en-GB')}</h4>
            <h5>{note}</h5>
        </div>
    )
}
