import React, { useEffect, useState } from 'react';
import { GameStatsProps, BoxscoreData } from '../interfaces/TeamStats';
import { MiniPlayerStatsTable } from './StatsTables';







const GameStats: React.FC<GameStatsProps> = ({ gameId }) => {
    const [stats, setStats] = useState<BoxscoreData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);


    useEffect(() => {
        const fetchStats = async () => {
            try {
                const baseUrl = process.env.REACT_APP_ENV === 'dev' 
                    ? process.env.REACT_APP_API_URL 
                    : '';
                console.log(process.env.REACT_APP_API_URL)
                console.log(baseUrl)
                const response = await fetch(`${baseUrl}/api/stats/game/${gameId}/boxscore`);

                if (!response.ok) {
                    throw new Error(`API error: ${response.status}`);
                }
                const data = await response.json();
                setStats(data);
                setLastUpdate(new Date());
                setLoading(false);
                setError(null); // Clear any previous errors

            } catch (err) {
                console.error("Failed to fetch stats:", err);
                // Only set error if we don't have any stats yet
                if (!stats) {
                    setError('Failed to load game stats');
                    setLoading(false);
                }
            }
        };

        fetchStats();
        
        // Set up interval for live updates
        const intervalId = setInterval(fetchStats, 1000);
        
        // Cleanup on unmount
        return () => clearInterval(intervalId);
    }, [gameId]);

    if (loading) return <div className="text-center py-4">Loading stats...</div>;
    if (error) return <div className="text-red-500 text-center py-4">{error}</div>;
    if (!stats) return <div className="text-center py-4">No stats available</div>;

    const homeTeam = stats.meta.teams.find(team => team.homeTeam === "true");
    const awayTeam = stats.meta.teams.find(team => team.homeTeam === "false");
    const homeStats = stats.teams.find(team => team.teamId.toString() === homeTeam?.id);
    const awayStats = stats.teams.find(team => team.teamId.toString() === awayTeam?.id);

    return (
        <div className="h-screen grid grid-rows-[1fr_1fr]">
            {homeStats && (
                <div className="w-full h-full">
                    <MiniPlayerStatsTable 
                        players={homeStats.playerStats} 
                        teamColor={homeTeam?.color || '#000000'} 
                    />
                </div>
            )}
            
            {awayStats && (
                <div className="w-full h-full">
                    <MiniPlayerStatsTable 
                        players={awayStats.playerStats} 
                        teamColor={awayTeam?.color || '#000000'} 
                    />
                </div>
            )}
        </div>
    );
};

export default GameStats;
