import "./App.css";
import Login from "./Login.js";
import { useState } from "react";

function App() {
    const [token, setToken] = useState("");
    const [books, setBooks] = useState([]);

    const fetchDataFromApi = async () => {
        const result = await fetch(process.env.REACT_APP_API_URL + "books", {
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
                <p>
                    This is the{" "}
                    <span className="emphasis">{process.env.NODE_ENV}</span>{" "}
                    environment
                </p>
                <Login onLogin={(token) => setToken(token)}></Login>

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
