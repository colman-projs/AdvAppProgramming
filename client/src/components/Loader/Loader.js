import React from 'react';

import './Loader.scss';

function Loader() {
    return (
        <div class="ad">
            {[...Array(6)].map(() => (
                <section>
                    <img class="header-img skeleton" alt="" />
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text"></div>
                </section>
            ))}
        </div>
    );
}

export default Loader;
