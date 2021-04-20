import { shallow } from 'enzyme';
import * as React from 'react';
import { AddQuestion } from '../components/AddQuestion';
describe('AddQuestion', () => {
  it('triggers onClick event handler when clicked', () => {
    const mockCallBack = jest.fn();
    const buttonData = shallow((<AddQuestion />)).first('button');
    console.log(buttonData.html())
    const button = shallow((<buttonData onClick={mockCallBack}>Ok!</buttonData>));
    button.simulate('click');
    console.log(buttonData.html())
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  // has questionEditor appears when add question button clicked
  it('questionEditor appears when "AddQuestion" button clicked', () => {
    const wrapper = shallow((<AddQuestion />));
    wrapper.find('button').simulate('click');
    console.log(wrapper.html())
    expect(wrapper.html()).toEqual('<button class="button"> Open Editor </button><div>Question: <input type="text" value=""/><br/>Time Limit: <input type="text" value=""/><br/>Answers: <input type="text" value=""/><br/>Image or Video: <input type="text" value=""/><br/></div><button class="button"> Submit Question </button>');
  });

  // doesn't have questionEditor when not clicked
  it('initially only returns a button', () => {
    const wrapper = shallow(<AddQuestion />);
    expect(wrapper.html()).toEqual('<button class="button"> Open Editor </button>');
  });
});
