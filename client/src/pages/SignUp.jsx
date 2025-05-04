import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import InputField from "../components/input/InputField"; 
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Button2 from "../components/button/Button2";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OtpPage from "./OtpPage";
import useSignUpStore from "../store/useSignupStore";

const schema = yup.object({
  name: yup.string().required("Vui lòng nhập họ và tên"),
  username: yup.string().required("Vui lòng nhập username"),
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .email("Email không hợp lệ"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .matches(/[A-Z]/, "Mật khẩu phải có ít nhất 1 chữ in hoa")
    .matches(/[0-9]/, "Mật khẩu phải có ít nhất 1 số")
    .matches(/[a-z]/, "Mật khẩu phải có ít nhất 1 chữ thường")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Mật khẩu phải có ít nhất 1 ký tự đặc biệt"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng xác nhận mật khẩu"),
});

const SignUp = () => {
  const [isOTPStep, setIsOTPStep] = useState(false);
  const { setFormData } = useSignUpStore();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitted },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const priorityFields = [
      "name",
      "username",
      "email",
      "password",
      "confirmPassword",
    ];
    for (const field of priorityFields) {
      if (errors[field]?.message) {
        toast.error(errors[field].message, {
          pauseOnHover: false,
          delay: 0,
        });
        break;
      }
    }
  }, [errors]);

  const handleSignUp = async (data) => {
    try {
      const res = await axios.post("/api/send-otp", {
        email: data.email,
      });

      if (res.status === 200) {
        toast.success(res.data?.message);
        setFormData(data); 
        setIsOTPStep(true); 
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Không thể gửi OTP. Vui lòng thử lại."
      );
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      {!isOTPStep ? (
        <div className="w-[600px] flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img
                src="https://streamvid.jwsuperthemes.com/wp-content/uploads/2023/02/logo.svg"
                alt="Logo"
                className="h-12 w-auto"
              />
            </div>

            {/* Đăng ký bằng Google */}
            <button
              className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-2 rounded-md shadow hover:shadow-lg transition mb-6"
              onClick={() => alert("Đăng ký bằng Google")}
            >
              <FcGoogle className="text-2xl" />
              Đăng nhập với Google
            </button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm text-gray-400">
                <span className="bg-gray-800 px-2">hoặc</span>
              </div>
            </div>

            {/* Form đăng ký */}
            <form className="space-y-8" onSubmit={handleSubmit(handleSignUp)}>
              <InputField
                label="Họ và tên"
                id="name"
                name="name"
                control={control}
                defaultValue=""
                placeholder="Enter your name"
              />

              <InputField
                control={control}
                label="Username"
                defaultValue=""
                id="username"
                placeholder="Enter your username"
                name="username"
              />

              <InputField
                label="Email"
                id="email"
                control={control}
                defaultValue=""
                name="email"
                type="email"
                placeholder="you@example.com"
              />
              <InputField
                label="Mật khẩu"
                id="password"
                name="password"
                control={control}
                defaultValue=""
                type="password"
                placeholder="Nhập mật khẩu"
              />
              <InputField
                label="Xác nhận mật khẩu"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                control={control}
                defaultValue=""
                placeholder="Nhập lại mật khẩu"
              />

              <Button2 type="submit" className="w-full h-[50px] mt-5">
                Đăng ký
              </Button2>
            </form>

            <p className="mt-6 text-sm text-center text-gray-400">
              Đã có tài khoản?{" "}
              <NavLink to="/login" className="text-primary hover:underline">
                Đăng nhập
              </NavLink>
            </p>
          </div>
        </div>
      ) : (
        <OtpPage></OtpPage>
      )}
    </div>
  );
};

export default SignUp;
