import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import {AppRoute} from "../../const";

const SmallMovieCard = (props) => {
  const {film, renderPlayer} = props;
  const {title, previewVideoSrc, picture, id} = film;

  return (
    <article className="small-movie-card catalog__movies-card">
      <Link to={`${AppRoute.MOVIE}/${id}`} className="small-movie-card__link">
        {renderPlayer(previewVideoSrc, picture)}
        <h3 className="small-movie-card__title">
          <a href="#" className="small-movie-card__link">{title}</a>
        </h3>
      </Link>
    </article>
  );
};

SmallMovieCard.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    previewVideoSrc: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  renderPlayer: PropTypes.func.isRequired,
};

export default SmallMovieCard;
