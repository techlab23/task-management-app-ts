import Vue from 'vue';
import { MutationTree } from 'vuex';
import { Board, List } from '../types';
import { RootState } from './state';

// Lib to create guid
const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
const guid = () => s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
const makeNewBoard = (payload: { name: string, description: string}): Board => {
  return {
    id: guid(),
    name: payload.name,
    description: payload.description,
    archived: false,
    lists: [],
  }
}

const makeNewList = (payload: { name: string }): List => {
  return {
    id: guid(),
    name: payload.name,
    headerColor: '#607d8b',
    archived: false,
    items: [],
  }
}


export const mutations: MutationTree<RootState> = {
  // Set Initial Data
  SET_INITIAL_DATA(state, payload: Board[] | null) {
    state.boards = payload;
  },

  // Set Loading State
  SET_LOADING_STATE(state, payload: boolean) {
    state.isLoading = payload;
  },

  // Save TaskBoard
  SAVE_TASKBOARD(state, payload) {
    const board = state.boards?.find((b) => b.id == payload.id);

    if(board) {
      board.name = payload.name;
      board.description = payload.description;
    } 
    else {
      state.boards?.push(makeNewBoard(payload));
    }
  },

  // Archive Task Board
  ARCHIVE_TASKBOARD(state, payload) {
    const board = state.boards?.find((b) => b.id == payload.boardId);
    if(board) {
      board.archived = true;
    }
  },

  // Restore Task Board
  RESTORE_TASKBOARD(state, payload) {
    const board = state.boards?.find((b) => b.id == payload.boardId);
    if(board) {
      board.archived = false;
    }
  },

  // Set Active Board
  SET_ACTIVE_TASKBOARD(state, payload) {
    state.activeBoard = payload.board;
  },

  // Save Task List
  SAVE_TASKLIST(state, payload) {
    const board = state.boards?.find((b) => b.id == payload.boardId);
    const list = board?.lists.find((l) => l.id == payload.listId);
    list ? list.name = payload.name : board?.lists.push(makeNewList(payload))
  },

  // Archive Task List
  ARCHIVE_TASKLIST(state, payload) {
    const board = state.boards?.find((b) => b.id == payload.boardId);
    const list = board?.lists.find((l) => l.id == payload.listId);
    if(list) {
      list.archived = true;
    }
  },

  // Restore Task List
  RESTORE_TASKLIST(state, payload) {
    const board = state.boards?.find((b) => b.id == payload.boardId);
    const list = board?.lists.find((l) => l.id == payload.listId);
    if(list) {
      list.archived = false;
    }
  },

  // Reorder TaskBoad Lists
  REORDER_TASKLISTS(state, payload) {
    const board = state.boards?.find((b) => b.id == payload.boardId);
    if(board) {
      board.lists = payload.lists;
    }
  },

  // Reorder Task List Items
  REORDER_TASKLIST_ITEMS(state, payload) {
    const board = state.boards?.find((b) => b.id == payload.boardId);
    const list = board?.lists.find((l) => l.id == payload.listId);
    if(list) {
      list.items = payload.items
    }
  },

  // Save Task List Item
  SAVE_TASKLIST_ITEM(state, payload) {
    const board = state.boards?.find((b) => b.id == payload.boardId);
    const list = board?.lists.find((l) => l.id == payload.listId);
    const item = list?.items.find((item) => item.id == payload.item.id);

    if(item) {
      item.text = payload.item.text
    }
    else {
      payload.item.id = guid();
      list?.items.push(payload.item);
    }
  },

  // Delete Task List Item
  DELETE_TASKLIST_ITEM(state, payload) {
    const board = state.boards?.find((b) => b.id == payload.boardId);
    const list = board?.lists.find((l) => l.id == payload.listId);
    if(list) {
      list.items = list.items.filter(i => i.id !== payload.item.id) 
    }
  },
}
