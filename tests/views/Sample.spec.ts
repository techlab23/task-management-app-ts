import { mount } from '@vue/test-utils'

import Sample from '../../src/views/Sample.vue'

describe("Sample.vue", () => {
  it('ensure h1 tag has a name', () => {
    const wrapper = mount(Sample)
    expect(wrapper.text()).toContain('Hello World')
  })
})
