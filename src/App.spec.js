import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'

import App from './App.vue'

describe('App', () => {
    
    it('App renders properly by default', () => {
        const wrapper = mount(App) 
        expect(wrapper.exists()).toBeTruthy()
        expect(wrapper.html()).toContain('You did it!')
    })

})
  