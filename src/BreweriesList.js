import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from './lib/axios';
import BreweryCard from './BreweryCard';
import './css/BreweriesList.css';

const BreweriesList = () => {
    const [breweries, setBreweries] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [hasErr, setHasErr] = useState(false);

    const observer = useRef();
    const isFirstLoad = useRef(true);

    const lastBreweryElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore && !hasErr) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    useEffect(() => {
        const fetchBreweries = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/breweries?page=${page}`);
                if (response.data.length > 0) {
                    setBreweries(prevBreweries => [...prevBreweries, ...response.data]);
                } else {
                    setHasMore(false);
                }
            } catch (error) {
                console.error('Error fetching breweries:', error);
                localStorage.removeItem('auth_token');
                localStorage.removeItem('name');
                setHasErr(true);
            }
            setLoading(false);
        };

        if (isFirstLoad.current) {
            isFirstLoad.current = false;
        } else {
            fetchBreweries();
        }
    }, [page]);

    return (
        <div className="breweries-container">
            <h1 className="breweries-title">Breweries</h1>
            <div className="breweries-list">
                {breweries.map((brewery, index) => {
                    if (breweries.length === index + 1) {
                        return <div ref={lastBreweryElementRef} key={`${brewery.id}-${index}`}><BreweryCard brewery={brewery} /></div>;
                    } else {
                        return <BreweryCard key={`${brewery.id}-${index}`} brewery={brewery} />;
                    }
                })}
                {loading && <p>Loading...</p>}
                {!hasMore && <p>No more breweries to load</p>}
                {hasErr && <p>Error fetching breweries</p>}
            </div>
        </div>
    );
};

export default BreweriesList;
