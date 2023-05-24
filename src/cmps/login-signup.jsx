
import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, signup } from '../store/user.action.js'




function getEmptyCredentials() {
    return {
        fullname: '',
        username: '',
        password: '',
    }
}

export function LoginSignup({ onChangeLoginStatus }) {

    const [credentials, setCredentials] = useState(getEmptyCredentials())
    const [isSignupState, setIsSignupState] = useState(false)

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        const updatedCredentials = { ...credentials, [field]: value }
        setCredentials(updatedCredentials)
    }

    function onSubmit(ev) {
        ev.preventDefault()
        if (isSignupState) {
            signup(credentials)
                .then(onChangeLoginStatus)
                .then((user) => {
                    showSuccessMsg(`Welcome ${user.fullname}`)
                })
                .catch(err => {
                    // showErrorMsg('OOps try again')
                })

        } else {
            login(credentials)
                .then(onChangeLoginStatus)
                .then((user) => {
                    showSuccessMsg(`Hi again ${user.fullname}`)
                })
                .catch(err => {
                    showErrorMsg('OOps try again')
                })

        }

    }

    function onToggleSignupState() {
        setIsSignupState(!isSignupState)
    }

    const { username, password, fullname } = credentials

    return (
        <div className="">

            <form className="login-form" onSubmit={onSubmit}>
                <input
                    type="text"
                    className='txt-input'
                    name="username"
                    value={username}
                    placeholder="Username"
                    onChange={handleCredentialsChange}
                    required
                    autoFocus
                />

                <input
                    type="password"
                    className='txt-input'
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={handleCredentialsChange}
                    required
                />

                {isSignupState && <input
                    type="text"
                    name="fullname"
                    className='txt-input'
                    value={fullname}
                    placeholder="Full name"
                    onChange={handleCredentialsChange}
                    required
                />}

                <button className='btn log-btn'>{isSignupState ? 'Signup' : 'Login'}</button>
            </form>

            <div className="btns">
                <a href="#" onClick={onToggleSignupState}>
                    {isSignupState ? 'Already a member? Login' : 'New user? Signup here'}
                </a >
            </div>
        </div >
    )
}

{/* eslint-disable-next-line */ }
