import React from "react";

const Footer = () => {
  return (
    <footer className="text-center text-sm text-black py-4">
      © {new Date().getFullYear()} Weekendly — Built with passion and occasional
      panic
    </footer>
  );
};

export default Footer;
