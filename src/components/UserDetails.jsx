import { useLoaderData } from "react-router";

const UserDetails = () => {
  const user = useLoaderData();
  console.log(user)
  const { name, photo, address, email, phone, creationTime, lastSignInTime } = user;

  fetch('')

  return (
    <div className="flex justify-center p-6">
      <div className="card w-96 bg-base-100 shadow-xl border">
        <figure className="px-10 pt-10">
          <img src={photo} alt={name} className="rounded-full w-32 h-32 object-cover" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{name}</h2>
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Phone:</strong> {phone}</p>
          {email && <p><strong>Email:</strong> {email}</p>}
          {creationTime && <p><strong>Created:</strong> {creationTime}</p>}
          {lastSignInTime && <p><strong>Last Login:</strong> {lastSignInTime}</p>}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
