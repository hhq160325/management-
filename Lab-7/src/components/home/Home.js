import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [orchids, setOrchids] = useState([]);
  const baseUrl = `https://6677a9ef145714a1bd754da3.mockapi.io/orchild`;

  useEffect(() => {
    fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => setOrchids(data))
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <div className="orchid-items container-fluid mt-5">
      <div className="row">
        {orchids.map((orchid) => (
          <div key={orchid.id} className="col-12 col-md-4">
            <div
              style={{
                boxShadow: "5px 5px 8px black",
                borderRadius: "20px",
                margin: "0 10px 20px",
                backgroundColor: "#e8f5e9",
              }}
              className="row my-5"
            >
              <div className="item1 col-12 my-5">
                <div className="row Item-inside">
                  <div className="col-12 col-md-4 img-div">
                    <img
                      src={orchid.image}
                      alt="orchidPic"
                      className="img-fluid"
                      style={{
                        width: "220px",
                        height: "250px",
                        borderRadius: "20px",
                      }}
                    />
                  </div>
                  <div className="col-12 col-md-8">
                    <div className="main-title pt-4 pb-3">
                      <h2
                        style={{
                          fontSize: "22px",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        {orchid.name}
                      </h2>
                      <i style={{ fontWeight: "bold", color: "red" }}>
                        {orchid.rating}
                      </i>
                      <h3
                        style={{
                          fontSize: "20px",
                          fontWeight: "400",
                          color: "#4db6ac",
                        }}
                      >
                        {orchid.address}
                      </h3>
                    </div>
                    <div className="menu-year-book">
                      <div
                        style={{ marginBottom: "10px" }}
                        className="year-book-divide d-flex justify-content-between"
                      >
                        <Link to={`/detail/${orchid.id}`}>
                          <button
                            style={{
                              backgroundColor: "#4db6ac",
                              border: "none",
                              marginRight: "30px",
                            }}
                            className="btn btn-primary"
                          >
                            Xem Thêm
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
