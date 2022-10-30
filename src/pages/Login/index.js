import React from "react";
import "./index.css";
import { useDispatch } from "react-redux";
import { fetchDoLogin } from "../../store/features/authSlice";
export default function Index() {
  const dispatch = useDispatch();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  /**
   * DİKKAT!!!
   * fonksiyonlarınız lütfen bileşenlerin gövdesinde yazmayın. yani
   * onClick methodunun içinde arrowfunction açarak yazmayın.
   */
  const doLogin = () => {
    dispatch(
      fetchDoLogin({
        username: username,
        password: password,
      })
    );
  };
  return (
    <div id="container">
      <h1>Log In</h1>
      <span className="close-btn">
        <img
          alt=""
          src="https://cdn4.iconfinder.com/data/icons/miu/22/circle_close_delete_-128.png"
        ></img>
      </span>
      <input
        type="text"
        onChange={(text) => setUsername(text.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        onChange={(text) => setPassword(text.target.value)}
        placeholder="Password"
      />
      <input className="login" type="submit" value="Log in" onClick={doLogin} />
      <a href="/register">Hala üye olmadın mı?</a>
      <p>
        <label className="error" />
      </p>
    </div>
  );
}
