
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, RotateCcw } from 'lucide-react';

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const emojis = ['🌸', '🌺', '🌻', '🌷', '🌹', '🍀', '🌿', '🦋'];

  const initializeGame = () => {
    const gameCards = [...emojis, ...emojis].map((emoji, index) => ({
      id: index,
      value: emoji,
      isFlipped: false,
      isMatched: false,
    }));
    
    // Mezclar cartas
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }
    
    setCards(gameCards);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setGameComplete(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      setMoves(moves + 1);
      
      if (cards[first].value === cards[second].value) {
        setCards(prev => prev.map(card => 
          card.id === first || card.id === second 
            ? { ...card, isMatched: true }
            : card
        ));
        setMatches(matches + 1);
        setFlippedCards([]);
        
        if (matches + 1 === emojis.length) {
          setGameComplete(true);
        }
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards, matches, moves]);

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (cards[cardId].isFlipped || cards[cardId].isMatched) return;
    
    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    ));
    setFlippedCards(prev => [...prev, cardId]);
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-800">
          <Brain className="h-5 w-5" />
          Memoria Terapéutica
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm text-slate-600">
          <span>Parejas: {matches}/{emojis.length}</span>
          <span>Movimientos: {moves}</span>
        </div>
        
        {gameComplete && (
          <div className="text-center p-4 bg-green-100 rounded-lg">
            <h3 className="font-semibold text-green-800">¡Felicitaciones! 🎉</h3>
            <p className="text-green-600">Completaste el juego en {moves} movimientos</p>
          </div>
        )}
        
        <div className="grid grid-cols-4 gap-2">
          {cards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square border-2 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center text-2xl ${
                card.isFlipped || card.isMatched
                  ? 'bg-white border-purple-300'
                  : 'bg-purple-200 border-purple-400 hover:bg-purple-300'
              }`}
            >
              {(card.isFlipped || card.isMatched) ? card.value : '?'}
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <Button
            onClick={initializeGame}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Nuevo Juego
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemoryGame;
