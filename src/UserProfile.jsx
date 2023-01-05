import { useEffect, useState } from "react";

const Instruction = () => {
  return (
    <div className="user-container center">
      click below to button to know about User
    </div>
  );
};

const User = ({ user }) => {
  return (
    <div className="center user-container">
      <>
        <img
          src={user.avatar}
          alt="user"
          style={{ width: "100px", height: "100px", borderRadius: "100%" }}
        />
        <p>
          <span>{user.first_name}</span> <span>{user.last_name}</span>
        </p>
        <p>{user.email}</p>
      </>
    </div>
  );
};

const UserProfile = ({ active }) => {
  const [user, setUser] = useState(null);
  const fetchusers = async () => {
    const res = await fetch(`https://reqres.in/api/users/${active}`);
    const json = await res.json();
    setUser(json.data);
  };

  useEffect(() => {
    if (active !== null) {
      fetchusers();
    }
  }, [active]);
  return (
    <div>
      {active !== null ? (
        user !== null ? (
          <User user={user} />
        ) : (
          ""
        )
      ) : (
        <Instruction />
      )}
    </div>
  );
};
export default UserProfile;
