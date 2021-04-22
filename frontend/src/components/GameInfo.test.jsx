import { shallow } from 'enzyme';
import * as React from 'react';
import GameInfo from './GameInfo'
import renderer from 'react-test-renderer';

describe('GameInfo', () => {  
  // const mockCallBack = jest.fn();

  it('uses custom title', () => {
    const customTitle = 'RATTLEBONE\'S GAME';
    const gameInfo = shallow(<GameInfo title={customTitle} thumbnail={null}/>)
    expect(gameInfo.text()).toBe('Title: RATTLEBONE\'S GAMEThumbnail: none provided ') // check if text matches
  })

  it('uses custom image src', () => {
    const customImage = 'https://i.pinimg.com/236x/5c/d2/c8/5cd2c8ccbce5f05e3a1023d94b7ee732.jpg';
    const gameInfo = shallow(<GameInfo thumbnail={customImage}/>)
    expect(gameInfo.find('img').prop('src')).toEqual(customImage);
  })

  it('handles no thumbnail', () => {
    const gameInfo = shallow(<GameInfo thumbnail={null}/>)
    expect(gameInfo.text()).toBe('Title: Thumbnail: none provided ') // check if text matches
    // expect(button.text()).toBe(customText) // check if text matches
  })

  // SNAPSHOT TESTING....
  it('uses custom title (snapshot)', () => {
    const customTitle = 'RATTLEBONE\'S GAME';
    const gameInfo = renderer.create(<GameInfo title={customTitle} thumbnail={null}/>);
    expect(gameInfo).toMatchSnapshot();
  })

  it('uses custom image src (snapshot)', () => {
    const customImage = 'https://i.pinimg.com/236x/5c/d2/c8/5cd2c8ccbce5f05e3a1023d94b7ee732.jpg';
    const gameInfo = renderer.create(<GameInfo thumbnail={customImage}/>)
    expect(gameInfo).toMatchSnapshot();
  })

  it('handles no thumbnail (snapshot)', () => {
    const gameInfo = renderer.create(<GameInfo thumbnail={null}/>)
    expect(gameInfo).toMatchSnapshot();
  })
});
