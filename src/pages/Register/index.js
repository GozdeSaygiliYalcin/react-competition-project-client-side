import React, { useState } from "react";
import { fetchDoRegister } from "../../store/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
export default function Index() {
  const dispatch = useDispatch();
  /**
   * Local state tanımlıyoruz.
   */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isNotRegister, setIsNotRegister] = useState(false);
  const [errorMessage, SetErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const isRegisterLoading = useSelector(
    (state) => state.auth.isRegisterLoading
  );
  /**
   * Yeni üyelik için tetiklenecek bir arrow function tanımlıyoruz.
   */
  const register = () => {
    /**
     * redux bişlenlerini tetiklemek için dispatch kullanıyoruz.
     */
    dispatch(
      fetchDoRegister({
        username,
        password,
        email,
      })
    ).then((data) => {
      /**
       * Register işlemi sonucundan sunucudan dönen datayı alır.
       */
      if (data.payload.responsecode === 200) {
        setIsRegister(true);
      } else {
        setIsNotRegister(true);
        SetErrorMessage(data.payload.message);
      }
    });
  };
  return (
    <div className="container">
      {isRegisterLoading ? (
        <iframe
          title="register"
          src="https://embed.lottiefiles.com/animation/87482"
        ></iframe>
      ) : null}
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6 mt-5">
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              onChange={(text) => setUsername(text.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              onChange={(text) => setPassword(text.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              onChange={(text) => setEmail(text.target.value)}
            />
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-success"
              onClick={register}
            >
              Kaydol
            </button>
          </div>
          <br />
          {isRegister ? (
            <div className="alert alert-success">
              <p>Kayıt işlemi başarılı</p>
            </div>
          ) : null}
          {isNotRegister ? (
            <div className="alert alert-danger">
              <p>{errorMessage}</p>
            </div>
          ) : null}
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
}
