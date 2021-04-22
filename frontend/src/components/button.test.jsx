import { shallow } from 'enzyme';
import * as React from 'react';
import Button from './Button'
import renderer from 'react-test-renderer';

describe('AddQuestion', () => {
  // const mockCallBack = jest.fn();
  const noop = () => {};

  it('triggers onClick event handler when clicked', () => {
    const onClick = jest.fn();
    //create buttpm. 'click' on it, check if it was clicked
    const button = shallow(<Button text='Login' onClickFunction={onClick}/>);
    button.simulate('click')
    expect(onClick).toBeCalledTimes(1);
  });

  it('uses given text through props', () => {
    const customText = 'custom text';
    const button = shallow(<Button text={customText} onClickFunction={noop}/>);
    expect(button.text()).toBe(customText) //check if text matches
  })

  // SNAPSHOT TESTING....
  it('uses given text through props', () => {
    const customText = 'custom text';
    const button = renderer.create(<Button text={customText} onClickFunction={noop}/>).toJSON();
    expect(button).toMatchSnapshot();
  })

});
