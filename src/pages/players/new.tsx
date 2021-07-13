import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Players/NewPlayer.module.scss';

import TitlePage from '../../utils/TitlePage';
import Button from '../../Components/General/Button';
import UserPlus from '../../Icons/UserPlus';

import Colors from '../../Components/Players/new/Colors';
import Footer from '../../Components/General/Footer';
import BackButton from '../../Components/General/BackButton';
import Header from '../../Components/General/Header';

import { usePlayers } from '../../Contexts/PlayersContext';

type ColorProps = {
    hex: string;
    name: string;
};

export default function NewPlayerForm() {
    const { addNewPlayer } = usePlayers();
    const router = useRouter();

    const [isInputNotFilled, setIsInputNotFilled] = useState(false);
    const [name, setName] = useState('');
    const [color, setColor] = useState({ hex: '#fff', name: 'White' } as ColorProps);

    function updateColor(value: ColorProps): void {
        setColor(value);
    }

    function newPlayerButton() {
        if (!name) {
            setIsInputNotFilled(true);        
        } else {
            const player = {
                name,
                color,
                match: {
                    matches: 0,
                    wins: 0,
                    defeats: 0,
                    ties: 0,
                    score: 0,
                },
            };

            addNewPlayer(player);
            router.push('/players');
        }
    }

    return (
        <>
            <TitlePage title='New player' />

            <div>
                <div>
                    <BackButton href='/players' />

                    <Header>
                        <UserPlus size={24} /> New player
                    </Header>
                </div>

                <form className={styles.newContainer}>
                    <h4>Fill out this form below to sign up in our system.</h4>

                    <input
                        type='text' placeholder='Username' required
                        className={isInputNotFilled ? styles.inputNotFilled : ''}
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />

                    <h4>User color:</h4>

                    <div className={styles.colors}>
                        <Colors
                            color={color}
                            updateColor={updateColor}
                            styles={styles}
                        />
                    </div>

                    <div className={styles.signUpButton}>
                        <Button onClick={newPlayerButton}>
                            <UserPlus /> Sign up
                        </Button>
                    </div>
                </form>
            </div>

            <Footer />
        </>
    );
}