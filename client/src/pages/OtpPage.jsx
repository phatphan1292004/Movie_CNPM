import React from "react";
import OTPInput from "../components/input/OTPInput";
import Button2 from "../components/button/Button2";
import useSignupStore from "../store/useSignupStore";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios/axiosClient";

const OtpPage = () => {
  const navigate = useNavigate();
  const { otp, setOtp, formData, reset } = useSignupStore();

  const handleSubmit = async () => {
    if (otp.length < 6) {
      toast.error("Vui lòng nhập đầy đủ mã OTP");
      return;
    }

    try {
      const res = await axiosClient.post("/verify-otp", {
        email: formData.email,
        otp: otp,
      });

      if (res.status === 200) {
        toast.success("Xác thực OTP thành công!");
        await axiosClient.post("/sign-up", formData);
        reset();
        navigate("/login");
      }
    } catch (error) {
      toast.error("Mã OTP không đúng hoặc đã hết hạn.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-[350px]">
        <h2 className="text-white text-center text-lg font-semibold mb-4">
          Nhập mã OTP
        </h2>
        <OTPInput length={6} onChange={setOtp} />
        <Button2
          onClick={handleSubmit}
          className="block mx-auto w-[200px] h-[50px] mt-4"
        >
          Xác nhận mã OTP
        </Button2>
      </div>
    </div>
  );
};

export default OtpPage;
