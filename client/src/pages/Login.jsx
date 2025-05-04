import React, { useEffect, useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { NavLink } from "react-router-dom";
import Button from "../components/button/Button";
import InputField from "../components/input/InputField";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button2 from "../components/button/Button2";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const schema = yup.object({
  username: yup.string().required("Please enter your username"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const Login = () => {
  const navigate = useNavigate();
  const captchaRef = useRef(null);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitted },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!isSubmitted) return;
    const firstError = Object.values(errors)[0]?.message;
    if (firstError) {
      toast.error(firstError, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);

  const handleSignIn = async (data) => {
    const recaptchaToken = captchaRef.current?.getValue();
    if (!recaptchaToken) {
      toast.error("Vui lòng xác minh CAPTCHA");
      return;
    }
    try {
      const res = await axios.post("/api/login", { ...data, recaptchaToken });
      if (res.status === 200) {
        toast.success(res.data?.message);
        navigate("/");
      }
    } catch (error) {
      if (error.message && error.response.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Login fail");
      }
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
        <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="https://streamvid.jwsuperthemes.com/wp-content/uploads/2023/02/logo.svg"
              alt="Logo"
              className="h-12 w-auto"
            />
          </div>

          {/* Google login */}
          <button
            className="w-full flex items-center justify-center gap-3 bg-white text-black font-semibold py-2 rounded-md shadow hover:shadow-lg transition mb-6"
            onClick={() => alert("Đăng nhập bằng Google")}
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
              <span className="bg-gray-800 px-2">or</span>
            </div>
          </div>

          {/* Form login */}
          <form className="space-y-8" onSubmit={handleSubmit(handleSignIn)}>
            <InputField
              control={control}
              label="Username"
              defaultValue=""
              id="username"
              placeholder="Enter your username"
              name="username"
            />

            <InputField
              control={control}
              label="Mật khẩu"
              id="password"
              type="password"
              defaultValue=""
              placeholder="Enter your password"
              name="password"
            />

            <ReCAPTCHA
              sitekey="6LewmRcrAAAAALV6TLcIHhWwS63ofstmw-GG4ris"
              ref={captchaRef}
              theme="dark"
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-400">
                <input
                  type="checkbox"
                  required
                  className="mr-2 accent-blue-500"
                />
                Nhớ đăng nhập
              </label>
              <a href="#" className="text-sm text-primary hover:underline">
                Quên mật khẩu?
              </a>
            </div>

            <Button2
              type="submit"
              disabled={isSubmitting}
              className="w-full h-[50px] mt-5"
            >
              {isSubmitting ? "Đang xử lý..." : "Sign In"}
            </Button2>
          </form>

          <p className="mt-6 text-sm text-center text-gray-400">
            Bạn chưa có tài khoản?{" "}
            <NavLink to="/sign-up" className="text-primary hover:underline">
              Đăng ký
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
