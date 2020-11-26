import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import {fetchCurrentFilm, postFavoriteStatus} from "../../store/api-actions";
import {AuthorizationStatus, AppRoute, FavoriteStatus} from "../../const";

import UserBlock from "../user-block/user-block";
import MoviesList from "../movies-list/movies-list";
import MovieInfo from "../movie-info/movie-info";
import withViewType from "../../hocs/with-view-type/with-view-type";

const MAX_SIMILAR_FILMS = 4;

const MovieInfoWithViewType = withViewType(MovieInfo);

class Movie extends PureComponent {
  constructor(props) {
    super(props);
    this.getFilmId = this.getFilmId.bind(this);

    this.handleMyListButtonClick = this.handleMyListButtonClick.bind(this);
  }

  componentDidMount() {
    const {loadCurrentFilm} = this.props;
    loadCurrentFilm(this.getFilmId());
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.loadCurrentFilm(this.getFilmId());
    }
  }

  getFilmId() {
    const {match} = this.props;
    const {params: {id}} = match;
    return parseInt(id, 10);
  }

  handleMyListButtonClick() {
    const {onUnauthorizedFavoriteClick, authorizationStatus} = this.props;
    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      onUnauthorizedFavoriteClick();
    }
    const {currentFilm, changeFavoriteStatus} = this.props;
    const {isFavorite, id} = currentFilm;
    const status = isFavorite ? FavoriteStatus.DELETE : FavoriteStatus.ADD;
    changeFavoriteStatus(id, status);
  }

  render() {
    const {
      films,
      currentFilm,
      authorizationStatus,
      onPlayerButtonClick,
    } = this.props;
    const filmId = this.getFilmId();

    const similarFilms = films
      .filter((film) => {
        return (film.genre === currentFilm.genre) && (film.id !== currentFilm.id);
      })
      .slice(0, MAX_SIMILAR_FILMS);
    const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;

    return Object.keys(currentFilm).length === 0 ? null : (<React.Fragment>
      <section className="movie-card movie-card--full" style={{backgroundColor: currentFilm.backgroundColor}}>
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={currentFilm.backgroundPicture} alt={currentFilm.title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <Link to={AppRoute.MAIN} className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            {<UserBlock />}
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{currentFilm.title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{currentFilm.genre}</span>
                <span className="movie-card__year">{currentFilm.releaseDate}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button" onClick={() => onPlayerButtonClick(filmId)}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button" onClick={this.handleMyListButtonClick}>
                  {currentFilm.isFavorite
                    ? <svg viewBox="0 0 18 14" width="18" height="14">
                      <use xlinkHref="#in-list"></use>
                    </svg>
                    : <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                  }
                  <span>My list</span>
                </button>
                {isAuthorized ? <Link to={`${AppRoute.MOVIE}/${filmId}${AppRoute.REVIEW}`} className="btn movie-card__button">Add review</Link> : ``}
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={currentFilm.poster} alt={currentFilm.title} width="218" height="327" />
            </div>

            <MovieInfoWithViewType
              film={currentFilm}
              id={filmId}
            />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          {<MoviesList films={similarFilms}/>}
        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link to={AppRoute.MAIN} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>);
  }
}

Movie.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    backgroundPicture: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string,
    rate: PropTypes.number.isRequired,
    voteCount: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    runTime: PropTypes.number.isRequired,
    previewVideoSrc: PropTypes.string.isRequired,
  })).isRequired,
  currentFilm: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    genre: PropTypes.string,
    releaseDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    picture: PropTypes.string,
    poster: PropTypes.string,
    backgroundPicture: PropTypes.string,
    backgroundColor: PropTypes.string,
    rate: PropTypes.number,
    voteCount: PropTypes.number,
    director: PropTypes.string,
    starring: PropTypes.arrayOf(PropTypes.string),
    runTime: PropTypes.number,
    previewVideoSrc: PropTypes.string,
    isFavorite: PropTypes.bool,
  }),
  match: PropTypes.object.isRequired,
  loadCurrentFilm: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onPlayerButtonClick: PropTypes.func.isRequired,
  changeFavoriteStatus: PropTypes.func.isRequired,
  onUnauthorizedFavoriteClick: PropTypes.func.isRequired,
};

const mapStateToProps = ({DATA, USER}) => ({
  films: DATA.films,
  currentFilm: DATA.currentFilm,
  authorizationStatus: USER.authorizationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  loadCurrentFilm(id) {
    dispatch(fetchCurrentFilm(id));
  },
  changeFavoriteStatus(id, status) {
    dispatch(postFavoriteStatus(id, status));
  }
});

export {Movie};
export default connect(mapStateToProps, mapDispatchToProps)(Movie);
