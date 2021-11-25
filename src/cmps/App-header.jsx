import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { userService } from '../services/user.service';
import { setLoggedInUser } from '../store/user.action';

const _AppHeader = ({history}) => {
    const [scroll, setScroll] = useState(0);
    const [currPage, setCurrPage] = useState('');

    const loggedInUser = useSelector(state => state.userModule.loggedInUser);
    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener('scroll', updateScroll);
        return () => {
            window.removeEventListener('scroll', updateScroll);
        };
    }, []);

    useEffect(() => {
        setCurrPage(history.location.pathname);
    }, [history.location.pathname]);

    const updateScroll = () => {
        setScroll(window.scrollY);
    };

    const onLogout = () => {
        userService.logout()
        dispatch(setLoggedInUser());
        history.push('/')
    };

    return (
        <section className={`main-layout app-header${currPage === '/' ? (scroll > 15 ? ' one-line' : '') : scroll > 15 ? '' : ' one-line'}`}>
            <div>
                {!loggedInUser && (
                    <div>
                        {currPage!=='/login' && <Link to='/login'>התחברות</Link>}
                    </div>
                )}
                {loggedInUser && (
                    <div>
                        <span>שלום {loggedInUser.fullname},</span>
                        <button onClick={onLogout}>התנתקות</button>
                    </div>
                )}
                <label>Shifty</label>
            </div>
            {!currPage.includes('/main-panel') && <nav>
                <NavLink to='/'>דף בית</NavLink>
                <NavLink to=''>אודות</NavLink>
                <NavLink to=''>צור קשר</NavLink>
            </nav>}
            {currPage.includes('/main-panel') && <nav>
                <NavLink to='/main-panel'>ראשי</NavLink>
                <NavLink to='/main-panel/table'>סידור עבודה</NavLink>
                <NavLink to=''>בקשות</NavLink>
                <NavLink to=''>לוח החלפות</NavLink>
                <NavLink to='/main-panel/settings'>הגדרות</NavLink>
            </nav>}

        </section>
    );
};

export const AppHeader = withRouter(_AppHeader);
