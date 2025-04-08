import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface Game {
    id: string;
    conference: string;
    game: {
        gameID: string;
        away: {
            score: string;
            names: {
                short: string;
            };
        };
        home: {
            score: string;
            names: {
                short: string;
            };
        };
        gameState: string;
        startTime: string;
        contestClock: string;
        url: string;  // moved url inside game object
    };
}

interface GameCardProps {
    game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
    const navigate = useNavigate();

    const handleViewStats = () => {
        navigate(`/game/boxscore/${game.game.url.replace(/\D/g, '')}`);
    };

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
            <div className="text-sm font-semibold text-blue-600 mb-4 uppercase tracking-wider">
                {game.conference}
            </div>
            
            <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-800">
                            {game.game.away.names.short}
                        </span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                        {game.game.away.score}
                    </span>
                </div>
                
                <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-800">
                            {game.game.home.names.short}
                        </span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                        {game.game.home.score}
                    </span>
                </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-100">
                {game.game.gameState === 'live' ? (
                    <div className="flex items-center">
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                        <span className="text-sm font-medium text-red-600">
                            {game.game.contestClock}
                        </span>
                    </div>
                ) : (
                    <span className="text-sm text-gray-600">
                        {game.game.startTime}
                    </span>
                )}
            </div>

            <button
                onClick={handleViewStats}
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150 ease-in-out"
            >
                View Game Stats
            </button>
        </div>
    );
};

export default GameCard;