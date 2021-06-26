import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="Footer__container">
      <span className="Footer__name">
        <img
          src="https://assets.inshorts.com/website_assets/images/logo_footer.png"
          alt="footerLogo"
          style={{
            height: "48px",
            width: "160px",
          }}
        />
      </span>
    </div>
  );
};

export default Footer;
