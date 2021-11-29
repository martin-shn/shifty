import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { MultiCheckboxSelect } from '../cmps/Multi-checkbox-select';
import { useForm } from '../hooks/useForm';
import { globalService } from '../services/global.service';

export const SettingsPage = () => {
    const loggedInUser = useSelector((state) => state.userModule.loggedInUser);
    const globalData = useSelector((state) => state.userModule.globalData);
    const userData = useSelector((state) => state.userModule.userData);
    const [formFields, handleChange] = useForm({ fullname: '', phone: '', email: '', role: [] });
    const {fullname, phone, email, role } = formFields

    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
    const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0];
    const [state, setState] = useState({});
    const toHoursRef = useRef([]);
    const multiSelectRef = useRef(null);
    const [multi, setMulti] = useState(false)
    const [localRoles, setLocalRoles] = useState(globalData.roles||[])

    useEffect(() => {
        console.log(globalData);
    }, [globalData])

    let localRolesObj = []
    useEffect(() => {
        console.log('ggg',localRolesObj);
        console.log(localRoles);
        localRolesObj = localRoles.map(item=>{
            // console.log('item:',item, 'role:', role, 'loggedinuser', loggedInUser);
            return {name:item, isChecked:(loggedInUser.role).includes(item)}
        })
        console.log(localRolesObj);
        setLocalRoles(localRolesObj)

    }, [])

    useEffect(()=>{
        handleChange({target:{name: 'fullname', value:loggedInUser?.fullname}})
        handleChange({target:{name: 'phone', value:loggedInUser?.phone}})
        handleChange({target:{name: 'email', value:loggedInUser?.email}})
        handleChange({target:{name: 'role', value:loggedInUser?.role}})

        setState({
            ...state,
            fromHours0:userData.table?.from0||'ללא',
            toHours0:userData.table?.to0||'ללא',
            fromHours1:userData.table?.from1||'ללא',
            toHours1:userData.table?.to1||'ללא',
            fromHours2:userData.table?.from2||'ללא',
            toHours2:userData.table?.to2||'ללא',
            fromHours3:userData.table?.from3||'ללא',
            toHours3:userData.table?.to3||'ללא',
            fromHours4:userData.table?.from4||'ללא',
            toHours4:userData.table?.to4||'ללא',
            fromHours5:userData.table?.from5||'ללא',
            toHours5:userData.table?.to5||'ללא',
            fromHours6:userData.table?.from6||'ללא',
            toHours6:userData.table?.to6||'ללא',
         })
    },[userData])

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
                            className={fullname ? 'dirty' : ''}
                            type='text'
                            autoComplete='off'
                            autoCorrect='off'
                            name='fullname'
                            value={fullname}
                            onChange={handleChange}
                        />
                        <label htmlFor='name'>שם העובד</label>
                    </div>
                    <div>
                        <input
                            id='phone'
                            type='phone'
                            className={phone ? 'dirty ltr' : 'ltr'}
                            maxLength='10'
                            name='phone'
                            value={phone}
                            onChange={handleChange}
                        />
                        <label htmlFor='phone'>מספר נייד</label>
                    </div>
                    <div>
                        <input id='phone' type='email' className={email ? 'dirty ltr' : 'ltr'} name='email' value={email} onChange={handleChange} />
                        <label htmlFor='phone'>אימייל</label>
                    </div>
                    <div>
                        <input
                            id='role'
                            type='text'
                            ref={multiSelectRef}
                            disabled={!role?.includes('מנהל')}
                            className={role ? 'dirty' : ''}
                            name='role'
                            value={role?.join(', ')}
                            onClick={()=>setMulti(!multi)}
                        />
                        {multi && <MultiCheckboxSelect 
                            id='role' 
                            data={localRoles} 
                            refEl={multiSelectRef} 
                            onClose={()=>{
                                setMulti(!multi)
                                globalService.updateRoles(role)
                            }}
                            handleChange={(roles)=>handleChange({target:{name:'role', value: roles}})}
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
                                            onChange={(ev) => {
                                                setState({ ...state, [`fromHours${idx}`]: ev.target.value });
                                            }}
                                            value={state[`toHours${idx}`]==='ללא'?'ללא':state[`fromHours${idx}`]}
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
                                            onChange={(ev) => setState({ ...state, [`toHours${idx}`]: ev.target.value })}
                                            value={state[`toHours${idx}`]}
                                        >
                                            {state[`fromHours${idx}`]==='ללא'
                                            ?<option>ללא</option>
                                            :hours.filter((hour) => {
                                                if (!state[`fromHours${idx}`]) return hour > hours[0] || hour === 0
                                                else return hour > +state[`fromHours${idx}`].substr(0, 2) || hour === 0;
                                                }).map((hour, toHourIdx) => {
                                                    return <option key={`toHour${idx}-${toHourIdx}`}>{(hour + '').padStart(2, 0)}:00</option>;
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                {idx < days.length-1 && <hr/>}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
};
