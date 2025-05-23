import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import axios from "axios";
import AddFavoriteModal from "../modal/AddFavoriteModal";
import axiosClient from "../axios/axiosClient";
const Favorite = () => {
  const [collections, setCollections] = useState([]);
  const [openCollections, setOpenCollections] = useState({});
  const [newCollectionName, setNewCollectionName] = useState("");
  const [showForm, setShowForm] = useState(false);

  const toggleCollection = (name) => {
    setOpenCollections((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleAddCollection = async (data) => {
    try {
      const name = data.colection_name.trim();
      if (!name) {
        toast.error("Vui lòng nhập tên bộ sưu tập!");
        return;
      }

      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.id) {
        toast.error("Không tìm thấy thông tin người dùng.");
        return;
      }

      const res = await axiosClient.post(`/favorites/${user.id}/collections`, {
        name,
      });

      const result = res.data;

      if (!result || !result.favorite) {
        toast.error("Lỗi không xác định từ server.");
        return;
      }

      setCollections(result.favorite.collections);
      setShowForm(false);
      reset();
      toast.success("Đã thêm bộ sưu tập!");
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error(error?.response?.data?.message || "Lỗi kết nối tới server");
    }
  };

  useEffect(() => {
    const fetchCollections = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user?.id) {
        toast.error("Không tìm thấy người dùng.");
        return;
      }
  
      try {
        const res = await axiosClient.get(`/favorites/${user.id}/collections`);
        setCollections(res.data.collections || []);
      } catch (err) {
        console.error("Lỗi khi tải collections:", err);
        toast.error("Không thể tải bộ sưu tập từ server.");
      }
    };
  
    fetchCollections();
  }, []);
  
  console.log(collections);
  const newReleases = [
    {
      title: "Oppenheimer",
      img: "https://i.imgur.com/YOJ6Flt.jpg",
      slug: "oppenheimer",
    },
    {
      title: "The Marvels",
      img: "https://i.imgur.com/HsBGJqe.jpg",
      slug: "marvels",
    },
    {
      title: "Godzilla x Kong",
      img: "https://i.imgur.com/nNxN9vF.jpg",
      slug: "godzilla-kong",
    },
  ];

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitted },
  } = useForm({
    mode: "onChange",
  });

  return (
    <Layout>
      <div className="container mt-[120px] flex justify-between gap-10 relative">
        {/* LEFT: Danh sách bộ sưu tập */}
        <div className="text-white flex-1">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-primary font-semibold text-2xl">
              Your Favorites
            </h3>
            <button
              onClick={() => setShowForm(true)}
              className="bg-primary px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              + Add Collection
            </button>
          </div>

          {collections.map((collection, index) => (
            <div key={index} className="mb-6">
              <h4
                className="text-lg font-bold cursor-pointer text-white hover:text-primary transition"
                onClick={() => toggleCollection(collection.name)}
              >
                ▶ {collection.name}
              </h4>

              {openCollections[collection.name] && (
                <>
                  {collection.movies.length === 0 ? (
                    <p className="text-gray-400 italic mt-2">
                      Chưa có phim nào trong bộ này.
                    </p>
                  ) : (
                    <div className="flex gap-4 overflow-x-auto mt-3">
                      {collection.movies.map((movie, i) => (
                        <div key={i} className="w-[280px]">
                          <Link to={`/phim/${movie.slug}`}>
                            <img
                              src={movie.img}
                              alt={movie.title}
                              className="rounded mb-1 w-[300px]"
                            />

                            <p className="text-sm text-left hover:text-primary transition">
                              {movie.title}
                            </p>
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT: Phim mới ra mắt */}
        {/* <div className="w-[400px] bg-[#1f2937] rounded p-6 text-white shadow-md h-fit sticky top-[120px]">
          <h4 className="text-lg font-semibold mb-4">Phim mới ra mắt</h4>
          <div className="space-y-4">
            {newReleases.map((movie, index) => (
              <div key={index} className="flex gap-4 items-center">
                <img
                  src={movie.img}
                  alt={movie.title}
                  className="w-16 h-20 object-cover rounded"
                />
                <Link to={`/phim/${movie.slug}`}>
                  <p className="hover:text-primary">{movie.title}</p>
                </Link>
              </div>
            ))}
          </div>
        </div> */}

        {/* MODAL FORM: Overlay thêm bộ sưu tập */}
        {showForm && (
          <AddFavoriteModal
            handleSubmit={handleSubmit}
            show={showForm}
            setShow={setShowForm}
            control={control}
            handleAddCollection={handleAddCollection}
          />
        )}
      </div>
    </Layout>
  );
};

export default Favorite;
