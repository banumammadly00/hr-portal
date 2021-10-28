import React from 'react';
import Spinner from 'react-bootstrap/Spinner'

function Loading() {

    return (
        <div className="loading-block">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
}

export default Loading
