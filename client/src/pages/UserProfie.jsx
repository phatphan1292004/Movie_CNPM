import React, { useEffect, userEffect, useState } from "react"
import useUserStore from ".../store//useUserStore"
import axios from "axios"

const UserProfile = () => {
    const { user } = useUserStore();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.id) return;
            try {
                const res = await axios.get(`/api/users/${user.id}`);
                setProfile(res.data);
            } catch (error) {
                setProfile(null);
            }
        };
        fetchProfile();
    }, [user]);
    if (!user) {
        return <div className="text-center text-red-500">Bạn chưa đăng nhập!</div>;
    } if (!profile) {
        return <div className="text-center text-gray-400">Đang tải thông tin...</div>;
    }
    return (
        <div className="max-w-md mx-auto mt-10 bg-gray-800 text-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Thông tin tài khoản</h2>
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
        </div>
    );
};
export default UserProfile;