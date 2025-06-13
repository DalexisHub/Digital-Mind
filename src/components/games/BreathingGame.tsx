
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Waves, Play, Pause, X } from 'lucide-react';

const BreathingGame = ({ isExpanded, onToggleExpand }: { isExpanded?: boolean, onToggleExpand?: () => void }) => {
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
        return 0.5 + (progress * 0.5);
      case 'hold':
        return 1;
      case 'exhale':
        return 1 - (progress * 0.5);
      case 'pause':
        return 0.5;
      default:
        return 0.5;
    }
  };

  return (
    <Card className={`bg-gradient-to-br from-cyan-50 to-blue-100 border-cyan-200 transition-all duration-300 ${
      isExpanded ? 'fixed inset-4 z-50 overflow-auto' : ''
    }`}>
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-cyan-800">
            <Waves className="h-5 w-5" />
            Respiración 4-7-8
          </CardTitle>
          {onToggleExpand && (
            <>
              {isExpanded ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggleExpand}
                  className="absolute right-2 top-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggleExpand}
                >
                  Expandir
                </Button>
              )}
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className={`relative mx-auto mb-4 ${isExpanded ? 'w-48 h-48' : 'w-32 h-32'}`}>
            <div 
              className="w-full h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-transform duration-1000 ease-in-out flex items-center justify-center"
              style={{ transform: `scale(${getCircleScale()})` }}
            >
              <div className={`text-white font-bold ${isExpanded ? 'text-2xl' : 'text-lg'}`}>{timeLeft}</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className={`font-semibold text-slate-800 ${isExpanded ? 'text-2xl' : 'text-xl'}`}>
              {phases[phase].text}
            </h3>
            <p className={`text-slate-600 ${isExpanded ? 'text-base' : 'text-sm'}`}>
              Ciclos completados: {cycles}
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <Button
            onClick={toggleBreathing}
            variant="default"
            className="bg-cyan-500 hover:bg-cyan-600"
            size={isExpanded ? "lg" : "default"}
          >
            {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button 
            onClick={resetGame} 
            variant="outline"
            size={isExpanded ? "lg" : "default"}
          >
            Reiniciar
          </Button>
        </div>

        {isExpanded && (
          <div className="bg-white/60 rounded-lg p-6 space-y-4">
            <h4 className="font-semibold text-slate-800 text-lg">Instrucciones detalladas</h4>
            <div className="space-y-3 text-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center text-white font-bold">1</div>
                <p>Inhala profundamente por la nariz durante 4 segundos</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">2</div>
                <p>Mantén la respiración durante 7 segundos</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-400 flex items-center justify-center text-white font-bold">3</div>
                <p>Exhala lentamente por la boca durante 8 segundos</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-400 flex items-center justify-center text-white font-bold">4</div>
                <p>Pausa brevemente antes de repetir el ciclo</p>
              </div>
            </div>
          </div>
        )}

        <div className={`text-slate-500 text-center ${isExpanded ? 'text-sm' : 'text-xs'}`}>
          <p>Sigue el círculo: crece al inhalar, se mantiene al sostener, decrece al exhalar</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BreathingGame;
