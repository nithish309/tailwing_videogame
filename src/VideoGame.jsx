import "./VideoGame.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Error from "./Error";
import Loadingspinner from "./Loadingspinner";

const VideoGame = () => {
  const [gameTitle, setGameTitle] = useState("");
  const [searchedGame, setSearchedGame] = useState([]);
  const [gameDeals, setGameDeals] = useState([]);
  const [id, setId] = useState(1);
  const [dis, setDis] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchGame = () => {
    setLoading(true);
    setDis(true); // Disable the button when loading
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchedGame(data); // Update the game data
        setLoading(false); // Set loading to false after fetch
        setError(null); // Clear error if successful
      })
      .catch((error) => {
        setError(error); // Set error if fetching fails
        setLoading(false); // Stop loading in case of error
      });
  };

  useEffect(() => {
    fetch(`https://www.cheapshark.com/api/1.0/deals?storeID=${id}`)
      .then((response) => response.json())
      .then((data) => setGameDeals(data));
  }, [id]);

  return (
    <>
      <div className="overflow-x-auto App">
        <div className="flex items-start justify-center gap-4 mb-10 mt-5 searchSection">
          <input
            className="input input-bordered join-item"
            onChange={(e) => setGameTitle(e.target.value)}
            type="text"
            placeholder="Grand Theft Auto..."
          />
          <button
            onClick={searchGame}
            className="btn join-item rounded-r-full"
            disabled={dis}
          >
            Search game
          </button>
          <br />
        </div>
        {error && <Error />}
        {loading && <Loadingspinner />}

        {!loading && !error && (
          <table className="table">
            {dis && (
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Game ID</th>
                  <th>Cheapest Price</th>
                  <th></th>
                </tr>
              </thead>
            )}
            <tbody>
              {searchedGame.map((game) => (
                <tr key={game.gameID}>
                  <th>
                    <input type="checkbox" className="checkbox" />
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={game.thumb} alt={game.external} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{game.external}</div>
                      </div>
                    </div>
                  </td>
                  <td>{game.gameID}</td>
                  <td>{game.cheapest}$</td>
                  <td>
                    {/* <Link to="/details">
                      <button className="btn btn-ghost btn-xs">Details</button>
                    </Link> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="dealsSection">
        <center>
          <h2>Latest Deals</h2>
        </center>
        {gameDeals.map((deal) => (
          <div className="game" id="deals" key={deal.gameID}>
            <h2>{deal.title}</h2>
            <img src={deal.thumb} alt={deal.title} />
            <h3 style={{ color: "red" }}>
              Meta critic score: {deal.metacriticScore}
            </h3>
            <p>Normal Pricing: {deal.normalPrice}$</p>
            <p>Sale Price: {deal.salePrice}$</p>
            <p>Savings: {deal.savings.substr(0, 2)}%</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default VideoGame;
