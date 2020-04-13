import BaseInput from '@/components/BaseInput.vue'
import { mount } from '@vue/test-utils'

describe('BaseInput.vue', () => {
  test('Label should show if has value', () => {
    const wrapper = mount(BaseInput, { propsData: { label: 'Title' } })
    expect(wrapper.find('label').isVisible()).toBe(true)
  })

  test('Label should hide if has no value', () => {
    const wrapper = mount(BaseInput)
    expect(wrapper.find('label').exists()).toBe(false)
  })

  test('After user input, props value should be saved', () => {
    const wrapper = mount(BaseInput)
    const newTitle = 'Add a new Title'
    const inputField = wrapper.find('input')
    inputField.value = newTitle
    expect(wrapper.props('value')) === newTitle
  })
})
