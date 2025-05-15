import React from "react";
import InputField from "../components/input/InputField";


const AddFavoriteModal = ({ show, setShow, control, handleSubmit, handleAddCollection }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={() => setShow(false)}
    >
      <div
        className="bg-[#1f2937] p-6 rounded w-full max-w-md text-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h4 className="text-xl font-semibold mb-4">Add your favorites</h4>
        <form onSubmit={handleSubmit(handleAddCollection)}>
          <InputField
            control={control}
            label="Name of your Favorite"
            defaultValue=""
            id="colection_name"
            placeholder="Ex: Anime, Action"
            name="colection_name"
          />

          <div className="flex mt-4 gap-2">
            <button
              type="submit"
              className="w-full bg-primary hover:bg-purple-700 text-white py-2 rounded transition"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setShow(false)}
              className="w-full bg-gray-600 hover:bg-gray-500 text-white py-2 rounded transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFavoriteModal;