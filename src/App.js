import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";
import "./App.css";

const cardImages = [
    { src: "/img/tkd-kids-1.png", matched: false },
    { src: "/img/tkd-kids-2.png", matched: false },
    { src: "/img/tkd-kids-3.png", matched: false },
    { src: "/img/tkd-kids-4.png", matched: false },
    { src: "/img/tkd-kids-5.png", matched: false },
    { src: "/img/tkd-kids-6.png", matched: false },
];

function App() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);

    // shufle cards
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }));

        setCards(shuffledCards);
        setTurns(0);
		setChoiceOne(null);
		setChoiceTwo(null);
    };

    // handle click on card
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };

    // compoare 2 selected cards

    useEffect(() => {

		
        if (choiceOne && choiceTwo) {
			setDisabled(true)
            if (choiceOne.src === choiceTwo.src) {
                setCards((prevCards) => {
                    return prevCards.map((card) => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true };
                        } else {
                            return card;
                        }
                    });
                });
                resetTurn();
            } else {
                setTimeout(() => resetTurn(), 1000);
            }
        }
    }, [choiceOne, choiceTwo]);

	//start a new game automatically

	useEffect(() => {
		shuffleCards();
	}, []);

    // rest choices and increase turn

    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns((prevTurns) => prevTurns + 1);
		setDisabled(false);
    };

    return (
        <div className="App">
            <h1>Taekwon-Do Memory</h1>
            <button onClick={shuffleCards}>New Game</button>

            <div className="card-grid">
                {cards.map((card) => (
                    <SingleCard
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        flipped={
                            card === choiceOne ||
                            card === choiceTwo ||
                            card.matched
                        }
						disabled={disabled}
                    />
                ))}
            </div>
			<h2>Turns: {turns}</h2>
        </div>
    );
}

export default App;
