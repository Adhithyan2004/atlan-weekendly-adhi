import React from "react";

const Footer = () => {
  return (
    <footer className="text-center mx-10 text-sm text-black py-4">
      © {new Date().getFullYear()} Weekendly — Built with passion and occasional
      panic
    </footer>
  );
};

export default Footer;
