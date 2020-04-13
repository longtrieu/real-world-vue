import BaseIcon from '@/components/BaseIcon.vue'
import { shallowMount } from '@vue/test-utils'

describe('BaseIcon.vue', () => {
  test('Test rendering props.name when passed', () => {
    const wrapper = shallowMount(BaseIcon, {
      propsData: { name },
    })
    expect(wrapper.text()).toMatch(name)
  })
})
