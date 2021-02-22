import { shallowMount } from "@vue/test-utils"
import App from "../src/App.vue"

describe("App", () => {
  let store: any
  
  const allBoards = [
    { id: 111, 
      name: "kanban", 
      description: "kanban board", 
      archived: true, 
      lists: [] 
    },
    {
      id: 222,
      name: "tracker",
      description: "tracker board",
      archived: false,
      lists: [
        { id: "222-1", name: "list 1", archived: false, items: [] },
        { id: "222-2", name: "list 1", archived: false, items: [] }
      ]
    }
  ]

  beforeEach(() => {
    store = {
      dispatch: jest.fn(),
      state: {
        isLoading: false,
        boards: allBoards, 
        activeBoard: null,
      },
      getters: {
        archivedBoards: [allBoards[0]],
        unarchivedBoards: [allBoards[0]],
        isLoading: false,
        allBoards: allBoards
      }
    }
  })

  it("calls fetchData to load initial data", async () => {
    const wrapper = shallowMount(App, {
      global: {
        mocks: {
          $store: store 
        }
      }
    })
    expect(store.dispatch).toHaveBeenCalledWith("fetchData")
  })
})
