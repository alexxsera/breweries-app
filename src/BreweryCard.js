// src/BreweryCard.js
import React from 'react';

const BreweryCard = ({ brewery }) => {
    return (
        <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px' }}>
            <h3>{brewery.name}</h3>
            <p>Type: {brewery.brewery_type}</p>
            <p>Address: {brewery.address_1}</p>
            {brewery.city && <p>City: {brewery.city}</p>}
            {brewery.state_province && <p>State: {brewery.state_province}</p>}
            {brewery.postal_code && <p>Postal Code: {brewery.postal_code}</p>}
            {brewery.country && <p>Country: {brewery.country}</p>}
            {brewery.phone && <p>Phone: {brewery.phone}</p>}
            {brewery.website_url && <p>Website: <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a></p>}
        </div>
    );
};

export default BreweryCard;
