import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import LoadingElement from './LoadingElement';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isChecked: false,
    };
    this.getFavoriteMusics = this.getFavoriteMusics.bind(this);
    this.recoverFavoritesMusics = this.recoverFavoritesMusics.bind(this);
  }

  componentDidMount() {
    this.recoverFavoritesMusics();
  }

  async getFavoriteMusics({ target }) {
    this.setState({ isLoading: true });
    await addSong(target.id);
    this.setState({
      isLoading: false,
      isChecked: true,
    });
  }

  recoverFavoritesMusics() {
    const { trackId } = this.props;
    getFavoriteSongs().then((reponse) => {
      if (reponse.some((music) => music.trackId === trackId)) {
        this.setState({ isChecked: true });
      }
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isChecked, isLoading } = this.state;
    const card = (
      <div className="music-card">
        <h2>{ trackName }</h2>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>
            audio
          </code>
          .
        </audio>
        <label htmlFor={ trackId } className="favorite-music">
          Favorita
          <input
            className="checkbox-input"
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id={ trackId }
            checked={ isChecked }
            onChange={ this.getFavoriteMusics }
          />
        </label>
      </div>
    );
    return (
      <div>
        { isLoading ? <LoadingElement /> : card }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
