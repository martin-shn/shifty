import { useEffect } from 'react';
import { useState } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

const _AppHeader = ({ location }) => {
    const [scroll, setScroll] = useState(0);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [currPage, setCurrPage] = useState(null);

    useEffect(() => {
        window.addEventListener('scroll', updateScroll);
        setLoggedInUser(sessionStorage.getItem('loggedInUser') ? JSON.parse(sessionStorage.getItem('loggedInUser')) : null);
        return () => {
            window.removeEventListener('scroll', updateScroll);
        };
    }, []);

    useEffect(() => {
        setCurrPage(location.pathname === '/' ? 'header' : null);
    }, [location]);

    const updateScroll = () => {
        setScroll(window.scrollY);
    };

    const onLogout = () => {
        sessionStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
    };

    return (
        <section className={`main-layout app-header${currPage === 'header' ? (scroll > 15 ? ' one-line' : '') : scroll > 15 ? '' : ' one-line'}`}>
            <div>
                {!loggedInUser && (
                    <div>
                        <Link to='/login'>התחברות</Link>
                        <Link to='/'>הרשמה</Link>
                    </div>
                )}
                {loggedInUser && (
                    <div>
                        <span>שלום {loggedInUser.name},</span>
                        <button onClick={onLogout}>התנתקות</button>
                    </div>
                )}
                <label>Shifty</label>
            </div>
            <nav>
                <NavLink to='/'>דף בית</NavLink>
                <NavLink to=''>אודות</NavLink>
                <NavLink to=''>צור קשר</NavLink>
            </nav>
        </section>
    );
};

export const AppHeader = withRouter(_AppHeader);
