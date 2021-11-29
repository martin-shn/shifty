import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
        // handleChange({ target: { name: 'fullname', value: loggedInUser?.fullname } })
        // handleChange({ target: { name: 'phone', value: loggedInUser?.phone } })
        // handleChange({ target: { name: 'email', value: loggedInUser?.email } })
        // handleChange({ target: { name: 'role', value: loggedInUser?.role } })

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

    useEffect(() => {
    //     for (let i=0; i<7 ; i++){
    //         setTimeout(()=>{setState({...state, [`toHours${i}`]: toHoursRef.current[i]?.value})},100)
    //     }
    //     // [`toHours${idx}`]: toHoursRef.current[idx].value
        console.log(state);
    }, [state])


    const onChangeTableHour = ({ target }, idx, type) => {
        console.log('id:', target.id);

        setState({ ...state, [`fromHours${idx}`]: ev.target.value});

        
        if (type === 'fromHours') {
            setState({ ...state, [target.id]: target.value});
        }
        else {

            setState({ ...state, [target.id]: target.value });
        }
    }

    const onSave = () => {
        console.log('Saving this form');
        const dataToUpdate = {
            ...loggedInUser,
            fullname: fullname ? fullname : loggedInUser.fullname, 
            phone: phone ? phone : loggedInUser.phone, 
            email: email ? email : loggedInUser.email, 
            role: localRoles.filter(role => role.isChecked).map(role => role.name),
            table:{
                ...state
            }
        }
        userService.updateUserData(dataToUpdate)
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
                            autoComplete='off'
                            autoCorrect='off'
                            name='fullname'
                            value={loggedInUser?.fullname || fullname}
                            onChange={handleChange}
                        />
                        <label htmlFor='name'>שם העובד</label>
                    </div>
                    <div>
                        <input
                            id='phone'
                            type='phone'
                            className={phone || loggedInUser.phone ? 'dirty ltr' : 'ltr'}
                            maxLength='10'
                            name='phone'
                            value={loggedInUser.phone || phone}
                            onChange={handleChange}
                        />
                        <label htmlFor='phone'>מספר נייד</label>
                    </div>
                    <div>
                        <input id='phone' type='email' className={loggedInUser.email || email ? 'dirty ltr' : 'ltr'} name='email' value={loggedInUser.email || email} onChange={handleChange} />
                        <label htmlFor='phone'>אימייל</label>
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
                                                onChange={(ev) => {
                                                    setState({ ...state, [`fromHours${idx}`]: ev.target.value});
                                                }}
                                                value={state[`fromHours${idx}`]}
                                            >
                                                <option>ללא</option>
                                                {hours.map((hour, fromHourIdx) => {
                                                    return <option key={`fromHour${idx}-${fromHourIdx}`}>{(hour + '').padStart(2, 0)}:00</option>;
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
                <button onClick={()=>console.log(toHoursRef.current[1].value)}>print refs</button>
            </section>
        );
};
