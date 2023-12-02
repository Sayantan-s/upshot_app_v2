import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
export interface IToast {
  id: string;
  variant: "danger" | "alert" | "success" | "warning";
  details: {
    heading: string;
    description: string;
  };
  removeAfter?: number;
}

interface InitialState {
  toasts: IToast[];
}

const initialState: InitialState = { toasts: [] };

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    createToast: (state, { payload }: PayloadAction<Omit<IToast, "id">>) => {
      const id = uuid();
      state.toasts.push({ ...payload, id });
      setTimeout(() => {
        state.toasts = state.toasts.filter((toast) => toast.id !== id);
      }, payload.removeAfter || 1000);
    },
    deleteToast: (state, { payload }: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== payload);
    },
  },
});

export const { createToast, deleteToast } = toastSlice.actions;

export default toastSlice.reducer;
