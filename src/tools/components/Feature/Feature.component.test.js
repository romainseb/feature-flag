import React from 'react'
import { shallow } from 'enzyme'
import { Feature } from './Feature.component'

describe('Feature component', () => {
  describe('render', () => {
    it('should render the children if the feature is enabled', () => {
      // given
      const props = { enabled: true, placeholder: <div className="placeholder" /> }
      // when
      const wrapper = shallow(
        <Feature {...props}>
          <div className="child" />
        </Feature>
      )
      // then
      expect(wrapper.find('.child').length).toBe(1)
      expect(wrapper.find('.placeholder').length).toBe(0)
    })

    it('should not render the children if the feature is disabled', () => {
      // given
      const props = { enabled: false, placeholder: <div className="placeholder" /> }
      // when
      const wrapper = shallow(
        <Feature {...props}>
          <div className="child" />
        </Feature>
      )
      // then
      expect(wrapper.find('.child').length).toBe(0)
      expect(wrapper.find('.placeholder').length).toBe(1)
    })

    it('should render nothing if there is no placeholder passed', () => {
      // given
      const props = { enabled: false }
      // when
      const wrapper = shallow(
        <Feature {...props}>
          <div>child</div>
        </Feature>
      )
      // then
      expect(wrapper.find('.child').length).toBe(0)
      expect(wrapper.find('.placeholder').length).toBe(0)
    })
  })
})
