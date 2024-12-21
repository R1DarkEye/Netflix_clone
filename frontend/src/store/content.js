import { create } from "zustand";

// Function to get the initial content type from local storage or default to "movie"
const getInitialContentType = () => {
  const savedContentType = localStorage.getItem('contentType');
  return savedContentType ? savedContentType : "movie";
};

export const useContentStore = create((set) => ({
  contentType: getInitialContentType(),
  setContentType: (type) => {
    localStorage.setItem('contentType', type);
    set({ contentType: type });
  },
}));