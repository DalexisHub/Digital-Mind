
import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, Heart, Waves, Gamepad2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';
import BreathingGame from '@/components/games/BreathingGame';
import MemoryGame from '@/components/games/MemoryGame';
import ColorTherapyGame from '@/components/games/ColorTherapyGame';
import ZenDrawing from '@/components/games/ZenDrawing';

const Relaxation = () => {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [totalTime, setTotalTime] = useState(300); // 5 minutos por defecto
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([50]);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0 && isPlaying) {
      setIsPlaying(false);
      toast({
        title: "¡Sesión completada! 🌟",
        description: "Has terminado tu ejercicio de relajación. ¡Excelente trabajo!",
        duration: 5000,
      });
    }
    return () => clearInterval(interval);
  }, [isPlaying, timer, toast]);

  const startExercise = (exerciseType: string, duration: number) => {
    setActiveExercise(exerciseType);
    setTimer(duration);
    setTotalTime(duration);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetTimer = () => {
    setTimer(totalTime);
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const exercises = [
    {
      id: 'breathing',
      title: 'Respiración Profunda',
      description: 'Técnica 4-7-8 para calmar la ansiedad',
      duration: 300,
      color: 'from-blue-500 to-cyan-500',
      icon: <Waves className="h-8 w-8" />
    },
    {
      id: 'meditation',
      title: 'Meditación Mindfulness',
      description: 'Enfoque en el momento presente',
      duration: 600,
      color: 'from-purple-500 to-pink-500',
      icon: <Heart className="h-8 w-8" />
    },
    {
      id: 'progressive',
      title: 'Relajación Progresiva',
      description: 'Libera tensión muscular gradualmente',
      duration: 900,
      color: 'from-green-500 to-emerald-500',
      icon: <RotateCcw className="h-8 w-8" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-slate-800">Centro de Relajación y Bienestar</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Dedica unos minutos a cuidar tu bienestar mental con ejercicios de relajación y juegos terapéuticos
          </p>
        </div>

        <Tabs defaultValue="exercises" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="exercises" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Ejercicios de Relajación
            </TabsTrigger>
            <TabsTrigger value="games" className="flex items-center gap-2">
              <Gamepad2 className="h-4 w-4" />
              Juegos Anti-Estrés
            </TabsTrigger>
          </TabsList>

          <TabsContent value="exercises" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Panel principal - Ejercicio activo */}
              <div className="lg:col-span-2">
                {activeExercise ? (
                  <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl text-indigo-800">
                        {exercises.find(e => e.id === activeExercise)?.title}
                      </CardTitle>
                      <p className="text-indigo-600">
                        {exercises.find(e => e.id === activeExercise)?.description}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Timer circular */}
                      <div className="flex justify-center">
                        <div className="relative w-48 h-48">
                          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              stroke="#e2e8f0"
                              strokeWidth="8"
                              fill="transparent"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              stroke="url(#gradient)"
                              strokeWidth="8"
                              fill="transparent"
                              strokeDasharray={`${2 * Math.PI * 45}`}
                              strokeDashoffset={`${2 * Math.PI * 45 * (1 - timer / totalTime)}`}
                              className="transition-all duration-1000 ease-linear"
                            />
                            <defs>
                              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#8b5cf6" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-3xl font-bold text-slate-800">
                                {formatTime(timer)}
                              </div>
                              <div className="text-sm text-slate-600">
                                {isPlaying ? 'En curso...' : 'Pausado'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Controles */}
                      <div className="flex justify-center gap-4">
                        <Button
                          onClick={togglePlayPause}
                          size="lg"
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        >
                          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                        </Button>
                        <Button onClick={resetTimer} variant="outline" size="lg">
                          <RotateCcw className="h-6 w-6" />
                        </Button>
                      </div>

                      {/* Guía de respiración */}
                      {activeExercise === 'breathing' && (
                        <div className="text-center space-y-4">
                          <div className="bg-white/60 rounded-lg p-6">
                            <h3 className="font-semibold text-slate-800 mb-4">Técnica 4-7-8</h3>
                            <div className="space-y-2 text-slate-700">
                              <p>1. Inhala por la nariz durante 4 segundos</p>
                              <p>2. Mantén la respiración durante 7 segundos</p>
                              <p>3. Exhala por la boca durante 8 segundos</p>
                              <p>4. Repite el ciclo</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Control de volumen */}
                      <div className="bg-white/60 rounded-lg p-4">
                        <div className="flex items-center gap-4">
                          <Volume2 className="h-5 w-5 text-slate-600" />
                          <Slider
                            value={volume}
                            onValueChange={setVolume}
                            max={100}
                            step={1}
                            className="flex-1"
                          />
                          <span className="text-sm text-slate-600 w-12">{volume[0]}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-gradient-to-br from-slate-50 to-blue-50">
                    <CardContent className="text-center py-16">
                      <Heart className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-slate-700 mb-2">
                        Selecciona un ejercicio
                      </h3>
                      <p className="text-slate-500">
                        Elige una técnica de relajación para comenzar tu sesión de bienestar
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Panel lateral - Lista de ejercicios */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ejercicios Disponibles</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {exercises.map((exercise) => (
                      <div
                        key={exercise.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          activeExercise === exercise.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                        onClick={() => startExercise(exercise.id, exercise.duration)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${exercise.color} text-white`}>
                            {exercise.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-slate-800">{exercise.title}</h4>
                            <p className="text-sm text-slate-600 mb-2">{exercise.description}</p>
                            <div className="text-xs text-slate-500">
                              Duración: {Math.floor(exercise.duration / 60)} minutos
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Estadísticas de relajación */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tu Progreso</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-800">12</div>
                      <div className="text-sm text-slate-600">Sesiones esta semana</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-800">45min</div>
                      <div className="text-sm text-slate-600">Tiempo total hoy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-800">7</div>
                      <div className="text-sm text-slate-600">Días consecutivos</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="games" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BreathingGame />
              <MemoryGame />
              <ColorTherapyGame />
              <ZenDrawing />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Relaxation;
