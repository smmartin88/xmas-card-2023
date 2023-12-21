import { useEffect, useState, useRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle
} from "@mui/material";
import ConnectionsCard from "./connectionsCard";

const uniqueCardsArray = [
  {
    type: "category-two",
    word: "word 1"
  },
  {
    type: "category-four",
    word: "word 1"
  },
  {
    type: "category-three",
    word: "word 1"
  },
  {
    type: "category-one",
    word: "word 1"
  },
  {
    type: "category-two",
    word: "word 1"
  },
  {
    type: "category-four",
    word: "word 1"
  },
  {
    type: "category-three",
    word: "word 1"
  },
  {
    type: "category-one",
    word: "word 1"
  },
  {
    type: "category-two",
    word: "word 1"
  },
  {
    type: "category-four",
    word: "word 1"
  },
  {
    type: "category-three",
    word: "word 1"
  },
  {
    type: "category-one",
    word: "word 1"
  },
  {
    type: "category-two",
    word: "word 1"
  },
  {
    type: "category-four",
    word: "word 1"
  },
  {
    type: "category-three",
    word: "word 1"
  },
  {
    type: "category-one",
    word: "word 1"
  }
];

function shuffleCards(array: any) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}
export default function Connections() {
  const [cards, setCards] = useState<any>(() =>
    shuffleCards(uniqueCardsArray)
  );
  const [openCards, setOpenCards] = useState<any>([]);
  const [clearedCards, setClearedCards] = useState<any>({});
  const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const timeout = useRef<any>(null);

  const disable = () => {
    setShouldDisableAllCards(true);
  };
  const enable = () => {
    setShouldDisableAllCards(false);
  };

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === uniqueCardsArray.length) {
      setShowModal(true);
    }
  };

  const evaluate = () => {
    const [first, second, third, fourth] = openCards;
    enable();
    if (cards[first].type === cards[second].type && cards[first].type === cards[third].type && cards[first].type === cards[fourth].type) {
      setClearedCards((prev: any) => ({ ...prev, [cards[first].type]: true }));
      setOpenCards([]);
      return;
    }
    // This is to flip the cards back after 500ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };
  const handleCardClick = (index: any) => {
    if (openCards.length === 3) {
      setOpenCards((prev: any) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards((prev: any) => [...prev, index]);
    }
  };

  useEffect(() => {
    let timeout: any = null;
    if (openCards.length === 4) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  useEffect(() => {
    checkCompletion();
  }, [clearedCards]);
  const checkIsFlipped = (index: any) => {
    return openCards.includes(index);
  };

  const checkIsInactive = (card: any) => {
    return Boolean(clearedCards[card.type]);
  };

  const handleRestart = () => {
    setClearedCards({});
    setOpenCards([]);
    setShowModal(false);
    setMoves(0);
    setShouldDisableAllCards(false);
    // set a shuffled deck of cards
    setCards(shuffleCards(uniqueCardsArray));
  };

  return (
    <div className="App">
      <header>
        <h3>Play the Flip card game</h3>
        <div>
          Select two cards with same content consequtively to make them vanish
        </div>
      </header>
      <div className="wrapper">
        {cards.map((card: any, index: any) => {
          return (
            <ConnectionsCard
              key={index}
              card={card}
              index={index}
              isDisabled={shouldDisableAllCards}
              isInactive={checkIsInactive(card)}
              isFlipped={checkIsFlipped(index)}
              onClick={handleCardClick}
            />
          );
        })}
      </div>
      <footer>
        <div className="score">
          <div className="moves">
            <span className="bold">Moves:</span> {moves}
          </div>
        </div>
        <div className="restart">
          <Button onClick={handleRestart} color="primary" variant="contained">
            Restart
          </Button>
        </div>
      </footer>
      <Dialog
        open={showModal}
        disableEscapeKeyDown
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Hurray!!! You completed the challenge
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You completed the game!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRestart} color="primary">
            Restart
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
