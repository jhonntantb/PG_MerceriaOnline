import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div style={{marginTop:"5%"}} className="background-general">
      <div className="container">
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <div className="container py-5">
          <div className="row mb-4">
            <div className="text-center">
              <h2 className="font-weight-dark">Nuestro Equipo</h2>
              <p className="font-italic text-muted">
                Conecta con nuestros devs
              </p>
            </div>
          </div>
          <div className="row text-center">
            {/* Team item*/}
            <div className="col-xl-3 col-sm-6 mb-5">
              <div className="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src="https://avatars.githubusercontent.com/u/78978458?v=4"
                  alt="imagen del profile"
                  width={100}
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0">Enrique Goyret</h5>
                <span className="small text-uppercase text-muted">
                  FullStack Developer
                </span>
                <ul className="social mb-0 list-inline mt-3">
                  <li className="list-inline-item">
                    <a
                      href="https://github.com/egoyret"
                      className="social-link"
                    >
                      <i class="bi bi-github"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="https://www.linkedin.com/in/enrique-goyret/"
                      className="social-link"
                    >
                      <i className="fa fa-linkedin" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* End*/}
            {/* Team item*/}
            <div className="col-xl-3 col-sm-6 mb-5">
              <div className="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src="https://avatars.githubusercontent.com/u/80926059?v=4"
                  alt="imagen del profile"
                  width={100}
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0">Jeremias Andrade</h5>
                <span className="small text-uppercase text-muted">
                  FullStack Developer
                </span>
                <ul className="social mb-0 list-inline mt-3">
                  <li className="list-inline-item">
                    <a href="https://github.com/jexeq" className="social-link">
                      <i class="bi bi-github"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="https://www.linkedin.com/in/jeremias-andrade-rosales-full-stack-developer/"
                      className="social-link"
                    >
                      <i className="fa fa-linkedin" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* End*/}
            {/* Team item*/}
            <div className="col-xl-3 col-sm-6 mb-5">
              <div className="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src="https://avatars.githubusercontent.com/u/67632014?v=4"
                  alt="imagen del profile"
                  width={100}
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0">Federico Jakowicki</h5>
                <span className="small text-uppercase text-muted">
                  FullStack Developer
                </span>
                <ul className="social mb-0 list-inline mt-3">
                  <li className="list-inline-item">
                    <a
                      href="https://github.com/SilverPraiseTheSun"
                      className="social-link"
                    >
                      <i class="bi bi-github"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="https://www.linkedin.com/in/federico-jakowicki-a0a835202/"
                      className="social-link"
                    >
                      <i className="fa fa-linkedin" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* End*/}
            {/* Team item*/}
            <div className="col-xl-3 col-sm-6 mb-5">
              <div className="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  alt="imagen del profile"
                  width={100}
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0">Maximiliano Menendez</h5>
                <span className="small text-uppercase text-muted">
                  FullStack Developer
                </span>
                <ul className="social mb-0 list-inline mt-3">
                  <li className="list-inline-item">
                    <a
                      href="https://github.com/maximenendez"
                      className="social-link"
                    >
                      <i class="bi bi-github"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="https://www.linkedin.com/in/maximiliano-menendez-294308192/"
                      className="social-link"
                    >
                      <i className="fa fa-linkedin" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* End*/}
            {/* Team item*/}
            <div className="col-xl-3 col-sm-6 mb-5">
              <div className="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src="https://ca.slack-edge.com/TPRS7H4PN-U01T7Q23T3L-1fe000d29a20-512"
                  alt="imagen del profile"
                  width={100}
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0">Jhonatan Tabraj</h5>
                <span className="small text-uppercase text-muted">
                  FullStack Developer
                </span>
                <ul className="social mb-0 list-inline mt-3">
                  <li className="list-inline-item">
                    <a
                      href="https://github.com/jhonntantb"
                      className="social-link"
                    >
                      <i class="bi bi-github"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://www.linkedin.com/in/jhonatan-tabraj/" className="social-link">
                      <i className="fa fa-linkedin" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* End*/}
            {/* Team item*/}
            <div className="col-xl-3 col-sm-6 mb-5">
              <div className="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src="https://media-exp1.licdn.com/dms/image/C4D03AQFodkuWKpDkYg/profile-displayphoto-shrink_800_800/0/1627586512311?e=1634169600&v=beta&t=jLaOJKJgL77EHiBALZEXrT7mKKkXlizXywOcJu4ByZE"
                  alt="imagen del profile"
                  width={100}
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0">Matias Campodonico</h5>
                <span className="small text-uppercase text-muted">
                  FullStack Developer
                </span>
                <ul className="social mb-0 list-inline mt-3">
                  <li className="list-inline-item">
                    <a
                      href="https://github.com/matiascamp"
                      className="social-link"
                    >
                      <i class="bi bi-github"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="https://www.linkedin.com/in/matias-campodonico/"
                      className="social-link"
                    >
                      <i className="fa fa-linkedin" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* End*/}
            {/* Team item*/}
            <div className="col-xl-3 col-sm-6 mb-5">
              <div className="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src="https://ca.slack-edge.com/TPRS7H4PN-U01NQ3Z5P2S-4f3d90050d91-512"
                  alt="imagen del profile"
                  width={100}
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0">Marcelo Miranda</h5>
                <span className="small text-uppercase text-muted">
                  FullStack Developer
                </span>
                <ul className="social mb-0 list-inline mt-3">
                  <li className="list-inline-item">
                    <a href="https://github.com/ticoxz" className="social-link">
                      <i class="bi bi-github"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a
                      href="https://www.linkedin.com/in/tico-miranda/"
                      className="social-link"
                    >
                      <i className="fa fa-linkedin" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* End*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
