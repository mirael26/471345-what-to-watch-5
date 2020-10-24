import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card";
import withVideoPlayer from "../../hocs/with-video-player/with-video-player";

const SmallMovieCardWrapped = withVideoPlayer(SmallMovieCard);

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

  }

  render() {
    const {films} = this.props;

    return (
      <div className="catalog__movies-list">
        {
          films.map((film, i) =>
            <SmallMovieCardWrapped
              key={`${i}-${film.title}`}
              film={film}
            />
          )
        }
      </div>
    );
  }
}

MoviesList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    backgroundPicture: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired,
    voteCount: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    runTime: PropTypes.number.isRequired,
    videoSrc: PropTypes.string.isRequired,
  })).isRequired,
};

export default MoviesList;
