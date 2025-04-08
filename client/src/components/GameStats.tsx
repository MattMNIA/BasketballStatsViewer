import React, { useEffect, useState } from 'react';

interface GameStatsProps {
    gameId: string;
}

interface BoxscoreTeam {
    homeTeam: string;
    id: string;
    seoName: string;
    sixCharAbbr: string;
    shortName: string;
    nickName: string;
    color: string;
}

interface BoxscoreMeta {
    title: string;
    description: string;
    sport: string;
    division: string;
    gametype: string;
    status: string;
    period: string;
    minutes: string;
    seconds: string;
    teams: BoxscoreTeam[];
}

interface BoxscoreData {
    inputMD5Sum: string;
    updatedTimestamp: string;
    meta: BoxscoreMeta;
    teams: TeamPlayerStats[];
}

interface TeamInfo {
    id: string;
    homeTeam: boolean;
    color: string;
    seoname: string;
    shortName: string;
    sixCharAbbr: string;
    nickName: string;
}
interface TeamStats {
    points: string;
    fieldGoalsAttempted: string;
    fieldGoalsMade: string;
    fieldGoalPercentage: string;
    threePointAttempted: string;
    threePointMade: string;
    threePointPercentage: string;
    freeThrowsAttempted: string;
    freeThrowsMade: string;
    freeThrowPercentage: string;
    rebounds: string;
    assists: string;
    steals: string;
    blocks: string;
    turnovers: string;
}

interface TeamPlayerStats {
    teamId: number;
    playerHeader: {
        position: string;
        minutesPlayed: string;
        fieldGoalsMade: string;
        threePointsMade: string;
        freeThrowsMade: string;
        totalRebounds: string;
        offensiveRebounds: string;
        assists: string;
        personalFouls: string;
        steals: string;
        turnovers: string;
        blockedShots: string;
        points: string;
    };
    playerStats: PlayerStats[];
}

interface PlayerStats {
    firstName: string;
    lastName: string;
    position: string;
    minutesPlayed: string;
    fieldGoalsMade: string;
    threePointsMade: string;
    freeThrowsMade: string;
    totalRebounds: string;
    offensiveRebounds: string;
    assists: string;
    personalFouls: string;
    steals: string;
    turnovers: string;
    blockedShots: string;
    points: string;
}

const columnWidths = {
    name: '20%',
    pos: '5%',
    min: '6%',
    fg: '7%',
    pt3: '7%',
    ft: '7%',
    reb: '7%',
    ast: '7%',
    stl: '7%',
    blk: '7%',
    to: '7%',
    pf: '6%',
    pts: '7%',
};

const PlayerStatsTable: React.FC<{ players: PlayerStats[], teamColor: string }> = ({ players, teamColor }) => (
    <div className="h-full">
        <table className="w-full h-full table-fixed">
            <thead>
                <tr style={{ backgroundColor: teamColor }}>
                    <th style={{ width: columnWidths.name }} className="text-white text-[1.5vh]">Name</th>
                    <th style={{ width: columnWidths.pos }} className="text-white text-[1.5vh]">Pos</th>
                    <th style={{ width: columnWidths.min }} className="text-white text-[1.5vh]">MIN</th>
                    <th style={{ width: columnWidths.fg }} className="text-white text-[1.5vh]">FG</th>
                    <th style={{ width: columnWidths.pt3 }} className="text-white text-[1.5vh]">3PT</th>
                    <th style={{ width: columnWidths.ft }} className="text-white text-[1.5vh]">FT</th>
                    <th style={{ width: columnWidths.reb }} className="text-white text-[1.5vh]">REB</th>
                    <th style={{ width: columnWidths.ast }} className="text-white text-[1.5vh]">AST</th>
                    <th style={{ width: columnWidths.stl }} className="text-white text-[1.5vh]">STL</th>
                    <th style={{ width: columnWidths.blk }} className="text-white text-[1.5vh]">BLK</th>
                    <th style={{ width: columnWidths.to }} className="text-white text-[1.5vh]">TO</th>
                    <th style={{ width: columnWidths.pf }} className="text-white text-[1.5vh]">PF</th>
                    <th style={{ width: columnWidths.pts }} className="text-white text-[1.5vh]">PTS</th>
                </tr>
            </thead>
            <tbody>
                {players.map((player, index) => (
                    <tr key={index} className="h-[4vh]" 
                        style={{ backgroundColor: index % 2 === 0 ? `${teamColor}15` : `${teamColor}45` }}>
                        <td className="text-[1.5vh] truncate pl-2">{`${player.firstName} ${player.lastName}`}</td>
                        <td className="text-center text-[1.5vh]">{player.position}</td>
                        <td className="text-center text-[1.5vh]">{player.minutesPlayed}</td>
                        <td className="text-center text-[1.5vh]">{player.fieldGoalsMade}</td>
                        <td className="text-center text-[1.5vh]">{player.threePointsMade}</td>
                        <td className="text-center text-[1.5vh]">{player.freeThrowsMade}</td>
                        <td className="text-center text-[1.5vh]">{player.totalRebounds}</td>
                        <td className="text-center text-[1.5vh]">{player.assists}</td>
                        <td className="text-center text-[1.5vh]">{player.steals}</td>
                        <td className="text-center text-[1.5vh]">{player.blockedShots}</td>
                        <td className="text-center text-[1.5vh]">{player.turnovers}</td>
                        <td className="text-center text-[1.5vh]">{player.personalFouls}</td>
                        <td className="text-center text-[1.5vh]">{player.points}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const MiniPlayerStatsTable: React.FC<{ players: PlayerStats[], teamColor: string }> = ({ players, teamColor }) => (
    <div className="h-full">
        <table className="w-full h-full table-fixed">
            <thead>
                <tr style={{ backgroundColor: teamColor }}>
                    <th style={{ width: columnWidths.name }} className="text-white text-[1.5vh]">Name</th>
                    <th style={{ width: columnWidths.fg }} className="text-white text-[1.5vh]">FG</th>
                    <th style={{ width: columnWidths.pt3 }} className="text-white text-[1.5vh]">3PT</th>
                    <th style={{ width: columnWidths.ft }} className="text-white text-[1.5vh]">FT</th>
                    <th style={{ width: columnWidths.reb }} className="text-white text-[1.5vh]">REB</th>
                    <th style={{ width: columnWidths.ast }} className="text-white text-[1.5vh]">AST</th>
                    <th style={{ width: columnWidths.pf }} className="text-white text-[1.5vh]">PF</th>
                    <th style={{ width: columnWidths.pts }} className="text-white text-[1.5vh]">PTS</th>
                </tr>
            </thead>
            <tbody>
                {players.map((player, index) => (
                    <tr key={index} className="h-[4vh]" 
                        style={{ backgroundColor: index % 2 === 0 ? `${teamColor}15` : `${teamColor}45` }}>
                        <td className="text-[1.5vh] truncate pl-2">{`${player.firstName} ${player.lastName}`}</td>
                        <td className="text-center text-[1.5vh]">{player.fieldGoalsMade}</td>
                        <td className="text-center text-[1.5vh]">{player.threePointsMade}</td>
                        <td className="text-center text-[1.5vh]">{player.freeThrowsMade}</td>
                        <td className="text-center text-[1.5vh]">{player.totalRebounds}</td>
                        <td className="text-center text-[1.5vh]">{player.assists}</td>
                        <td className="text-center text-[1.5vh]">{player.personalFouls}</td>
                        <td className="text-center text-[1.5vh]">{player.points}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const GameStats: React.FC<GameStatsProps> = ({ gameId }) => {
    const [stats, setStats] = useState<BoxscoreData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/stats/game/${gameId}/boxscore`);
                const data = await response.json();
                setStats(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load game stats');
                setLoading(false);
            }
        };

        fetchStats();
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
