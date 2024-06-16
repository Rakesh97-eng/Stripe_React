const { useState } = require("react")

const Login = ()=>{
    const [useremail,setUserEmail] = useState("")
    const [userpassword,setUserpassword] = useState("")

   const handleClick = ()=>{
        fetch('/create-customer',{
            method:"POST",body:{email:useremail}
        }).then((res)=>console.log(res))
    }
    return (

        <>
            <label>Email</label>
            <input value={useremail} onChange={(e)=>setUserEmail(e.target.value)}></input>
            <label>Password</label>
            <input value={userpassword} onChange={(e)=>setUserpassword(e.target.value)}></input>
            <button onClick={handleClick}>Login</button>
        </>
    )
}

export default Login