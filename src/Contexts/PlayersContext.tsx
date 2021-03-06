import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export const PlayersContext = createContext({} as ContextProps);

import EmptyPlayer from '@utils/EmptyPlayer.json';

type ChildrenProps = {
    children: ReactNode;
};

type PlayerProps = {
    name: string;
    color: ColorProps;
    match: PlayerMatchProps;
};

type ColorProps = {
    hex: string;
    name: string;
};

type PlayerMatchProps = {
    matches: number;
    wins: number;
    defeats: number;
    ties: number;
    score: number;
};

type EditingPlayerProps = {
    player: PlayerProps;
    key: number;
};

type ShowWinrateProps = {
    wins: number;
    matches: number;
};

type PlayerActionMessagesProps = {
    action: string;
    user?: string;
}

type ContextProps = {
    players: PlayerProps[];
    defaultPlayers: PlayerProps[];
    playersName: string[];
    playerActionMessage: PlayerActionMessagesProps;
    selectedPlayer: number;
    selectedPlayerForEditing: EditingPlayerProps;
    isEditingAPlayer: boolean;

    changePlayerActionMessage(value: PlayerActionMessagesProps): void;
    changeIsEditingAPlayer(value: boolean): void;
    changeSelectedPlayer(key: number): void;
    addNewPlayer(newPlayer: PlayerProps): void;
    updateSelectedPlayerForEditing(key: number): void;
    editPlayer(player: PlayerProps): void;
    deletePlayer(key: number): void;
    resetPlayerStats(key: number): void;

    ShowWinrate({ wins, matches }: ShowWinrateProps): JSX.Element;
};

export function PlayersContextProvider({ children }: ChildrenProps) {
    const [players, setPlayers] = useState([
        {
            name: 'Diounata',
            color: {
                hex: '#fff',
                name: 'White',
            },
            match: {
                matches: 0,
                wins: 0,
                defeats: 0,
                ties: 0,
                score: 0,
            },
        },
    ]);

    const [defaultPlayers, setDefaultPlayers] = useState([
        {
            name: 'Player X',
            color: {
                hex: '#04dac2',
                name: 'Blue',
            },
            match: {
                matches: 0,
                wins: 0,
                defeats: 0,
                ties: 0,
                score: 0,
            },
        },

        {
            name: 'Player O',
            color: {
                hex: '#bb86fc',
                name: 'Purple',
            },
            match: {
                matches: 0,
                wins: 0,
                defeats: 0,
                ties: 0,
                score: 0,
            },
        },
    ]);

    const [playersName, setPlayersName] = useState({} as string[]);
    const [playerActionMessage, setPlayerActionMessage] = useState({} as PlayerActionMessagesProps);
    const [selectedPlayer, setSelectedPlayer] = useState<number>();
    const [selectedPlayerForEditing, setSelectedPlayerForEditing] = useState<EditingPlayerProps>(EmptyPlayer[0]);
    const [isEditingAPlayer, setIsEditingAPlayer] = useState(false);

    function changePlayerActionMessage(value: PlayerActionMessagesProps) {
        setPlayerActionMessage(value);
    }

    function changeIsEditingAPlayer(value: boolean): void {
        setIsEditingAPlayer(value);
    }

    function changeSelectedPlayer(key: number): void {
        setSelectedPlayer(key);
    }

    function updateSelectedPlayerForEditing(key: number): void {
        const editingPlayer = players.filter((p, index) => index === key);

        setSelectedPlayerForEditing({ player: editingPlayer[0], key });
    }

    function addNewPlayer(newPlayer: PlayerProps): void {
        const newPlayers = [...players, newPlayer];

        setPlayers(newPlayers);
        changePlayerActionMessage({ action: 'add', user: newPlayer.name });
    }

    function editPlayer(player: PlayerProps): void {
        const newPlayers = players.map((p, index) => selectedPlayerForEditing.key === index ? player : p);

        setPlayers(newPlayers);
        setIsEditingAPlayer(false);
        changePlayerActionMessage({ action: 'edit', user: player.name, });
    }

    function deletePlayer(key: number): void {
        const deletedPlayer = players.filter((p, i) => i === key);
        const newPlayers = players.filter((p, i) => i !== key);

        setPlayers(newPlayers);
        changePlayerActionMessage({ action: 'delete', user: deletedPlayer[0].name });
    }

    function resetPlayerStats(key: number): void {
        const newPlayerStatistic = players.filter((p, i) => i === key);
        Object.keys(newPlayerStatistic[0].match).forEach(item => (newPlayerStatistic[0].match[item] = 0));

        const newPlayers = players.map((player, index) => index !== key ? player : newPlayerStatistic[0]);

        setPlayers(newPlayers);
        changePlayerActionMessage({ action: 'reset', user: newPlayerStatistic[0].name });
    }

    
    // Components
    
    function ShowWinrate({ wins, matches }: ShowWinrateProps) {
        function caculateWinrate(): number {
            if (matches === 0) {
                return 0;
            } else {
                const winrate = (wins * 100) / matches;
            
                return winrate;
            }
        }
    
        return <> {caculateWinrate()} </>
    }

    useEffect(() => {
        const newPlayersName = players.map(player => player.name);

        setPlayersName(newPlayersName);
    }, [players]);

    return (
        <PlayersContext.Provider
            value={{
                players,
                defaultPlayers,
                playersName,
                playerActionMessage,
                selectedPlayer,
                selectedPlayerForEditing,
                isEditingAPlayer,
                changePlayerActionMessage,
                changeIsEditingAPlayer,
                changeSelectedPlayer,
                addNewPlayer,
                updateSelectedPlayerForEditing,
                editPlayer,
                deletePlayer,
                resetPlayerStats,
                ShowWinrate
            }}
        >
            {children}
        </PlayersContext.Provider>
    );
}

export function usePlayers() {
    return useContext(PlayersContext);
}
