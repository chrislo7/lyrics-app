import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../layout/Spinner';


class Lyrics extends Component {
    state = {
        track: {},
        lyrics: {},
        album: {},
        locale: { year: 'numeric', month: 'long', day: 'numeric' }
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

                return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/album.get?album_id=${this.state.track.album_id}&apikey=${process.env.REACT_APP_MM_KEY}`)
            } )
            .then(res => {
                this.setState({ album: res.data.message.body.album })
            })
            .catch(err => console.log(err));
    };

    render() {
        const { track, lyrics, album, locale } = this.state;
        console.log( album );
        if ( 
            track === undefined || 
            lyrics === undefined || 
            Object.keys(track).length === 0 || 
            Object.keys(lyrics).length === 0
        ) { return <Spinner /> }
        else { 
            return (
                <React.Fragment>
                    <div className="card">
                        <h5 className="card-header">
                            { track.track_name } <br/>
                            <span className="text-secondary">{ track.artist_name }</span>
                        </h5>
                        <div className="card-text m-3 d-block" >
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
                                <strong>Release</strong>: { new Date(album.album_release_date).toLocaleDateString('en-EN', locale) }
                            </li>
                        </ul>
                    </div>
                </React.Fragment>
            )
         }
    }
}


export default Lyrics;