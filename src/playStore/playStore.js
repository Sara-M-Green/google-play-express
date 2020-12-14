import React from 'react';
import './playStore.css'

export default function PlayStore(props){
    return (
        <div className="App">
            <h2>{props.App}</h2>
            <div className="app_Category">
                Category: { props.Category }
            </div>
            <div className="app_Rating">
                Rating: { props.Rating }
            </div>
            <div className="app_Genres">
                Genre: { props.Genres }
            </div>
            <div className="app_Type">
                App Type: { props.Type }
            </div>
        </div>
    );
}