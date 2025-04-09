export interface GameStatsProps {
    gameId: string;
}

export interface BoxscoreTeam {
    homeTeam: string;
    id: string;
    seoName: string;
    sixCharAbbr: string;
    shortName: string;
    nickName: string;
    color: string;
}

export interface BoxscoreMeta {
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

export interface BoxscoreData {
    inputMD5Sum: string;
    updatedTimestamp: string;
    meta: BoxscoreMeta;
    teams: TeamPlayerStats[];
}

export interface TeamInfo {
    id: string;
    homeTeam: boolean;
    color: string;
    seoname: string;
    shortName: string;
    sixCharAbbr: string;
    nickName: string;
}
export interface TeamStats {
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

export interface TeamPlayerStats {
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

export interface PlayerStats {
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