import React from 'react';
import { useParams } from 'react-router-dom';
import GameStats from '../components/GameStats';

const GameStatsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) return <div>Game not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Game Statistics</h1>
                <GameStats gameId={id} />
            </div>
        </div>
    );
};

export default GameStatsPage;
