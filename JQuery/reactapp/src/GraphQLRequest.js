import React, { useEffect, useState } from 'react';

const GraphQLRequest = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const query = `
            query {
                user(id: "3") {
                    name
                    email
                    penisLaenge
                    friends {
                        name
                    }
                }
            }`;

        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: query })
        })
        .then(response => response.json())
        .then(data => {
            setUserData(data.data.user);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setError(error.toString());
        });
    }, []);

    const displayUserData = () => {
        if (error) {
            return <p>Error: {error}</p>;
        }

        if (!userData) {
            return <p>Loading...</p>;
        }

        return (
            <>
                <h1>{userData.name}</h1>
                <p>Email: {userData.email}</p>
                <p>Penislänge: {userData.penisLaenge}</p>
                <h2>Friends:</h2>
                <ul>
                    {userData.friends.map(friend => (
                        <li key={friend.name}>{friend.name}</li>
                    ))}
                </ul>
            </>
        );
    };

    return (
        <div id="user-data">
            {displayUserData()}
        </div>
    );
};

export default GraphQLRequest;
