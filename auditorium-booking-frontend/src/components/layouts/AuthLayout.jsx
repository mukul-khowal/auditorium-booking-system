import React from "react";
import AuthImg from "../Assets/AuthImg.svg";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        <img src={AuthImg} alt="" className="z-10"/>
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[-10%] -right-10" />
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5" />
      </div>
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-4 pb-12">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

