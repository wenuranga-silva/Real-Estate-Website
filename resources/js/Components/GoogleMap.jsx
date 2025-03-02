import React from 'react';

const GoogleMap = ({ url ,className = null }) => {

    return (

        <div className={`w-full h-[360px] ${className}`}>
            <iframe
                src={url}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Google Map"
            ></iframe>
        </div>
    );
};

export default GoogleMap;
