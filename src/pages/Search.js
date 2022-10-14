import React from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import LoadingElement from '../components/LoadingElement';
import AlbumCards from '../components/AlbumCards';
import './Search_css/search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      inputArtistName: '',
      isSearchButtonDisabled: true,
      isLoading: false,
      responseAPI: [],
      returnArtistName: '',
      isButtonClicked: false,
    };
    this.setInputArtistName = this.setInputArtistName.bind(this);
    this.onButtonSearch = this.onButtonSearch.bind(this);
    this.SearchArtist = this.SearchArtist.bind(this);
  }

  onButtonSearch(event) {
    event.preventDefault();
    this.SearchArtist();
  }

  setInputArtistName({ target }) {
    const { value } = target;
    const tamMin = 2;
    this.setState({
      inputArtistName: value, isSearchButtonDisabled: value.length < tamMin,
    });
  }

  async SearchArtist() {
    const { inputArtistName } = this.state;
    this.setState({
      inputArtistName: '',
      isLoading: true,
      returnArtistName: inputArtistName,
      isButtonClicked: true,
      isSearchButtonDisabled: true,
    });
    searchAlbumsAPI(inputArtistName).then((response) => {
      this.setState({ isLoading: false, responseAPI: [...response] });
    });
  }

  render() {
    const {
      inputArtistName,
      isSearchButtonDisabled,
      isLoading,
      returnArtistName,
      isButtonClicked,
      responseAPI,
    } = this.state;
    return (
      <div data-testid="page-search" className="main-div">
        {isLoading ? <LoadingElement /> : (
          <div className="div-search">
            <form className="form-div">
              <label htmlFor="search-artist">
                Pesquise por artista
                <input
                  className="input-search"
                  data-testid="search-artist-input"
                  type="text"
                  value={ inputArtistName }
                  onChange={ this.setInputArtistName }
                />
              </label>
              <label htmlFor="search-artist-button">
                <input
                  className="search-btn"
                  data-testid="search-artist-button"
                  type="submit"
                  value="Pesquisar"
                  disabled={ isSearchButtonDisabled }
                  onClick={ this.onButtonSearch }
                />
              </label>
            </form>
            {isButtonClicked && (responseAPI.length ? (
              <div>
                <h1>{`Resultado de álbuns de : ${returnArtistName}`}</h1>
                {responseAPI.map((album) => (<AlbumCards
                  key={ album.collectionId }
                  collectionId={ album.collectionId }
                  artistName={ album.artistName }
                  albumImg={ album.artworkUrl100 }
                  collectionName={ album.collectionName }
                />))}
              </div>
            ) : (<p>Nenhum álbum foi encontrado</p>)
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
