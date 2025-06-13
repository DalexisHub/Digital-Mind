
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Waves, Play, Pause } from 'lucide-react';

const BreathingGame = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [cycles, setCycles] = useState(0);

  const phases = {
    inhale: { duration: 4, next: 'hold', text: 'Inhala' },
    hold: { duration: 7, next: 'exhale', text: 'Mantén' },
    exhale: { duration: 8, next: 'pause', text: 'Exhala' },
    pause: { duration: 2, next: 'inhale', text: 'Pausa' }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      const currentPhase = phases[phase];
      const nextPhase = currentPhase.next as keyof typeof phases;
      
      if (phase === 'pause') {
        setCycles(cycles + 1);
      }
      
      setPhase(nextPhase);
      setTimeLeft(phases[nextPhase].duration);
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft, phase, cycles]);

  const toggleBreathing = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setPhase('inhale');
      setTimeLeft(4);
    }
  };

  const resetGame = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimeLeft(4);
    setCycles(0);
  };

  const getCircleScale = () => {
    const currentPhase = phases[phase];
    const progress = (currentPhase.duration - timeLeft) / currentPhase.duration;
    
    switch (phase) {
      case 'inhale':
        return 0.5 + (progress * 0.5); // Crece de 0.5 a 1
      case 'hold':
        return 1; // Se mantiene grande
      case 'exhale':
        return 1 - (progress * 0.5); // Decrece de 1 a 0.5
      case 'pause':
        return 0.5; // Se mantiene pequeño
      default:
        return 0.5;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-cyan-50 to-blue-100 border-cyan-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-800">
          <Waves className="h-5 w-5" />
          Respiración 4-7-8
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <div 
              className="w-full h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-transform duration-1000 ease-in-out flex items-center justify-center"
              style={{ transform: `scale(${getCircleScale()})` }}
            >
              <div className="text-white font-bold text-lg">{timeLeft}</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-800">
              {phases[phase].text}
            </h3>
            <p className="text-sm text-slate-600">
              Ciclos completados: {cycles}
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <Button
            onClick={toggleBreathing}
            variant="default"
            className="bg-cyan-500 hover:bg-cyan-600"
          >
            {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button onClick={resetGame} variant="outline">
            Reiniciar
          </Button>
        </div>

        <div className="text-xs text-slate-500 text-center">
          <p>Sigue el círculo: crece al inhalar, se mantiene al sostener, decrece al exhalar</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BreathingGame;
