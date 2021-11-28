import { useEffect, useState } from 'react';

export const MultiCheckboxSelect = ({ data, refEl, onClose, handleChange }) => {
    const [values, setValues] = useState(data)

    const toggleSelect = (ev) => {
        console.log(ev.target.checked);
        const value = ev.target.value;
        const idx = values.findIndex(currValue=>value.name===currValue.name)
        if (idx<0) setValues([...values, value])
        else setValues(values.filter(currValue=>currValue.name!==value.name))
        // ev.target.checked=!ev.target.checked
    };

    useEffect(() => {
        console.log(JSON.parse(values));
        handleChange(values)
    }, [values])

    const onScreenClick = (ev) => {
        onClose()
    };

    return (
        <>
            <div className='multi-select-screen' onClick={onScreenClick}></div>
            <div className='multiselect' style={{ width: refEl.current.offsetWidth, top: refEl.current.offsetTop }}>
                {/* {data} */}
                {data.map((currData) => {
                    return (
                        <div key={currData.name}>
                            <input type='checkbox' defaultChecked id={currData.name} value={currData.name} checked={currData.isChecked} onChange={toggleSelect} />
                            <label htmlFor={currData.name}>{currData.name}</label>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
