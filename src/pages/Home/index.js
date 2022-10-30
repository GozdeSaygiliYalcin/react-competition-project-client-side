import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDoOnline,
  fetchOnlineList,
  fetchDoOffline,
  fetchGetQuestions,
} from "../../store/features/userSlice";
export default function Index() {
  const dispatch = useDispatch();
  const onlineList = useSelector((state) => state.user.onlineUserList);
  const token = useSelector((state) => state.auth.token);
  const [question, setQuestion] = React.useState(null);
  const loopList = () => {
    setInterval(() => {
      dispatch(fetchOnlineList());
      dispatch(fetchGetQuestions()).then((res) => setQuestion(res.payload));
    }, 1000);
  };
  useEffect(() => {
    /**
     * Bu sayfa ilk açıldığı zaman kişinin online olduğunu sunucuya bildiriyoruz.
     */
    dispatch(fetchDoOnline(token));
    loopList();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 islemcontainer">
          <div className="row siralama">
            <h2>Sıralama</h2>
            <div className="order shadow-sm">
              <img alt="" src="/svg/cup-trophy-svgrepo-com.svg" />
              Birinci Olan
            </div>
            <div className="order shadow-sm">
              <img alt="" src="/svg/cup-trophy-svgrepo-com.svg" />
              İkinci Olan
            </div>
            <div className="order shadow-sm">
              <img alt="" src="/svg/cup-trophy-svgrepo-com.svg" />
              Üçüncü Olan
            </div>
          </div>
          <div className="row islembutonlari">
            <div className="d-grid gap-2">
              <button className="btn btn-success" type="button">
                Yarışmaya Başla
              </button>
              <button className="btn btn-danger" type="button">
                Yarışmayı Bitir
              </button>
              <button className="btn btn-warning" type="button">
                Yeni Soru
              </button>
            </div>
          </div>
        </div>
        <div className="col-6 sorucevapcontainer">
          <div className="row">
            <label className="form-label">Soru</label>
            <textarea
              className="form-control"
              rows="3"
              value={question?.question}
            ></textarea>
          </div>
          <div className="row">
            <div className="col">
              <label className="form-label">A</label>
              <input type="text" className="form-control" value={question?.a} />
              <label className="form-label">B</label>
              <input type="text" className="form-control" value={question?.b} />
            </div>
            <div className="col">
              <label className="form-label">C</label>
              <input type="text" className="form-control" value={question?.c} />
              <label className="form-label">D</label>
              <input type="text" className="form-control" value={question?.d} />
            </div>
          </div>
        </div>
        <div className="col-3 katilimcilarcontainer">
          <div className="row">
            <h2>KATILIMCI LİSTESİ</h2>
          </div>
          <div className="row">
            {onlineList.map((data, index) => {
              return (
                <div key={index} className="col-4 yarismaci">
                  <img
                    alt=""
                    width={75}
                    height={75}
                    src="https://www.pngitem.com/pimgs/m/421-4212266_transparent-default-avatar-png-default-avatar-images-png.png"
                  />
                  <p>
                    <small>{data.username}</small>
                  </p>
                  <div className="online"></div>
                </div>
              );
            })}
            <br />
            <button
              className="btn btn-dark"
              onClick={() => {
                dispatch(fetchDoOffline(token));
              }}
            >
              Çıkış
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
