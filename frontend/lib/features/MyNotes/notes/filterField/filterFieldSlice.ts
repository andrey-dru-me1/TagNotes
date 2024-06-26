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
  },
});

export const { appendTag, removeTag } = filterFieldSlice.actions;
export default filterFieldSlice.reducer;
