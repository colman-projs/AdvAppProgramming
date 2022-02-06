import React from 'react';

import './Loader.scss';

function Loader() {
    return (
        <div className="ad">
            {[...Array(6)].map((_obj, idx) => (
                <section key={idx}>
                    <img className="header-img skeleton" alt="" />
                    <div className="skeleton skeleton-text"></div>
                    <div className="skeleton skeleton-text"></div>
                    <div className="skeleton skeleton-text"></div>
                </section>
            ))}
        </div>
    );
}

export default Loader;
