import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../layout/Spinner';


class Lyrics extends Component {
    state = {
        track: {},
        lyrics: {},
    };

    componentDidMount = () => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
            .then(res => {
                let str = res.data.message.body.lyrics.lyrics_body;
                this.setState({ lyrics: str });
                
                return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
            })
            .then(res => {
                this.setState({ track: res.data.message.body.track });
            } )
            .catch(err => console.log(err));
    };

    render() {
        const { track, lyrics } = this.state;
        console.log( track );
        if ( 
            track === undefined || 
            lyrics === undefined || 
            Object.keys(track).length === 0 || 
            Object.keys(lyrics).length === 0
        ) { return <Spinner /> }
        else { 
            return (
                <React.Fragment>
                    <Link to="/" className="btn btn-dark btn-sm mb-4">Back</Link>
                    <div className="card">
                        <h5 className="card-header">
                            {track.track_name} by {' '}
                            <span className="text-secondary">{ track.artist_name }</span>
                        </h5>
                        <div className="card-text m-3" >
                            { lyrics.split('\n').map(function(item, key) {
                                return (
                                    <span key={key}> {item}<br/> </span>
                                )
                                }) }
                        </div>
                        <ul className="list-group mt-3">
                            <li className="list-group-item">
                                <strong>Album</strong>: { track.album_name }
                            </li>
                            <li className="list-group-item">
                                <strong>Genre</strong>: { track.primary_genres.music_genre_list[0].music_genre.music_genre_name }
                            </li>
                            <li className="list-group-item">
                                <strong>Release</strong>: { new Date(track.updated_time).toLocaleDateString('en-EN') }
                            </li>
                        </ul>
                    </div>
                </React.Fragment>
            )
         }
    }
}


export default Lyrics;