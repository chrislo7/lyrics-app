import React from "react";
import { Link } from "react-router-dom";

const Track = props => {
  const { track } = props;
  return (
    <div className="col-md-6">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <p className="card-text">
            <strong>{track.track_name}</strong>
            <br />
            <i className="fas fa-compact-disc" /> {track.album_name}
            <br />
            <i className="fas fa-user" /> {track.artist_name}
          </p>
          <Link className="btn btn-dark btn-block" to={`lyrics/track/${ track.track_id }`}>
            <i className="fas fa-chevron-right"></i> View Lyrics
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Track;
