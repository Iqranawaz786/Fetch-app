import { useState, useEffect } from "react";

function API() {
    const [data, setData] = useState(null);
    const [animal, setAnimal] = useState("cat"); // Default animal type

    const baseUrl = "https://cat-fact.herokuapp.com/facts/random";

    // Fetch data when the component mounts or when `animal` changes
    useEffect(() => {
        fetchData();
    }, [animal]);

    // Function to fetch data
    const fetchData = () => {
        fetch(`${baseUrl}?animal_type=${animal}&amount=10`)
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error(error));
    };

    // Function to render fetched data
    const renderData = (data) => {
        return data.map((d, index) => (
            <p key={index}>{d.text}</p>
        ));
    };

    // Component JSX
    return (
        <div>
            <h1>Animal Facts</h1>
            <select onChange={(e) => setAnimal(e.target.value)}>
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
                <option value="horse">Horse</option>
            </select>
            <button onClick={fetchData}>Get Facts</button>
            <br />
            {data ? renderData(data) : 'Loading...'}
        </div>
    );
}

export default API;
