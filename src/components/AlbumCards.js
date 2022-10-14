import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCards extends React.Component {
  render() {
    const { artistName, albumImg, collectionName, collectionId } = this.props;
    return (
      <div className="result-card">
        <img src={ albumImg } alt={ collectionName } />
        <h3>{ artistName }</h3>
        <p>{collectionName}</p>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Página do álbum
        </Link>
      </div>
    );
  }
}

AlbumCards.propTypes = {
  artistName: PropTypes.string.isRequired,
  albumImg: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};

export default AlbumCards;
