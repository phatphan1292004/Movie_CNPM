import React, { useEffect, useState } from "react";
import useUserStore from "../store/useUserStore";
import { toast } from "react-toastify";
import Button2 from "../components/button/Button2";
import InputField from "../components/input/InputField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosClient from "../axios/axiosClient";

const schema = yup.object({
  name: yup.string().required("Vui lòng nhập họ và tên"),
  email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
});

const UserProfile = () => {
    const { user, setUser } = useUserStore();
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            email: ""
        }
    });

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.id) return;
            try {
                const res = await axiosClient.get(`/users/${user.id}`);
                setProfile(res.data);
                reset({
                    name: res.data.name,
                    email: res.data.email
                });
            } catch (error) {
                toast.error("Không thể tải thông tin người dùng");
                setProfile(null);
            }
        };
        fetchProfile();
    }, [user, reset]);

    const handleUpdateProfile = async (data) => {
        try {
            const res = await axiosClient.put(`/users/${user.id}`, data);
            setProfile(res.data);
            setUser({...user, name: res.data.name, email: res.data.email});
            setIsEditing(false);
            toast.success("Cập nhật thông tin thành công!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Cập nhật thất bại");
        }
    };

    if (!user) {
        return <div className="text-center text-red-500">Bạn chưa đăng nhập!</div>;
    }
    if (!profile) {
        return <div className="text-center text-gray-400">Đang tải thông tin...</div>;
    }

    return (
        <div className="max-w-md mx-auto mt-10 bg-gray-800 text-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Thông tin tài khoản</h2>
            
            {isEditing ? (
                <form onSubmit={handleSubmit(handleUpdateProfile)} className="space-y-4">
                    <InputField
                        label="Họ tên"
                        name="name"
                        control={control}
                        defaultValue={profile.name}
                    />
                    <InputField
                        label="Email"
                        name="email"
                        control={control}
                        defaultValue={profile.email}
                    />
                    <div className="flex gap-4 mt-6">
                        <Button2 type="submit" className="flex-1">
                            Lưu thay đổi
                        </Button2>
                        <Button2 
                            type="button" 
                            className="flex-1 bg-gray-600 hover:bg-gray-700"
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
                        <span className="font-semibold">Vai trò:</span> {profile.role}
                    </div>
                    <div className="mb-4">
                        <span className="font-semibold">Ngày tạo:</span> {new Date(profile.createdAt).toLocaleString()}
                    </div>
                    <Button2 
                        onClick={() => setIsEditing(true)}
                        className="w-full mt-4"
                    >
                        Chỉnh sửa thông tin
                    </Button2>
                </>
            )}
        </div>
    );
};

export default UserProfile;