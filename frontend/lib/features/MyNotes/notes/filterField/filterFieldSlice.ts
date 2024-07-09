import Tag from "@/lib/types/Tag";
import { createSlice } from "@reduxjs/toolkit";

interface FilterState {
  filterTags: Tag[];
}

const initialState: FilterState = {
  filterTags: [],
};

const filterFieldSlice = createSlice({
  name: "filterField",
  initialState,
  reducers: {
    appendTag(state, action) {
      state.filterTags.push(action.payload);
    },
    removeTag(state, action) {
      state.filterTags.splice(
        state.filterTags.findIndex((tag) => tag.id === action.payload.id)
      );
    },
    setTags(state, action) {
      state.filterTags = action.payload;
    },
  },
});

export const { appendTag, removeTag, setTags } = filterFieldSlice.actions;
export default filterFieldSlice.reducer;
