import styles from '@styles/Game/FinishedGame.module.scss';

import Button from '@Components/General/Button';

import X from '@Icons/X';
import O from '@Icons/O';

import { useGame } from '@Contexts/GameContext';

export default function FinishedGame() {
    const { position, winnerPosition, resetGame } = useGame();

    function verifyPosition(index: number): string {
        let background: string;

        winnerPosition.forEach(item => {
            if (index === item) {
                background = 'rgba(0, 0, 0, 0.2)';
            }
        });

        return background;
    }

    return (
        <>
            <main className={styles.gameContainer}>
                {position.map((i, index) => (
                    <div
                        style={{ background: verifyPosition(index) }}
                        key={index}
                    >
                        <span>
                            {i === 'X' && <X />}
                            {i === 'O' && <O />}
                        </span>
                    </div>
                ))}
            </main>

            <Button onClick={resetGame}>Start new game</Button>
        </>
    );
}
