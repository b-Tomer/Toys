

import { useEffect, useState } from 'react'
import { userService } from '../services/user.service.js'
import { LoginSignup } from './login-signup.jsx'
import { UserMsg } from './user-msg.jsx'
import { NavLink } from 'react-router-dom'

export function AppHeader() {

    const [user, setUser] = useState(userService.getLoggedinUser())

    useEffect(() => {
      
    }, [])

    function onLogout() {
        userService
            .logout()
            .then(() => { setUser(null) })
    }

    function onChangeLoginStatus(user) {
        setUser(user)
    }



    return (
        <header className='full' >
            <h1>Toys</h1>
            <UserMsg />

            {user ? (
                < section className='txt-center' >
                    <h2>Hello {user.fullname}</h2>
                    <button className=' log-btn btn' onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section className='login-container'>
                    <LoginSignup onChangeLoginStatus={onChangeLoginStatus} />
                </section>
            )}
            <nav className='main-nav'>
               {user && <NavLink to="/user" className=''>Profile</NavLink>}
                <NavLink to="/">Home</NavLink> 
                <NavLink to="/about">About</NavLink> 
                <NavLink to="/chart">Charts</NavLink> 
                <NavLink to="/toy">Toys</NavLink>
            </nav>
        </header>
    )
}


