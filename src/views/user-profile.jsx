

import { useEffect } from 'react'
import { userService } from '../services/user.service.js'
import { editUser } from '../store/user.action.js'
import { SET_USER, USER_STYLE } from '../store/user.reducer.js'
import { useDispatch, useSelector } from 'react-redux'

export function UserProfile() {
  const dispatch = useDispatch()
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)
  //user.prefs
  const userStyle = useSelector((storeState) => storeState.userModule.userStyle)

  function handelNameChange(ev) {
    const val = ev.target.value
    user.fullname = val
    dispatch({ type: SET_USER, user })
  }
  
  function onSubmit(){
    userService.editUser(user)
  }


  return (
    <div style={userStyle} className='user-profile'>
      <form action="" onSubmit={onSubmit}>
      <h1>personal details</h1>
      <h3>Name: {user.fullname}</h3>
      <input
        className=''
        type='text'
        name='fullname'
        placeholder='change name?'
        onChange={handelNameChange}
        />
      <button>Ok</button>
        </form>
    </div>
  )
}
