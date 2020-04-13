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
    inputField.element.value = newTitle
    inputField.trigger('input')
    expect(wrapper.props('value')) === newTitle
  })

  test('After user input, emit event should be triggered', () => {
    const wrapper = mount(BaseInput)
    const newTitle = 'Add a new Title'
    const inputField = wrapper.find('input')
    inputField.element.value = newTitle
    inputField.trigger('input')

    const updateEmittedCalls = wrapper.emitted('input')
    expect(updateEmittedCalls).toHaveLength(2)
    expect(updateEmittedCalls[0][0]) === newTitle
  })
})
