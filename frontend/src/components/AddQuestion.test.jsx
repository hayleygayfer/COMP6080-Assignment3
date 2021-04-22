import { shallow } from 'enzyme';
import * as React from 'react';
import { AddQuestion } from './AddQuestion';
import renderer from 'react-test-renderer';

describe('AddQuestion', () => {
  const mockCallBack = jest.fn();

  it('triggers onClick event handler when clicked', () => {
    const buttonData = shallow((<AddQuestion />)).first('button');
    const button = shallow((<buttonData onClick={mockCallBack}>Ok!</buttonData>));
    button.simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  // does questionEditor appears when add question button clicked?
  it('questionEditor appears when "AddQuestion" button clicked', () => {
    const wrapper = shallow((<AddQuestion />));
    wrapper.find('button').simulate('click');
    expect(wrapper.html()).toEqual('<button class="button"> Open Editor </button><div>Question: <input type="text" value=""/><br/>Time Limit: <input type="text" value=""/><br/>Answers: <input type="text" value=""/><br/>Image or Video: <input type="text" value=""/><br/></div><button class="button"> Submit Question </button>');
  });

  // questionEditor shouldn't appear when nothing's clicked?
  it('initially only returns a button', () => {
    const wrapper = shallow(<AddQuestion />);
    expect(wrapper.html()).toEqual('<button class="button"> Open Editor </button>');
  });

  // SNAPSHOT TESTING TO INCASE ANYTHING CHANGES:
  it('renders correctly when no click (snapshot)', () => {
    const wrapper = renderer.create(<AddQuestion />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
