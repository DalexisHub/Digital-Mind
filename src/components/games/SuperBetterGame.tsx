
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Zap, Shield, Target, Users, Star, X } from 'lucide-react';

interface Quest {
  id: number;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  category: 'daily' | 'weekly' | 'personal';
}

interface BadGuy {
  id: number;
  name: string;
  description: string;
  defeated: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface PowerUp {
  id: number;
  title: string;
  description: string;
  points: number;
  used: boolean;
  category: 'physical' | 'mental' | 'emotional' | 'social';
}

const SuperBetterGame = ({ isExpanded, onToggleExpand }: { isExpanded: boolean, onToggleExpand: () => void }) => {
  const [totalPoints, setTotalPoints] = useState(150);
  const [level, setLevel] = useState(2);
  const [allies, setAllies] = useState(3);

  const [quests, setQuests] = useState<Quest[]>([
    { id: 1, title: 'Caminar 30 minutos', description: 'Realizar actividad física diaria', points: 20, completed: false, category: 'daily' },
    { id: 2, title: 'Meditar 10 minutos', description: 'Práctica de mindfulness', points: 15, completed: true, category: 'daily' },
    { id: 3, title: 'Llamar a un amigo', description: 'Conectar socialmente', points: 25, completed: false, category: 'weekly' },
    { id: 4, title: 'Escribir 3 cosas positivas', description: 'Práctica de gratitud', points: 10, completed: true, category: 'personal' },
  ]);

  const [badGuys, setBadGuys] = useState<BadGuy[]>([
    { id: 1, name: 'Pensamiento Catastrófico', description: 'Imaginar el peor escenario posible', defeated: false, difficulty: 'medium' },
    { id: 2, name: 'Autocrítica Excesiva', description: 'Ser muy duro contigo mismo', defeated: true, difficulty: 'easy' },
    { id: 3, name: 'Procrastinación', description: 'Postergar tareas importantes', defeated: false, difficulty: 'hard' },
  ]);

  const [powerUps, setPowerUps] = useState<PowerUp[]>([
    { id: 1, title: 'Respiración Profunda', description: 'Técnica 4-7-8 para calmar la ansiedad', points: 5, used: false, category: 'mental' },
    { id: 2, title: 'Playlist Motivacional', description: 'Escuchar música que eleve tu ánimo', points: 10, used: false, category: 'emotional' },
    { id: 3, title: 'Ejercicio de Estiramiento', description: '5 minutos de estiramientos', points: 8, used: true, category: 'physical' },
    { id: 4, title: 'Mensaje de Apoyo', description: 'Enviar un mensaje positivo a alguien', points: 12, used: false, category: 'social' },
  ]);

  const completeQuest = (questId: number) => {
    setQuests(prev => prev.map(quest => 
      quest.id === questId ? { ...quest, completed: true } : quest
    ));
    const quest = quests.find(q => q.id === questId);
    if (quest && !quest.completed) {
      setTotalPoints(prev => prev + quest.points);
    }
  };

  const defeatBadGuy = (badGuyId: number) => {
    setBadGuys(prev => prev.map(badGuy => 
      badGuy.id === badGuyId ? { ...badGuy, defeated: true } : badGuy
    ));
    setTotalPoints(prev => prev + 30);
  };

  const usePowerUp = (powerUpId: number) => {
    setPowerUps(prev => prev.map(powerUp => 
      powerUp.id === powerUpId ? { ...powerUp, used: true } : powerUp
    ));
    const powerUp = powerUps.find(p => p.id === powerUpId);
    if (powerUp && !powerUp.used) {
      setTotalPoints(prev => prev + powerUp.points);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'physical': return <Zap className="h-4 w-4" />;
      case 'mental': return <Shield className="h-4 w-4" />;
      case 'emotional': return <Star className="h-4 w-4" />;
      case 'social': return <Users className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  return (
    <Card className={`bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200 transition-all duration-300 ${
      isExpanded ? 'fixed inset-4 z-50 overflow-auto' : ''
    }`}>
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <Trophy className="h-5 w-5" />
            SuperBetter
          </CardTitle>
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
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Panel de estadísticas */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-white/60 rounded-lg">
            <div className="text-2xl font-bold text-purple-800">{totalPoints}</div>
            <div className="text-sm text-purple-600">Puntos</div>
          </div>
          <div className="p-3 bg-white/60 rounded-lg">
            <div className="text-2xl font-bold text-purple-800">Nivel {level}</div>
            <div className="text-sm text-purple-600">Jugador</div>
          </div>
          <div className="p-3 bg-white/60 rounded-lg">
            <div className="text-2xl font-bold text-purple-800">{allies}</div>
            <div className="text-sm text-purple-600">Aliados</div>
          </div>
        </div>

        {/* Progreso hacia el siguiente nivel */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-purple-700">
            <span>Progreso al Nivel {level + 1}</span>
            <span>{totalPoints}/300</span>
          </div>
          <Progress value={(totalPoints / 300) * 100} className="h-2" />
        </div>

        {/* Quests */}
        <div className="space-y-3">
          <h3 className="font-semibold text-purple-800 flex items-center gap-2">
            <Target className="h-4 w-4" />
            Misiones Activas
          </h3>
          <div className="space-y-2">
            {quests.slice(0, isExpanded ? quests.length : 2).map((quest) => (
              <div
                key={quest.id}
                className={`p-3 rounded-lg border-2 transition-all ${
                  quest.completed
                    ? 'bg-green-100 border-green-300'
                    : 'bg-white/60 border-purple-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-800">{quest.title}</h4>
                    <p className="text-sm text-slate-600">{quest.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-purple-600">+{quest.points}pts</span>
                    {!quest.completed && (
                      <Button
                        size="sm"
                        onClick={() => completeQuest(quest.id)}
                        className="bg-purple-500 hover:bg-purple-600"
                      >
                        Completar
                      </Button>
                    )}
                    {quest.completed && <span className="text-green-600">✓</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bad Guys */}
        <div className="space-y-3">
          <h3 className="font-semibold text-purple-800 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Enemigos (Pensamientos Negativos)
          </h3>
          <div className="space-y-2">
            {badGuys.slice(0, isExpanded ? badGuys.length : 2).map((badGuy) => (
              <div
                key={badGuy.id}
                className={`p-3 rounded-lg border-2 transition-all ${
                  badGuy.defeated
                    ? 'bg-green-100 border-green-300'
                    : 'bg-red-50 border-red-200 hover:border-red-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-slate-800">{badGuy.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(badGuy.difficulty)}`}>
                        {badGuy.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{badGuy.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!badGuy.defeated && (
                      <Button
                        size="sm"
                        onClick={() => defeatBadGuy(badGuy.id)}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Vencer
                      </Button>
                    )}
                    {badGuy.defeated && <span className="text-green-600">Derrotado ✓</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Power-ups */}
        <div className="space-y-3">
          <h3 className="font-semibold text-purple-800 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Power-ups (Autocuidado)
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {powerUps.slice(0, isExpanded ? powerUps.length : 2).map((powerUp) => (
              <div
                key={powerUp.id}
                className={`p-3 rounded-lg border-2 transition-all ${
                  powerUp.used
                    ? 'bg-blue-100 border-blue-300'
                    : 'bg-white/60 border-purple-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    {getCategoryIcon(powerUp.category)}
                    <div>
                      <h4 className="font-medium text-slate-800">{powerUp.title}</h4>
                      <p className="text-sm text-slate-600">{powerUp.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-purple-600">+{powerUp.points}pts</span>
                    {!powerUp.used && (
                      <Button
                        size="sm"
                        onClick={() => usePowerUp(powerUp.id)}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        Usar
                      </Button>
                    )}
                    {powerUp.used && <span className="text-blue-600">Usado ✓</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {!isExpanded && (
          <div className="text-center">
            <Button onClick={onToggleExpand} variant="outline" className="w-full">
              Ver más actividades
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SuperBetterGame;
