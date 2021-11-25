import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userService } from '../services/user.service';
import { useHistory } from 'react-router-dom';

export const MainPanel = () => {
    const history = useHistory();
    const loggedInUser = useSelector((state) => state.userModule.loggedInUser);
    
    useEffect(() => {
        if (!userService.getLoggedInUser()) history.push('/login')
    })

    if (!loggedInUser) return <div className="ltr">Loading...</div>;
    return (
        <section className='main-panel main-layout'>
            <h1>Main Panel</h1>
            <h2>
                Hi {loggedInUser.name}, You are {loggedInUser.role}
            </h2>
        </section>
    );
};
