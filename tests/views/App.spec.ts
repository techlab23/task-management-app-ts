import { mount } from '@vue/test-utils'

import App from '../../src/App.vue'

describe("App.vue", () => {
  it('ensure h1 tag has a name', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          AppLoadingIndicator: true
        }
      }
    })
    expect(wrapper.text()).toContain('Kanban Board')

  })
})
