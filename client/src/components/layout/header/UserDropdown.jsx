import React, { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../../store/useUserStore";
import { toast } from "react-toastify";

const UserDropdown = ({ isOpen, onClose }) => {
  const dropdownRef = useRef(null);
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleLogout = () => {
    logout();
    toast.success("Đăng xuất thành công!");
    navigate("/login");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50"
    >
      <div className="px-4 py-2 border-b border-gray-700">
        <p className="text-sm text-gray-300">Xin chào,</p>
        <p className="text-sm font-medium text-white">{user?.name}</p>
      </div>
      
      <Link
        to="/profile"
        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
        onClick={onClose}
      >
        Thông tin tài khoản
      </Link>
      
      <Link
        to="/danh-sach-uu-thich"
        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
        onClick={onClose}
      >
        Danh sách yêu thích
      </Link>

      <button
        onClick={handleLogout}
        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default UserDropdown; 