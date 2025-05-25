import React, { useEffect, useState } from "react";
import useUserStore from "../store/useUserStore";
import { toast } from "react-toastify";
import Button2 from "../components/button/Button2";
import InputField from "../components/input/InputField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosClient from "../axios/axiosClient";
import { NavLink } from "react-router-dom";
//8.7.6. Validation thông tin:
const profileSchema = yup.object({
  name: yup.string().required("Vui lòng nhập họ và tên"),
  email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
  phone: yup.string().matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
  birthDate: yup.date()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .max(new Date(), "Ngày sinh không hợp lệ"),
  gender: yup.string().oneOf(["male", "female", "other"], "Vui lòng chọn giới tính")
});
//8.7.7. Validation mật khẩu (UserProfile.jsx):
const passwordSchema = yup.object({
  currentPassword: yup.string().required("Vui lòng nhập mật khẩu hiện tại"),
  newPassword: yup
    .string()
    .required("Vui lòng nhập mật khẩu mới")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .matches(/[A-Z]/, "Mật khẩu phải có ít nhất 1 chữ in hoa")
    .matches(/[0-9]/, "Mật khẩu phải có ít nhất 1 số")
    .matches(/[a-z]/, "Mật khẩu phải có ít nhất 1 chữ thường")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Mật khẩu phải có ít nhất 1 ký tự đặc biệt"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Mật khẩu xác nhận không khớp")
    .required("Vui lòng xác nhận mật khẩu mới")
});

const UserProfile = () => {
    const { user, setUser } = useUserStore();
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    //8.7.3. Chuyển đổi tab (UserProfile.jsx)
    const [activeTab, setActiveTab] = useState("profile"); // "profile" or "password"

    const {
        control: profileControl,
        handleSubmit: handleProfileSubmit,
        formState: { errors: profileErrors },
        reset: resetProfile
    } = useForm({
        resolver: yupResolver(profileSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            birthDate: new Date().toISOString().split('T')[0],
            gender: ""
        },
        mode: "onChange",
        reValidateMode: "onChange"
    });

    const {
        control: passwordControl,
        handleSubmit: handlePasswordSubmit,
        formState: { errors: passwordErrors },
        reset: resetPassword
    } = useForm({
        resolver: yupResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        },
        mode: "onChange",
        reValidateMode: "onChange"
    });
    //8.7.2. Lấy thông tin user
    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.id) return;
            try {
                const res = await axiosClient.get(`/users/${user.id}`);
                setProfile(res.data);
                resetProfile({
                    name: res.data.name,
                    email: res.data.email,
                    phone: res.data.phone || "",
                    birthDate: res.data.birthDate || new Date().toISOString().split('T')[0],
                    gender: res.data.gender || ""
                });
            } catch (error) {
                toast.error("Không thể tải thông tin người dùng");
                setProfile(null);
            }
        };
        fetchProfile();
    }, [user, resetProfile]);
//8.7.4. Cập nhật thông tin cá nhân :
    const handleUpdateProfile = async (data) => {
        // Validate trước khi gửi request
        try {
            await profileSchema.validate(data, { abortEarly: false });
        } catch (err) {
            console.log('Validation Error:', err);
            return;
        }

        try {
            const res = await axiosClient.put(`/users/${user.id}`, data);
            setProfile(res.data);
            setUser({...user, ...res.data});
            setIsEditing(false);
            toast.success("Cập nhật thông tin thành công!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Cập nhật thất bại");
        }
    };
//8.7.5. Đổi mật khẩu (UserProfile.jsx):
    const handleChangePassword = async (data) => {
        // Validate trước khi gửi request
        try {
            await passwordSchema.validate(data, { abortEarly: false });
        } catch (err) {
            console.log('Validation Error:', err);
            return;
        }
        try {
            const response = await axiosClient.put(`/users/${user.id}/password`, {
                currentPassword: data.currentPassword,
                newPassword: data.newPassword
            });
            
            resetPassword();
            toast.success("Đổi mật khẩu thành công!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Đổi mật khẩu thất bại");
        }
    };
    //8.7.1. User mở trang "Thông tin cá nhân" và hệ thống kiểm tra trạng thái đăng nhập.
    if (!user) {
        return <div className="text-center text-red-500">Bạn chưa đăng nhập!</div>;
    }
    if (!profile) { 
        return <div className="text-center text-gray-400">Đang tải thông tin...</div>;
    }
    return (
        <div className="max-w-2xl mx-auto mt-10 bg-gray-800 text-white p-8 rounded-xl shadow-lg">
            <NavLink to="/" className="fixed left-2 top-2 z-50">
            {/* //8.7.10. Button Quay về trang chủ: */}
                <Button2 className="!w-auto !px-4 !py-2 text-sm bg-blue-600 hover:bg-blue-700">
                    ← Quay về trang chủ
                </Button2>
            </NavLink>
            <h2 className="text-2xl font-bold mb-6 text-center">Thông tin tài khoản</h2>
            {/* //8.7.3. Chuyển đổi tab /}
            {/* Tabs */}
            <div className="flex border-b border-gray-700 mb-6">
                <button
                    className={`px-4 py-2 ${activeTab === "profile" ? "border-b-2 border-primary" : "text-gray-400"}`}
                    onClick={() => setActiveTab("profile")}
                >
                    Thông tin cá nhân
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === "password" ? "border-b-2 border-primary" : "text-gray-400"}`}
                    onClick={() => setActiveTab("password")}
                >
                    Đổi mật khẩu
                </button>
            </div>

            {activeTab === "profile" ? (
                isEditing ? (
                    <form onSubmit={handleProfileSubmit(handleUpdateProfile)} className="space-y-4">
                        <div>
                            <InputField
                                label="Họ tên"
                                name="name"
                                control={profileControl}
                                defaultValue={profile.name}
                            />
                            {profileErrors.name && (
                                <p className="text-red-500 text-sm mt-1">{profileErrors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <InputField
                                label="Email"
                                name="email"
                                control={profileControl}
                                defaultValue={profile.email}
                            />
                            {profileErrors.email && (
                                <p className="text-red-500 text-sm mt-1">{profileErrors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <InputField
                                label="Số điện thoại"
                                name="phone"
                                control={profileControl}
                                defaultValue={profile.phone || ""}
                            />
                            {profileErrors.phone && (
                                <p className="text-red-500 text-sm mt-1">{profileErrors.phone.message}</p>
                            )}
                        </div>

                        <div>
                            <InputField
                                label="Ngày sinh"
                                name="birthDate"
                                type="date"
                                control={profileControl}
                                defaultValue={profile.birthDate 
                                    ? new Date(profile.birthDate).toISOString().split('T')[0] 
                                    : new Date().toISOString().split('T')[0]}
                            />
                            {profileErrors.birthDate && (
                                <p className="text-red-500 text-sm mt-1">{profileErrors.birthDate.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm text-gray-300 block mb-2">Giới tính</label>
                            <select
                                {...profileControl.register("gender")}
                                className="w-full px-4 py-3 bg-gray-700/50 text-white rounded-md"
                                defaultValue={profile.gender || ""}
                            >
                                <option value="">Chọn giới tính</option>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                                <option value="other">Khác</option>
                            </select>
                            {profileErrors.gender && (
                                <p className="text-red-500 text-sm mt-1">{profileErrors.gender.message}</p>
                            )}
                        </div>

                        <div className="flex gap-4 mt-6">
                            <Button2 type="submit" className="flex-1 h-[40px]">
                                Lưu thay đổi
                            </Button2>
                            <Button2 
                                type="button" 
                                className="flex-1 bg-gray-600 hover:bg-gray-700 h-[40px]"
                                onClick={() => setIsEditing(false)}
                            >
                                Hủy
                            </Button2>
                        </div>
                    </form>
                ) : (
                    <>
                        <div className="mb-4">
                            <span className="font-semibold">Họ tên:</span> {profile.name}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Username:</span> {profile.username}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Email:</span> {profile.email}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Số điện thoại:</span> {profile.phone || "Chưa cập nhật"}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Ngày sinh:</span> {
                                profile.birthDate 
                                    ? new Date(profile.birthDate).toLocaleDateString() 
                                    : "Chưa cập nhật"
                            }
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Giới tính:</span> {
                                profile.gender === "male" ? "Nam" :
                                profile.gender === "female" ? "Nữ" :
                                profile.gender === "other" ? "Khác" : "Chưa cập nhật"
                            }
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Vai trò:</span> {profile.role}
                        </div>
                        <div className="mb-4">
                            <span className="font-semibold">Ngày tạo:</span> {new Date(profile.createdAt).toLocaleString()}
                        </div>
                        <Button2 
                            onClick={() => setIsEditing(true)}
                            className="w-full mt-4 h-[55px]"
                        >
                            Chỉnh sửa thông tin
                        </Button2>
                    </>
                )
            ) : (
                <form onSubmit={handlePasswordSubmit(handleChangePassword)} className="space-y-4">
                    <div>
                        <InputField
                            label="Mật khẩu hiện tại"
                            name="currentPassword"
                            type="password"
                            control={passwordControl}
                        />
                        {passwordErrors.currentPassword && (
                            <p className="text-red-500 text-sm mt-1">{passwordErrors.currentPassword.message}</p>
                        )}
                    </div>
                    
                    <div>
                        <InputField
                            label="Mật khẩu mới"
                            name="newPassword"
                            type="password"
                            control={passwordControl}
                        />
                        {passwordErrors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">{passwordErrors.newPassword.message}</p>
                        )}
                    </div>
                    
                    <div>
                        <InputField
                            label="Xác nhận mật khẩu mới"
                            name="confirmPassword"
                            type="password"
                            control={passwordControl}
                        />
                        {passwordErrors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{passwordErrors.confirmPassword.message}</p>
                        )}
                    </div>
                    
                    <Button2 type="submit" className="w-full mt-6 h-[55px]">
                        Đổi mật khẩu
                    </Button2>
                </form>
            )}
        </div>
    );
};
export default UserProfile;