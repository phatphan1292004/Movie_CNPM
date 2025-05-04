import { create } from "zustand";

const useMovieStore = create((set) => ({
  newMovies: [],
  upcomingMovies: [],
  seriesMovies: [],
  setNewMovies: (data) => set({ newMovies: data }),
  setUpcomingMovies: (data) => set({ upcomingMovies: data }),
  setSeriesMovies: (data) => set({ seriesMovies: data }),
}));

export default useMovieStore;
