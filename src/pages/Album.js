import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import LoadingElement from '../components/LoadingElement';
import './Album_css/album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedArtistName: '',
      selectedAlbumName: '',
      isLoading: false,
      musicList: [],
    };
    this.callMusics = this.callMusics.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.callMusics(id);
  }

  async callMusics(id) {
    this.setState({ isLoading: true });
    getMusics(id).then((response) => {
      this.setState({
        isLoading: false,
        musicList: response
          .filter((musics, index) => index !== 0 && musics),
        selectedArtistName: response[0].artistName,
        selectedAlbumName: response[0].collectionName,
      });
    });
  }

  render() {
    const {
      selectedArtistName,
      selectedAlbumName,
      musicList,
      isLoading,
    } = this.state;
    return (
      <div data-testid="page-album" className="div-album">
        <Header />
        {isLoading && <LoadingElement />}
        <h2 data-testid="artist-name" className="artist-name">{ selectedArtistName }</h2>
        <h3 data-testid="album-name" className="album-name">{ selectedAlbumName }</h3>
        <div className="music-info">
          {musicList.filter((music) => music.trackId).map((music) => (
            <MusicCard
              key={ music.collectionId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              trackId={ music.trackId }
            />
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
