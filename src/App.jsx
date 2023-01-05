import "./styles.css";
import { useState, useEffect, useRef } from "react";
import Loading from "./Loading";
import UserProfile from "./UserProfile";
import store from "./store";

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [active, setActive] = useState(null);
  const [data, setData] = useState(null);
  const btnRef = useRef();
  //  call api and store result to redux store
  const fetchusers = async () => {
    const res = await fetch("https://reqres.in/api/users/");
    const json = await res.json();
    console.log(" ", json.data);
    store.dispatch({ type: "setusers", payload: json.data });
    var result = store.getState();
    setData(result);
    setLoading(false);
  };
  useEffect(() => {
    fetchusers();
  }, []);
  //  change active user whenever user click to button
  // and also handle event Bubbling
  const handleActive = (event) => {
    if (event.target.parentElement === btnRef.current) {
      const buttonText = event.target.innerText;
      console.log(buttonText);
      setActive(buttonText);
    }
  };
  return (
    <div className="App center">
      {isLoading ? <Loading /> : <UserProfile active={active} />}
      <div className="btn-container" ref={btnRef} onClick={handleActive}>
        {data !== null
          ? data.map((user, i) => {
              let userno = i + 1;
              return <GetuserButton key={i} userno={userno} />;
            })
          : ""}
      </div>
    </div>
  );
}

//  button container
const GetuserButton = ({ userno }) => {
  return (
    <>
      <button>{userno}</button>
    </>
  );
};
