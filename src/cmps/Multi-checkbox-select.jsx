import { useEffect, useState } from 'react';

export const MultiCheckboxSelect = ({ data, refEl, onClose, onToggleValue }) => {
    const [values, setValues] = useState(data)

    const toggleSelect = (ev) => {
        const value = ev.target.value;
        setValues(values.map(currValue=>{
            if(currValue.name===value)
            return {name:currValue.name,isChecked:!currValue.isChecked}
            return currValue
        }))
    };

    useEffect(() => {
        onToggleValue(values)
    }, [values])

    const onScreenClick = (ev) => {
        onClose()
    };

    return (
        <>
            <div className='multi-select-screen' onClick={onScreenClick}></div>
            <div className='multiselect' style={{ width: refEl.current.offsetWidth, top: refEl.current.offsetTop }}>
                {values.map((currData) => {
                    return (
                        <div key={currData.name}>
                            <input type='checkbox' id={currData.name} value={currData.name} disabled={currData.name==='מנהל'} checked={currData.isChecked} onChange={toggleSelect} />
                            <label htmlFor={currData.name}>{currData.name}</label>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
