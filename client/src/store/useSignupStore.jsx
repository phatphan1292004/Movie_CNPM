import {create} from "zustand";

const useSignUpStore = create((set) => ({
  formData: null,
  setFormData: (data) => set({ formData: data }),

  otp: "",
  setOtp: (otp) => set({ otp }),

  reset: () => set({ formData: null, otp: "" })
}));

export default useSignUpStore;