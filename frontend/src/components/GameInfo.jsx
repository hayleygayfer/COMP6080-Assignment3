import React from 'react';
import PropTypes from 'prop-types';
function GameInfo (props) {
  return <>
  Title: {props.title}<br/>
  Thumbnail: {props.thumbnail ? <img src={props.thumbnail} alt={'Thumbnail for game: ' + props.title}> </img> : 'none provided' } <br/>
  </>
}
export default GameInfo;
GameInfo.propTypes = {
  title: PropTypes.string, // gameData[i].name
  thumbnail: PropTypes.string // gameData[i].thumbnail
};
