import { Board } from "../types";

export interface RootState {
  isLoading: boolean,
  activeBoard: Board | undefined,
  boards: Board[] | undefined
} 

export const state: RootState = {
  isLoading: true,
  activeBoard: undefined,
  boards: []
}