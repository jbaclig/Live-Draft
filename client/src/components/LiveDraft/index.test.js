import React from 'react';
import { shallow, mount } from 'enzyme';
import LiveDraft from './';

describe('LiveDraft tests', () => {
  it('renders without crashing', () => {
    shallow(<LiveDraft />);
  });

  it('should render Selector', () => {
    let wrapper = mount(<LiveDraft />);
    expect(wrapper.exists('.selector')).toEqual(true);
  });
});
