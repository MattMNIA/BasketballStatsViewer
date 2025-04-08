import React from 'react';
import { useParams } from 'react-router-dom';
import GameStats from '../components/GameStats';

const BoxScorePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) return <div>Game not found</div>;

    return (
        <div className="h-screen w-screen overflow-hidden">
            <GameStats gameId={id} />
        </div>
    );
};

export default BoxScorePage;