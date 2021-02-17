import { GetterTree } from 'vuex'
import { Board, List } from '../types'
import { RootState } from './state'

export const getters: GetterTree<RootState, RootState> = {
  isLoading: (state): boolean => state.isLoading,
  allBoards: (state): Board[] | undefined => state.boards,
  activeBoard: (state): Board | undefined => state.activeBoard,
  unarchivedBoards: (state): Board[] | undefined => state.boards?.filter(b => !b.archived),
  archivedBoards: (state): Board[] | undefined => state.boards?.filter(b => b.archived),
  archivedLists: (state): List[] => (state.activeBoard ? state.activeBoard.lists.filter(l => l.archived) : []),
  unarchivedLists: (state): List[] => (state.activeBoard ? state.activeBoard.lists.filter(l => !l.archived) : [])
} 