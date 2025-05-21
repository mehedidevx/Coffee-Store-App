import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import Navbar from "./Navbar";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  console.log(createUser);

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const { email, password, ...restFormData } = Object.fromEntries(
      formData.entries()
    );



    // create user in the firebase
    createUser(email, password)
      .then((result) => {
        console.log(result.user);

        const userProfile = {
            email,
            ...restFormData,
            creationTime :result.user?.metadata?.creationTime,
            lastSignInTime :result.user?.metadata?.lastSignInTime,
        }

        // save profile info in the db

        fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userProfile),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Your account is created.",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
   <div>
    <Navbar></Navbar>
     <div className=" flex items-center justify-center mt-20">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl ">
        <div className="card-body">
          <h1 className="text-3xl text-center font-bold">Login now!</h1>
          <form onSubmit={handleSignUp} className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              name="name"
              className="input w-full"
              placeholder="Your Name"
            />
            <label className="label">Address</label>
            <input
              type="text"
              name="address"
              className="input w-full"
              placeholder="Your Address"
            />
            <label className="label">Phone</label>
            <input
              type="text"
              name="phone"
              className="input w-full"
              placeholder="Your Phone Number"
            />
            <label className="label">Photo</label>
            <input
              type="text"
              name="photo"
              className="input w-full"
              placeholder="Photo URL"
            />
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

export default SignUp;
