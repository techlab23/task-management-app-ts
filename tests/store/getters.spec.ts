import { getters }  from "../../src/store/getters"
import { Board, List } from "../../src/types"

describe("Vuex Getters", () => {
  let state: any

  beforeEach(() => {
    state = {
      isLoading: true,
      activeBoard: {
        id: "1234",
        archived: false,
        lists: [
          {
            id: "1234-1",
            name: "Todo",
            headerColor: "#607d8b",
            archived: false,
            items: []
          }
        ]
      },
      boards: [
        {
          id: "123",
          archived: true,
          lists: [
            {
              id: "123-1",
              name: "Todo",
              headerColor: "#607d8b",
              archived: false,
              items: []
            },
            {
              id: "123-2",
              name: "Doing",
              headerColor: "#607d8b",
              archived: false,
              items: []
            }
          ]
        },
        {
          id: "1234",
          archived: false,
          lists: [
            {
              id: "1234-1",
              name: "Todo",
              headerColor: "#607d8b",
              archived: false,
              items: []
            }
          ]
        }
      ]
    }
  })

  it("isLoading", () => {
    expect(getters.isLoading(state, {}, state, {})).toBe(true)
  })
  it("allBoards", () => {
    expect(getters.allBoards(state, {}, state, {})).toBe(state.boards)
  })
  it("activeBoard", () => {
    expect(getters.activeBoard(state, {}, state, {})).toBe(state.activeBoard)
  })
  it("unarchivedBoards", () => {
    const received = getters.unarchivedBoards(state, {}, state, {})
    const expected = state.boards.filter((b:Board) => !b.archived)
    expect(received).toEqual(expected)
  })
  it("archivedBoards", () => {
    const received = getters.archivedBoards(state, {}, state, {})
    const expected = state.boards.filter((b:Board) => b.archived)
    expect(received).toEqual(expected)
  })
  it("archivedLists", () => {
    const received = getters.archivedLists(state, {}, state, {})
    const expected = state.activeBoard.lists.filter((l:List) => l.archived)
    expect(received).toEqual(expected)
  })
  it("unarchivedLists", () => {
    const received = getters.unarchivedLists(state, {}, state, {})
    const expected = state.activeBoard.lists.filter((l:List) => !l.archived)
    expect(received).toEqual(expected)
  })
})

test("archivdLists returns blank array if activeBoard is not set", () => {
  let state = { isLoading: true, activeBoard: undefined, boards: [] as Board[] }
  const received = getters.archivedLists(state, {}, state, {})
  const expected = [] as Board[]
  expect(received).toEqual(expected)
})

test("unarchivdLists returns blank array if activeBoard is not set", () => {
  let state = { isLoading: true, activeBoard: undefined, boards: [] as Board[] }
  const received = getters.unarchivedLists(state, {}, state, {})
  const expected = [] as Board[]
  expect(received).toEqual(expected)
})
