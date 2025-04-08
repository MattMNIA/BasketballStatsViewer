import React, { FC, useState, useEffect } from 'react';
import GameCard, {Game} from '../components/GameCard';


const SearchGames: FC = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const filteredGames = games.filter(game => {
        const searchTermLower = searchTerm.toLowerCase();
        const homeTeam = game.game.home.names.short.toLowerCase();
        const awayTeam = game.game.away.names.short.toLowerCase();
        
        return homeTeam.includes(searchTermLower) || awayTeam.includes(searchTermLower);
      });

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        
        // Get current date in YYYY/MM/DD format
        const today = new Date();
        // const year = today.getFullYear();
        // const month = String(today.getMonth() + 1).padStart(2, '0');
        // const day = String(today.getDate()).padStart(2, '0');
        const year = "2025";
        const month = "04";
        const day = "07"
        
        // const url = `https://data.ncaa.com/casablanca/scoreboard/basketball-men/d1/${year}/${month}/${day}/scoreboard.json`;
        // const url = `https://data.ncaa.com/casablanca/scoreboard/basketball-men/d1/2025/04/07/scoreboard.json`;
        const url = `http://localhost:3001/api/games/mens/test`

        const response = await fetch(url,{
            method: "GET",
            headers: {
              "access-control-allow-origin" : "*",
              "Content-type": "application/json; charset=UTF-8"
            }});
        
        if (!response.ok) {
          throw new Error(`Failed to fetch games: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setGames(data.games || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching games:', err);
        setError('Failed to load games. Please try again later.');
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);
    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 text-center mb-8 ">
                    NCAA Men's Basketball Games Today
                </h1>
                
                <div className="max-w-xl mx-auto mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for a team..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out shadow-sm"
                        />
                    </div>
                </div>

                {loading && (
                    <div className="flex justify-center">
                        <p className="text-gray-600">Loading games...</p>
                    </div>
                )}

                {error && (
                    <div className="max-w-xl mx-auto">
                        <p className="text-red-600 text-center bg-red-100 p-4 rounded-lg">
                            {error}
                        </p>
                    </div>
                )}

                {!loading && !error && filteredGames.length === 0 && (
                    <div className="flex justify-center">
                        <p className="text-gray-600">No games found.</p>
                    </div>
                )}

                {filteredGames.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredGames.map((game) => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchGames;