import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
function Nav() {
  const navigate=useNavigate()
  const auth=localStorage.getItem('user');
  const logout=()=>{
    localStorage.clear()
    navigate('/signup')
  }
  return (
    <div style={{display:'flex',background:'yellow',flexDirection:'row',justifyContent:'flex-end',alignContent:'center',alignItems:'center',position:'sticky',top:'0px'}}>
      <img alt='logo' src='favicon.ico' style={{height:'50px',width:'50px',alignSelf:'unset'}}></img>
      { auth ? <div style={{display:'flex',flexDirection:'row'}}>
      <h4><Link to='/'>Home</Link></h4>
        <h4><Link to='/products'>Products</Link></h4>
        <h4><Link to='/add'>Add produts</Link></h4>
        {/* <h4><Link to='/update'>update products</Link></h4> */}
        <h4><Link to='/profile'>Profile</Link></h4>
        <h4><Link onClick={logout} to='/sigup'>Logout({JSON.parse(auth).name})</Link></h4>
        </div>
        :
        <div style={{display:'flex',flexDirection:'row'}}>
          <h4><Link to='/signup'>Signup</Link></h4>
          <h4><Link to='/login'>Login</Link></h4>
        </div>
      }
    </div>
  )
}

export default Nav



