import { shallow } from 'enzyme';
import * as React from 'react';
import { AddQuestion } from './AddQuestion';
import renderer from 'react-test-renderer';

describe('AddQuestion', () => {
  const mockCallBack = jest.fn();
  const addQInput = {
    game: "",
    id: 297083846
  }
  const dodgyInput = {
    game: "",
    id: 1234567
  }
  const correctHTML = '<div>Question: <input type="text" value=""/><br/>Time Limit: <input type="text" value=""/><br/><div>Answer: <input type="text" value=""/><br/><button class="button">Add Answer as Correct</button><button class="button">Add Answer as Incorrect</button><br/>All Answers:<br/><br/>Correct Answers:<br/><br/></div>Image or Video: <input type="text" value=""/><br/></div><button class="button"> Submit Question </button>'

  it('triggers onClick event handler when clicked', () => {
    const buttonData = shallow((<AddQuestion input={addQInput}/>)).first('button');
    const button = shallow((<buttonData onClick={mockCallBack}>Ok!</buttonData>));
    button.simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  it('returns specific html', () => {
    const wrapper = shallow((<AddQuestion input={addQInput}/>));
    expect(wrapper.html()).toEqual(correctHTML);
  });

  it('returns same inital output with dodgy game id', () => {
    const wrapper = shallow(<AddQuestion input={dodgyInput}/>);
    expect(wrapper.html()).toEqual(correctHTML);
  });

  // SNAPSHOT TESTING TO INCASE ANYTHING CHANGES:
  it('renders correctly when no click (snapshot)', () => {
    const wrapper = renderer.create(<AddQuestion input={addQInput}/>).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
