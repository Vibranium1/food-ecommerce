import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Usersignup() {
    const [username, setUsername] = useState('');
    const [phoneno, setPhoneNo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const CreateUser =async (e)=>{
        e.preventDefault();
        if(!username||!phoneno||!email|| !password){
          alert("data missing");
        }
       
        const userData = {
          username,
          phoneno,
          email,
          password,
        };
      
        try {
          const response = await fetch('http://localhost:5000/api/user/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
      
          const result = await response.json();
      
          if (response.ok) {
            alert('User created successfully!');
            navigate('/login')
          } else {
            alert(result.message || 'Something went wrong!');
          }
        } catch (error) {
          console.error("Error:", error);
          alert('Server error in frontend');
        }
      };


  return (
    <div>
      <div>
      <div className='mt-5 container'>
      <form onSubmit={CreateUser}>

      <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">User Name</label>
    <input type="text" className="form-control" id="username" value={username} onChange={(e)=>{setUsername(e.target.value)}}
    placeholder='Enter user name'
    aria-describedby="usernameHelp" />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputNumber1" className="form-label">Phone Number</label>
    <input type="number" className="form-control" id="username" value={phoneno} onChange={(e)=>{setPhoneNo(e.target.value)}}
    placeholder='Enter mobile number'
    aria-describedby="usernameHelp" />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}
    placeholder='Enter email address'
    aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password"
    placeholder='Enter password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
  </div>
  <button type="submit" className="btn btn-primary"> Create User</button> 
  
</form>


    </div>
    </div>
    </div>
  )
}
