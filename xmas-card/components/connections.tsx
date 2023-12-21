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
    word: "BUC-EE'S"
  },
  {
    type: "category-four",
    word: "SOPHIE"
  },
  {
    type: "category-three",
    word: "POTTERY"
  },
  {
    type: "category-one",
    word: "FOOTBALL"
  },
  {
    type: "category-two",
    word: "COUNTRY MUSIC"
  },
  {
    type: "category-four",
    word: "JACK"
  },
  {
    type: "category-three",
    word: "IRELAND"
  },
  {
    type: "category-one",
    word: "WOODWORKING"
  },
  {
    type: "category-two",
    word: "DALLAS"
  },
  {
    type: "category-four",
    word: "DIET COKE"
  },
  {
    type: "category-three",
    word: "PHOTOGRAPHY"
  },
  {
    type: "category-one",
    word: "OVEREATING"
  },
  {
    type: "category-two",
    word: "EXTREME HEAT"
  },
  {
    type: "category-four",
    word: "THE GRINCH"
  },
  {
    type: "category-three",
    word: "CAMBRIDGE"
  },
  {
    type: "category-one",
    word: "LETHARGY"
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
  const [group1Solved, setGroup1] = useState(false);
  const [group2Solved, setGroup2] = useState(false);
  const [group3Solved, setGroup3] = useState(false);
  const [group4Solved, setGroup4] = useState(false);

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
      if (cards[first].type === 'category-one') {
        setGroup1(!group1Solved);
      } else if (cards[first].type === 'category-two') {
        setGroup2(!group2Solved);
      } else if (cards[first].type === 'category-three') {
        setGroup3(!group3Solved);
      } else if (cards[first].type === 'category-four') {
        setGroup4(!group4Solved);
      }
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
    setGroup1(false);
    setGroup2(false);
    setGroup3(false);
    setGroup4(false);
    // set a shuffled deck of cards
    setCards(shuffleCards(uniqueCardsArray));
  };

  return (
    <div className="flex flex-col items-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl lg:text-6xl">Connections!</h1>
        <div className="flex flex-row align-center mb-4 text-gray-700 lg:text-2xl">
          Create four groups of four!
          <div className="restart-conn">
            <Button style={{color: 'white'}} onClick={handleRestart}>
                Restart
            </Button>
        </div>
        </div>
        <div className="flex sm:flex-row flex-col justify-evenly items-center" style={{width: '100%'}}>
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
            <div className="flex flex-col">
              <h2 className="mb-4 text-4xl font-extrabold text-gray-700 lg:text-4xl">Answers:</h2>
                { group1Solved &&
                 <p className="mb-4 text-gray-700 lg:text-2xl answer"><strong>BRADS HOLIDAY PLANS:</strong> FOOTBALL, WOODWORKING, OVEREATING, LETHARGY</p>
                }
                {
                    group2Solved &&
                    <p className="mb-4 text-gray-700 lg:text-2xl answer"><strong>JACKS SUMMER EXPERIENCES:</strong> BUC-EES, COUNTRY MUSIC, DALLAS, EXTREME HEAT</p>
                }
                {
                    group3Solved &&
                    <p className="mb-4 text-gray-700 lg:text-2xl answer"><strong>SOPHIES 2024 PLANS:</strong> POTTERY, IRELAND, PHOTOGRAPHY, CAMBRIDGE</p>
                }
                {
                    group4Solved &&
                    <p className="mb-4 text-gray-700 lg:text-2xl answer"><strong>THINGS MISSY LOVES MOST:</strong> SOPHIE, JACK, DIET COKE, THE GRINCH</p>
                }
            </div>
        </div>
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
