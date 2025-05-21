import { useState } from "react";
import { Link, useLoaderData } from "react-router";
import Swal from "sweetalert2";
import Navbar from "./Navbar";

const Users = () => {
  const initialUsers = useLoaderData();
  const [users, setUsers] = useState(initialUsers);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {

                const remainingUsers = users.filter(user => user._id !== id);
                setUsers(remainingUsers)
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
      }
    });
  };
  return (
    <div className="overflow-x-auto">
      <Navbar></Navbar>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {users.map((user, index) => (
            <tr key={user._id}>
              <th>{index + 1}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={user.photo}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">United States</div>
                  </div>
                </div>
              </td>
              <td>
                {user.name}
                <br />
                <span className="badge badge-ghost badge-sm">
                  {user.address}
                </span>
              </td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <th>
                <Link to={`/user/${user._id}`}>
                  {" "}
                  <button className="btn bg-blue-500 btn-ghost ">
                    Details
                  </button>
                </Link>
                <button className="btn bg-blue-600 ml-2">Edit</button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="btn bg-blue-600 ml-2"
                >
                  Delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
