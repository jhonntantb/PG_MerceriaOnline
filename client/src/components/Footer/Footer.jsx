import React from "react";
import "./Footer.css";
import { NavLink } from 'react-router-dom';


const Footer = () => {
  return (
    <div className="footer-dark position-fixed-bottom">
      <footer>
        <div className="container-fluid ">
          <div className="row">
            <div className="col-md-4 col-sm-12 item text ps-5">
              <h3>Araceli Merceria</h3>
              <br />
              <img src="https://scontent.ftuc1-1.fna.fbcdn.net/v/t1.18169-9/10923273_406735952831411_3065322763382978546_n.jpg?_nc_cat=104&ccb=1-4&_nc_sid=09cbfe&_nc_ohc=mPv01XSVFSgAX9-cxzs&tn=s9y3TrQbg6IVf8rV&_nc_ht=scontent.ftuc1-1.fna&oh=5435ad22048225e9211a64eff661f9e7&oe=61377CD8"
                alt="img footer" height="150px" />
            </div>
            <div className="col-md-4  col-sm-12 item text-center">
              <h3>Acerca de </h3>
              <br />
              <ul>
                <li><NavLink to="/aboutus">Nosotros</NavLink></li>
                <br />
                <li><NavLink to="/contactus">Contactanos</NavLink></li>
                <br />
                <li><NavLink to="/productlist">Comprar</NavLink></li>
                <br />
                <li><NavLink to="/wishlist">Favoritos</NavLink></li>
              </ul>
            </div>
            <div className="col-md-4  col-sm-12 item ">
              <div className="col item social">
                <h3>Redes </h3>
                <br />
                <ul>
                <li>
                <a target="_blank"  href="https://www.facebook.com/aracelimerceria" title="AraceliMerceria on Facebook">
                  <span style={{fontSize:"20px"}} className="fa fa-facebook me-2" aria-hidden="true"></span>
                  Facebook
                </a>
              </li>
              <br />
              <li >
                <a id="falink2" target="_blank" href="https://wa.link/l28b79" title="AraceliMerceria Whatsapp">
                  <span style={{fontSize:"20px"}} className="fa fa-whatsapp me-2" aria-hidden="true"></span>
                  Whatsapp
                </a>
              </li>
                </ul>
              </div>
              </div>
            <p className="copyright">Araceli Merceria © 2021</p>
            </div>
          </div>
    </footer>
</div>
      );
};

      export default Footer;
