import React, { useState, useEffect } from 'react';

export default function StartupNews() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStartupNews = async () => {
            // Your personal API Key from NewsAPI.org
            const API_KEY = '97d04a073771464c858e9878c4ba81a2';

            // Constructing the search query for relevant topics
            const keywords = [
                // --- Core Funding Terms ---
                '"startup funding"',
                '"seed round"',
                '"venture capital"',
                '"angel investor"',
                '"pre-seed funding"',
                '"series a funding"',
                '"capital raise"',
            
                // --- Incubators & Accelerators ---
                '"accelerator program"',
                '"incubation program"',
                '"startup incubator"',
                '"demo day"',
                '"venture builder"',
            
                // --- Young Founder Focus ---
                '"student entrepreneur"',
                '"young founder"',
                '"teen entrepreneur"',
                '"high school startup"',
            
                // --- General Startup & Tech ---
                '"pitch competition"',
                '"startup ecosystem"',
                '"tech startup"',
                'bootstrapping',
                'unicorn', // A startup valued at over $1 billion
            
            ];
            
            // This part of your code remains the same
            const queryString = keywords.join(' OR ');
            const query = encodeURIComponent(queryString);

            // The API endpoint URL
            const url = `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setArticles(data.articles);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStartupNews();
    }, []); // The empty array ensures this effect runs only once on component mount

    if (loading) return <div className="text-center p-10">Loading news...</div>;
    if (error) return <div className="text-center p-10 text-red-500">Error fetching news: {error}</div>;

    return (
        <div className="bg-gray-100 p-8">
            <h1 className="text-4xl font-bold text-center mb-8">Startup & Founder News</h1>
            <div className="max-w-4xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {articles.length > 0 ? (
                    articles.map((article, index) => (
                        <a 
                            key={index} 
                            href={article.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
                        >
                            <img src={article.urlToImage || 'https://placehold.co/600x400/2d3748/ffffff?text=News'} alt={article.title} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
                                <p className="text-sm text-gray-600">{article.source.name}</p>
                            </div>
                        </a>
                    ))
                ) : (
                    <p className="col-span-full text-center">No articles found for your query.</p>
                )}
            </div>
        </div>
    );
}