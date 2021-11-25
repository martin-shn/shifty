import { useState } from 'react';

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <section className='login-page'>
            <form onSubmit={(ev) => onSubmit(ev, username, password)}>
                <h1>התחברות</h1>
                <div className='fields'>
                    <div>
                        <input
                            className={`ltr${username ? ' dirty' : ''}`}
                            id='username'
                            type='text'
                            maxLength='12'
                            autoComplete='off'
                            autoCorrect='off'
                            onChange={(ev) => setUsername(ev.target.value)}
                            value={username}
                        />
                        <label htmlFor='username'>שם משתמש</label>
                    </div>
                    <div>
                        <input
                            className={`ltr${password ? ' dirty' : ''}`}
                            id='password'
                            type='password'
                            maxLength='12'
                            onChange={(ev) => setPassword(ev.target.value)}
                            value={password}
                        />
                        <label htmlFor='password'>סיסמא</label>
                    </div>
                </div>
                <button disabled={!username || !password}>התחבר</button>
            </form>
        </section>
    );
};

const onSubmit = (ev, username, password) => {
    ev.preventDefault();
    console.log('username,password : ', username, password);
};
