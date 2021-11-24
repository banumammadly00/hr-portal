import React from 'react';

function EmptyData() {

    return (
        <div className="empty-data">
            <div className="empty-in flex-vertical-center">
                <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M65 113.75C91.9239 113.75 113.75 91.9239 113.75 65C113.75 38.0761 91.9239 16.25 65 16.25C38.0761 16.25 16.25 38.0761 16.25 65C16.25 91.9239 38.0761 113.75 65 113.75Z" fill="#E6E6E6" stroke="#193651" stroke-opacity="0.55" strokeWidth="8" stroke-miterlimit="10"/>
                    <path opacity="0.7" d="M93.4375 48.75L77.1875 65" stroke="#193651" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path opacity="0.7" d="M93.4375 65L77.1875 48.75" stroke="#193651" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path opacity="0.7" d="M52.8125 48.75L36.5625 65" stroke="#193651" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path opacity="0.7" d="M52.8125 65L36.5625 48.75" stroke="#193651" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path opacity="0.7" d="M65 97.5C68.3655 97.5 71.0938 94.7717 71.0938 91.4062C71.0938 88.0408 68.3655 85.3125 65 85.3125C61.6345 85.3125 58.9062 88.0408 58.9062 91.4062C58.9062 94.7717 61.6345 97.5 65 97.5Z" fill="#193651"/>
                </svg>
                <span>Hər hansı məlumat yoxdur</span>
            </div>
        </div>
    );
}

export default EmptyData
