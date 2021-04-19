import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import GoogleLogin from "react-google-login";

function App() {
    const [token, setToken] = useState("");
    const [books, setBooks] = useState([]);

    const onResponse = (response) => {
        console.log(response);
        setToken(response.tokenId);
    };

    const fetchDataFromApi = async () => {
        const result = await fetch("https://library-api20210419111151.azurewebsites.net/api/books", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await result.json();

        setBooks(data);
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                <GoogleLogin
                    clientId={
                        "935364814037-vc5cj146voc1f14jsqh5tgeqciorq324.apps.googleusercontent.com"
                    }
                    onSuccess={onResponse}
                ></GoogleLogin>
                {token && (
                    <button onClick={fetchDataFromApi}>Hämta data</button>
                )}
                {books.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>ISBN</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book, i) => (
                                <tr key={i}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.isbn}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </header>
        </div>
    );
}

export default App;
