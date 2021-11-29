import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { MultiCheckboxSelect } from '../cmps/Multi-checkbox-select';
import { useForm } from '../hooks/useForm';
import { globalService } from '../services/global.service';
import { userService } from '../services/user.service';

export const SettingsPage = () => {
    const loggedInUser = useSelector((state) => state.userModule.loggedInUser);

    const globalData = useSelector((state) => state.userModule.globalData);
    const userData = useSelector((state) => state.userModule.userData);
    const [formFields, handleChange] = useForm({ fullname: '', phone: '', email: '', role: [] });
    const { fullname, phone, email, role } = formFields

    const [state, setState] = useState({});
    const toHoursRef = useRef([]);
    const multiSelectRef = useRef(null);
    const [multi, setMulti] = useState(false)
    const [localRoles, setLocalRoles] = useState([])
    const [isRun, setIsRun] = useState(true)
    const [days, setDays] = useState([])
    const [hours, setHours] = useState([])
    const [errorMsg, setErrorMsg] = useState({})

    useEffect(() => {
        if (Object.keys(globalData).length) {
            setLocalRoles(globalData.roles)
        }
    }, [globalData.roles])

    useEffect(() => {
        setDays(globalService.getTableDays())
        setHours(globalService.getTableHours())
    }, [])

    useEffect(() => {
        if (isRun && localRoles.length) {
            setLocalRoles(localRoles.map(item => {
                return { name: item, isChecked: (loggedInUser.role).includes(item) }
            }))
            setIsRun(!isRun)
        }
    }, [localRoles])


    useEffect(() => {
        setState({
            ...state,
            fromHours0: userData.table?.fromHours0 || 'ללא',
            toHours0: userData.table?.toHours0 || 'ללא',
            fromHours1: userData.table?.fromHours1 || 'ללא',
            toHours1: userData.table?.toHours1 || 'ללא',
            fromHours2: userData.table?.fromHours2 || 'ללא',
            toHours2: userData.table?.toHours2 || 'ללא',
            fromHours3: userData.table?.fromHours3 || 'ללא',
            toHours3: userData.table?.toHours3 || 'ללא',
            fromHours4: userData.table?.fromHours4 || 'ללא',
            toHours4: userData.table?.toHours4 || 'ללא',
            fromHours5: userData.table?.fromHours5 || 'ללא',
            toHours5: userData.table?.toHours5 || 'ללא',
            fromHours6: userData.table?.fromHours6 || 'ללא',
            toHours6: userData.table?.toHours6 || 'ללא',
        })
    }, [userData])

    const onChangeTableHour = ({ target }, idx, type) => {
        let fromHourNum = +target.value.substr(0, 2)
        let toHourNum = state[`toHours${idx}`] === 'ללא' ? 'ללא' : +state[`toHours${idx}`].substr(0, 2)
        if (target.value === 'ללא') {
            setState({ ...state, [target.id]: 'ללא', [`toHours${idx}`]: 'ללא' });
        } else if ((type === 'fromHours') && (state[target.id] === 'ללא' || toHourNum <= fromHourNum)) {
            fromHourNum = ((fromHourNum + 1).toString().padStart(2, 0) + ':00');
            setState({ ...state, [target.id]: target.value, [`toHours${idx}`]: fromHourNum });
        } else setState({ ...state, [target.id]: target.value });
    }

    const onSave = () => {
        const updatedLoggedInUser = {
            fullname: fullname ? fullname : loggedInUser.fullname,
            phone: phone ? phone : loggedInUser.phone,
            email: email ? email : loggedInUser.email,
            role: localRoles.filter(role => role.isChecked).map(role => role.name),
        }
        // Validate fields:
        let regex1 = /^[a-zA-Z\u0590-\u05FF\u200f\u200e ]+$/
        const fullnameValidate = regex1.test(updatedLoggedInUser.fullname);
        let regex2 = /^[0][5]\d{8}$/
        const phoneValidate = regex2.test(updatedLoggedInUser.phone);

        let regex3 = /^\S+@\S+\.\S+$/
        const emailValidate = regex3.test(updatedLoggedInUser.email);

        console.log(updatedLoggedInUser.fullname, fullnameValidate, 
            updatedLoggedInUser.phone, phoneValidate,
            updatedLoggedInUser.email, emailValidate);

        if (
            !fullnameValidate || 
            !phoneValidate || 
            !emailValidate) {
                setErrorMsg({txt:'אחד השדות אינו תקין - הטופס לא נשמר!',class:'error'})
                setTimeout(()=>setErrorMsg({}),2000)
                return
            }
            // All OK - lets save:
            
            const dataToUpdate = {
                ...loggedInUser,
                ...updatedLoggedInUser,
                table: {
                    ...state
                }
            }
            userService.updateUserData(dataToUpdate)
            setErrorMsg({txt:'הטופס נשמר בהצלחה!', class:'success'})
            setTimeout(()=>setErrorMsg({}),2000)
    }

    if (!loggedInUser) return <div className='ltr'>Loading...</div>;
    else
        return (
            <section className='settings-page main-layout'>
                <h1>הגדרות</h1>
                <div className='info box'>
                    <label className='box-name'>פרטים אישיים</label>
                    <div>
                        <input
                            id='name'
                            className={fullname || loggedInUser.fullname ? 'dirty' : ''}
                            type='text'
                            pattern='^[a-zA-Z\u0590-\u05FF\u200f\u200e ]+$'
                            autoComplete='off'
                            autoCorrect='off'
                            name='fullname'
                            value={fullname || loggedInUser.fullname}
                            onChange={handleChange}
                        />
                        <label htmlFor='name'>שם העובד</label>
                    </div>
                    <div>
                        <input
                            id='phone'
                            type='phone'
                            pattern='^[0][5]\d{8}$'
                            className={phone || loggedInUser.phone ? 'dirty ltr' : 'ltr'}
                            maxLength='10'
                            name='phone'
                            value={phone || loggedInUser.phone  }
                            onChange={handleChange}
                        />
                        <label htmlFor='phone'>מספר נייד</label>
                    </div>
                    <div>
                        <input 
                            id='email' 
                            type='email' 
                            pattern='^\S+@\S+\.\S+$'
                            className={email || loggedInUser.email ? 'dirty ltr' : 'ltr'} 
                            name='email' 
                            value={email || loggedInUser.email} 
                            onChange={handleChange} 
                        />
                        <label htmlFor='email'>אימייל</label>
                    </div>
                    <div>
                        <input
                            id='role'
                            type='text'
                            ref={multiSelectRef}
                            disabled={!localRoles?.filter(role => role.isChecked).map(role => role.name).includes('מנהל')}
                            className={role ? 'dirty' : ''}
                            name='role'
                            value={localRoles?.filter(role => role.isChecked).map(role => role.name)?.join(', ')}
                            onClick={() => setMulti(!multi)}
                        />
                        {multi && <MultiCheckboxSelect
                            id='role'
                            data={localRoles}
                            refEl={multiSelectRef}
                            onClose={() => {
                                setMulti(!multi)
                                globalService.updateRoles(role)
                            }}
                            onToggleValue={(roles) => setLocalRoles(roles)}
                        />}
                        <label htmlFor='role'>תפקיד</label>
                    </div>
                </div>
                <div className='table box'>
                    <label className='box-name'>אילוצים קבועים</label>
                    <div className='table-container'>
                        {days.map((day, idx) => {
                            return (
                                <div key={`day${idx}`}>
                                    <div className='table-day'>
                                        <label htmlFor={`fromHours${idx}}`}>{day}</label>
                                        <div>
                                            <select
                                                id={`fromHours${idx}`}
                                                onChange={(ev) => { onChangeTableHour(ev, idx, 'fromHours') }}

                                                // onChange={(ev) => {
                                                //     setState({ ...state, [`fromHours${idx}`]: ev.target.value});
                                                // }}
                                                value={state[`fromHours${idx}`]}
                                            >
                                                <option>ללא</option>
                                                {hours.map((hour, fromHourIdx) => {
                                                    return <option name={hour} key={`fromHour${idx}-${fromHourIdx}`}>{(hour + '').padStart(2, 0)}:00</option>;
                                                })}
                                            </select>
                                            -
                                            <select
                                                id={`toHours${idx}`}
                                                ref={(el) => (toHoursRef.current[idx] = el)}
                                                onChange={(ev) => { onChangeTableHour(ev, idx, 'toHours') }}
                                                value={state[`toHours${idx}`]}
                                            >
                                                {state[`fromHours${idx}`] === 'ללא'
                                                    ? <option>ללא</option>
                                                    : hours.filter((hour) => {
                                                        if (!state[`fromHours${idx}`]) return hour > hours[0] || hour === 0
                                                        else return hour > +state[`fromHours${idx}`].substr(0, 2) || hour === 0;
                                                    }).map((hour, toHourIdx) => {
                                                        return <option key={`toHour${idx}-${toHourIdx}`}>{(hour + '').padStart(2, 0)}:00</option>;
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    {idx < days.length - 1 && <hr />}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <button onClick={onSave}>שמור</button>
                <span className={`error-msg ${errorMsg.class}`}>{errorMsg.txt}</span>
            </section>
        );
};
