import React, { useEffect, useState } from 'react';
import { PlayerStats } from '../interfaces/TeamStats';

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

const AnimatedStatCell: React.FC<{ value: string; previousValue: string | undefined }> = ({ value, previousValue }) => {
    const hasChanged = previousValue !== undefined && previousValue !== value;
    
    return (
        <td className={`text-center text-[1.5vh] ${hasChanged ? 'stat-changed' : ''}`}>
            {value}
        </td>
    );
};

export const PlayerStatsTable: React.FC<{ players: PlayerStats[], teamColor: string }> = ({ players, teamColor }) => (
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

export const MiniPlayerStatsTable: React.FC<{ players: PlayerStats[], previousPlayers?: PlayerStats[], teamColor: string }> = ({ players, previousPlayers, teamColor }) => (
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
                {players.map((player, index) => {
                    const previousPlayer = previousPlayers?.find(p => 
                        p.firstName === player.firstName && p.lastName === player.lastName
                    );
                    
                    return (
                        <tr key={index} className="h-[4vh]" 
                            style={{ backgroundColor: index % 2 === 0 ? `${teamColor}15` : `${teamColor}45` }}>
                            <td className="text-[1.5vh] truncate pl-2">{`${player.firstName} ${player.lastName}`}</td>
                            <AnimatedStatCell value={player.fieldGoalsMade} previousValue={previousPlayer?.fieldGoalsMade} />
                            <AnimatedStatCell value={player.threePointsMade} previousValue={previousPlayer?.threePointsMade} />
                            <AnimatedStatCell value={player.freeThrowsMade} previousValue={previousPlayer?.freeThrowsMade} />
                            <AnimatedStatCell value={player.totalRebounds} previousValue={previousPlayer?.totalRebounds} />
                            <AnimatedStatCell value={player.assists} previousValue={previousPlayer?.assists} />
                            <AnimatedStatCell value={player.personalFouls} previousValue={previousPlayer?.personalFouls} />
                            <AnimatedStatCell value={player.points} previousValue={previousPlayer?.points} />
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
);