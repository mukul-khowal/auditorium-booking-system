import React from "react";
import AuthImg from "../Assets/AuthImg.svg";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="hidden md:block w-[60vw] h-screen bg-violet-50 bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        <img src={AuthImg} alt="" className="w-screen h-screen z-10"/>
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-primary absolute top-[-10%] -right-10" />
        <div className="w-48 h-48 rounded-[40px] bg-primary absolute -bottom-[15%] -left-5" />
      </div>
      <div className="w-screen h-screen md:w-[40vw] px-12 flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

