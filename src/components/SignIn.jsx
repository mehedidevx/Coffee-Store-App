import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "./Navbar";

const SignIn = () => {
    const {signInUser} = useContext(AuthContext);

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password)


    // firebase sign in send
    signInUser(email, password)
    .then(result =>{
        console.log(result.user)
        const signInInfo = {
          email,
          lastSignInTime: result.users?.metadata?.lastSignInTime
        }

        // update last sign in to the database
        fetch('http://localhost:3000/users',{
          method: 'PATCH',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(signInInfo)
        })
        .then(res => res.json())
        .then(data =>{
          console.log('after update patch', data)
        })

    })
    .catch(error =>{
        console.log(error)
    });
    



  };
  return (
   <div>
    <Navbar></Navbar>
     <div className=" flex items-center justify-center mt-20">
        
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl ">
      
        <div className="card-body">
          <h1 className="text-3xl text-center font-bold">Login now!</h1>
          <form onSubmit={handleSignIn} className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input w-full"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              type="password"
              className="input w-full"
              name="password"
              placeholder="Password"
            />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
   </div>
  );
};

export default SignIn;
