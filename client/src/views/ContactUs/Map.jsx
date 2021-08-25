import React from 'react';
import MapView from './MapView';
import "./Map.css"


export const Map = () => {
  return (
    <div style={{marginTop:"5%"}} className="container-fluid">
      <div className="page-title">
        <h2 className="title-contanct">Contactanos</h2>
      </div>
      <h3>Donde estamos</h3>
      <MapView /> <br /> <br />
      <span className="row row-fluid">
        <div className="col col-container col-lg-6 col-md-12 col-sm-12">
          <h4>Informacion de contacto</h4>
          <div className="adress-container">
            <div className="adress-text">
              <div className="adress-text-inner">
                <span className="icon">
                  <i id="facont" class="fa fa-map-marker" aria-hidden="true"></i>
                  <span className="content">
                    <div className="adress-label">Phone numbers:</div>
                    Uttinger 110 4103 Tafi Viejo, Tucumán,Argentina
                  </span>
                </span>
              </div>
            </div>
            <div className="adress-text">
              <div className="adress-text-inner">
                <span className="icon">
                  <i id="facont" class="fa fa-phone" aria-hidden="true"></i>
                  <span className="content">
                    <div className="adress-label">Adress:</div>
                    0381 477-0635
                  </span>
                </span>
              </div>
            </div>
            <div className="adress-text">
              <div className="adress-text-inner">
                <span className="icon">
                  <i id="facont" class="fa fa-envelope" aria-hidden="true"></i>
                  <span className="content">
                    <div className="adress-label">Email:</div>
                    <a id="aemail" href="mailto:aracelimerceria@gmail.com">aracelimerceria@gmail.com</a>
                  </span>
                </span>
              </div>
            </div>
            <div className="adress-text">
              <div className="adress-text-inner">
                <a id="cwhats" href="https://wa.link/l28b79">
                  <span className="icon">
                    <i id="facont" class="fa fa-whatsapp" aria-hidden="true"></i>
                    <span className="content">
                      <div className="adress-label">Whatsapp:</div>
                      +54 381 366-9905
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-container col-lg-6 col-md-12 col-sm-12 ">
          <h4 >Escribinos</h4>
          <br />
          <div>
            <form className="formcont">
              <p class="lead">
                <label >
                  Nombre de usuario (requerido) <br />
                  <div className="form-control-wrap">
                    <input id="input1" className="form-control" name="your-name" size="45" />
                  </div>
                </label>
              </p>
              <p class="lead">
                <label >
                  Email (requerido)<br />
                  <span className="form-control-wrap">
                    <input id="input1" type="email" name="your-email" size="45" class="form-control" aria-required="true" aria-invalid="false" />
                  </span>
                </label>
              </p><br />
              <p class="lead">
                <label >
                  Tu mensaje <br />
                  <span className="form-control-wrap">
                    <textarea id="textarea1" class="form-control textarea"  cols="60" rows="8" aria-invalid="false" />
                  </span>
                </label>
              </p>
              <div>
                <input value="Send" type="submit" class="submitbut" />
              </div>
            </form>
          </div>
        </div>
      </span>
    </div>
  )
}

export default Map;