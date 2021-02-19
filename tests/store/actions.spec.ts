import axios from "axios"
import { ActionContext } from "vuex"
import { actions } from "../../src/store/actions"
import { RootState } from "../../src/store/state"
import { Board } from "../../src/types"

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Test actions", () => {
  const commit = jest.fn()
  const payload = {}

  it("fetchData", async () => {
    const boards = [{}, {}]
    const response = { data: { boards } }
    mockedAxios.get.mockResolvedValue(response)

    const fetchData = actions.fetchData as Function 
    await fetchData({ commit })

    expect(commit).toHaveBeenCalledWith("SET_LOADING_STATE", true)
    expect(commit).toHaveBeenCalledWith("SET_INITIAL_DATA", { boards })
    expect(commit).toHaveBeenCalledWith("SET_LOADING_STATE", false)
  })

  it("saveTaskBoard", async () => {
    const saveTaskBoard = actions.saveTaskBoard as Function
    await saveTaskBoard({ commit }, payload)
    expect(commit).toHaveBeenCalledWith("SAVE_TASKBOARD", payload)
  })

  it("archiveTaskBoard", async () => {
    const archiveTaskBoard = actions.archiveTaskBoard as Function
    await archiveTaskBoard({ commit }, payload)
    expect(commit).toHaveBeenCalledWith("ARCHIVE_TASKBOARD", payload)
  })
  it("restoreTaskBoard", async () => {
    const restoreTaskBoard = actions.restoreTaskBoard as Function 
    await restoreTaskBoard({ commit }, payload)
    expect(commit).toHaveBeenCalledWith("RESTORE_TASKBOARD", payload)
  })

  it("setActiveTaskBoard", async () => {
    const setActiveTaskBoard = actions.setActiveTaskBoard as Function 
    await setActiveTaskBoard({ commit }, payload)
    expect(commit).toHaveBeenCalledWith("SET_ACTIVE_TASKBOARD", payload)
  })

  it("saveTaskList", async () => {
    const saveTaskList = actions.saveTaskList as Function
    await saveTaskList({ commit }, payload)
    expect(commit).toHaveBeenCalledWith("SAVE_TASKLIST", payload)
  })

  it("archiveTaskList", async () => {
    const archiveTaskList = actions.archiveTaskList as Function 
    await archiveTaskList({ commit }, payload)
    expect(commit).toHaveBeenCalledWith("ARCHIVE_TASKLIST", payload)
  })

  it("restoreTaskList", async () => {
    const restoreTaskList = actions.restoreTaskList as Function 
    await restoreTaskList({ commit }, payload)
    expect(commit).toHaveBeenCalledWith("RESTORE_TASKLIST", payload)
  })

  it("reorderTaskLists", async () => {
    const reorderTaskLists = actions.reorderTaskLists as Function 
    await reorderTaskLists({ commit }, payload)
    expect(commit).toHaveBeenCalledWith("REORDER_TASKLISTS", payload)
  })

  it("reorderTaskListItems", async () => {
    const reorderTaskListItems = actions.reorderTaskListItems as Function
    await reorderTaskListItems({ commit }, payload)
    expect(commit).toHaveBeenCalledWith("REORDER_TASKLIST_ITEMS", payload)
  })

  it("saveTaskListItem", async () => {
    const saveTaskListItem = actions.saveTaskListItem as Function 
    await saveTaskListItem({ commit }, payload)
    expect(commit).toHaveBeenCalledWith("SAVE_TASKLIST_ITEM", payload)
  })

  it("deleteTaskListItem", async () => {
    const deleteTaskListItem = actions.deleteTaskListItem as Function 
    await deleteTaskListItem({ commit }, payload)
    expect(commit).toHaveBeenCalledWith("DELETE_TASKLIST_ITEM", payload)
  })
})
