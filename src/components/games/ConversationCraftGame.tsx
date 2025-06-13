
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MessageCircle, Trophy, Star, BarChart3, X } from 'lucide-react';

interface Scenario {
  id: number;
  level: 'Básico' | 'Intermedio' | 'Avanzado' | 'Experto';
  type: 'Casual' | 'Profesional' | 'Personal' | 'Conflictivo';
  context: string;
  character: string;
  objective: string;
  npcDialogue: string;
  responses: {
    id: string;
    text: string;
    type: 'asertiva' | 'empática' | 'evasiva' | 'creativa';
  }[];
}

interface Feedback {
  score: {
    confidence: number;
    empathy: number;
    clarity: number;
    naturalness: number;
  };
  analysis: string;
  improvement: string;
  tip: string;
}

const ConversationCraftGame = ({ isExpanded, onToggleExpand }: { isExpanded: boolean, onToggleExpand: () => void }) => {
  const [currentLevel, setCurrentLevel] = useState<'Básico' | 'Intermedio' | 'Avanzado' | 'Experto'>('Básico');
  const [totalScore, setTotalScore] = useState(420);
  const [streak, setStreak] = useState(7);
  const [unlockedSkills, setUnlockedSkills] = useState(8);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastFeedback, setLastFeedback] = useState<Feedback | null>(null);

  const scenarios: Scenario[] = [
    {
      id: 1,
      level: 'Básico',
      type: 'Casual',
      context: 'Estás en una cafetería y alguien accidentalmente choca contigo',
      character: 'Ana - Persona amable, un poco apresurada',
      objective: 'Manejar la situación de forma cordial',
      npcDialogue: '¡Oh no! ¡Lo siento mucho! ¿Estás bien? ¿Te lastimé?',
      responses: [
        { id: 'A', text: 'No te preocupes, estas cosas pasan. ¿Tú estás bien?', type: 'empática' },
        { id: 'B', text: 'No pasa nada, pero ten más cuidado la próxima vez.', type: 'asertiva' },
        { id: 'C', text: 'Eh... sí, estoy bien...', type: 'evasiva' },
        { id: 'D', text: 'Todo bien, parece que los dos necesitamos más café.', type: 'creativa' }
      ]
    },
    {
      id: 2,
      level: 'Intermedio',
      type: 'Profesional',
      context: 'En una reunión de trabajo, tu jefe solicita voluntarios para un proyecto adicional',
      character: 'Carlos - Jefe directo, serio pero justo',
      objective: 'Expresar tu interés o limitaciones apropiadamente',
      npcDialogue: 'Necesitamos a alguien que lidere este nuevo proyecto. Requiere tiempo extra pero es una gran oportunidad de crecimiento.',
      responses: [
        { id: 'A', text: 'Me interesa mucho. ¿Podríamos discutir los detalles después de la reunión?', type: 'asertiva' },
        { id: 'B', text: 'Suena como una excelente oportunidad. ¿Cómo podríamos balancearlo con nuestras responsabilidades actuales?', type: 'empática' },
        { id: 'C', text: 'No estoy seguro si tengo el tiempo suficiente...', type: 'evasiva' },
        { id: 'D', text: 'Yo me apunto, siempre he querido demostrar mi potencial en nuevas áreas.', type: 'creativa' }
      ]
    }
  ];

  const startScenario = (level?: typeof currentLevel) => {
    const levelToUse = level || currentLevel;
    const availableScenarios = scenarios.filter(s => s.level === levelToUse);
    if (availableScenarios.length > 0) {
      const randomScenario = availableScenarios[Math.floor(Math.random() * availableScenarios.length)];
      setCurrentScenario(randomScenario);
      setShowFeedback(false);
    }
  };

  const handleResponse = (responseId: string) => {
    if (!currentScenario) return;

    const response = currentScenario.responses.find(r => r.id === responseId);
    if (!response) return;

    // Simular feedback basado en el tipo de respuesta
    let feedback: Feedback;
    
    switch (response.type) {
      case 'empática':
        feedback = {
          score: { confidence: 15, empathy: 20, clarity: 12, naturalness: 18 },
          analysis: 'Excelente muestra de empatía. Tu respuesta demuestra consideración hacia la otra persona.',
          improvement: 'Podrías ser un poco más asertivo para establecer límites claros.',
          tip: 'La empatía crea conexiones genuinas, pero equilibra con tus propias necesidades.'
        };
        break;
      case 'asertiva':
        feedback = {
          score: { confidence: 20, empathy: 10, clarity: 18, naturalness: 15 },
          analysis: 'Respuesta clara y directa. Muestra seguridad en ti mismo.',
          improvement: 'Considera agregar más elementos empáticos para suavizar el mensaje.',
          tip: 'La asertividad es clave, pero la diplomacia la hace más efectiva.'
        };
        break;
      case 'evasiva':
        feedback = {
          score: { confidence: 5, empathy: 8, clarity: 6, naturalness: 10 },
          analysis: 'Esta respuesta muestra inseguridad y puede crear confusión.',
          improvement: 'Intenta ser más directo y expresar tu opinión con mayor claridad.',
          tip: 'Recuerda que tu opinión es valiosa. Practica expresarte con más confianza.'
        };
        break;
      case 'creativa':
        feedback = {
          score: { confidence: 18, empathy: 15, clarity: 16, naturalness: 22 },
          analysis: 'Respuesta original que alivia la tensión y muestra personalidad.',
          improvement: 'Asegúrate de que el humor sea apropiado para el contexto.',
          tip: 'La creatividad puede ser un gran rompehielos, úsala sabiamente.'
        };
        break;
    }

    setLastFeedback(feedback);
    setShowFeedback(true);
    setTotalScore(prev => prev + (feedback.score.confidence + feedback.score.empathy + feedback.score.clarity + feedback.score.naturalness));
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Básico': return 'bg-green-100 text-green-800';
      case 'Intermedio': return 'bg-yellow-100 text-yellow-800';
      case 'Avanzado': return 'bg-orange-100 text-orange-800';
      case 'Experto': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Casual': return '☕';
      case 'Profesional': return '💼';
      case 'Personal': return '❤️';
      case 'Conflictivo': return '⚡';
      default: return '💬';
    }
  };

  return (
    <Card className={`bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200 transition-all duration-300 ${
      isExpanded ? 'fixed inset-4 z-50 overflow-auto' : ''
    }`}>
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <MessageCircle className="h-5 w-5" />
            Conversation Craft
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
        {/* Estadísticas del jugador */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-white/60 rounded-lg">
            <div className="text-2xl font-bold text-blue-800">{totalScore}</div>
            <div className="text-sm text-blue-600">Puntos</div>
          </div>
          <div className="p-3 bg-white/60 rounded-lg">
            <div className="text-2xl font-bold text-blue-800">{streak}</div>
            <div className="text-sm text-blue-600">Días seguidos</div>
          </div>
          <div className="p-3 bg-white/60 rounded-lg">
            <div className="text-2xl font-bold text-blue-800">{unlockedSkills}</div>
            <div className="text-sm text-blue-600">Habilidades</div>
          </div>
        </div>

        {/* Selector de nivel */}
        <div className="space-y-3">
          <h3 className="font-semibold text-blue-800">Selecciona tu nivel</h3>
          <div className="grid grid-cols-2 gap-2">
            {['Básico', 'Intermedio', 'Avanzado', 'Experto'].map((level) => (
              <Button
                key={level}
                variant={currentLevel === level ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentLevel(level as typeof currentLevel)}
                className={`${getLevelColor(level)} text-xs`}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>

        {/* Escenario actual o botón para iniciar */}
        {!currentScenario ? (
          <div className="text-center space-y-4">
            <p className="text-slate-600">
              ¡Bienvenido a Conversation Craft! Hoy vamos a practicar tus habilidades sociales en un entorno completamente seguro.
            </p>
            <p className="text-sm text-slate-500">
              Recuerda: no hay respuestas perfectas, solo oportunidades de aprender y crecer.
            </p>
            <Button 
              onClick={() => startScenario()}
              className="bg-blue-500 hover:bg-blue-600"
            >
              ¿Estás listo para tu primera conversación?
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Información del escenario */}
            <div className="bg-white/60 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(currentScenario.level)}`}>
                    {currentScenario.level}
                  </span>
                  <span className="text-lg">
                    {getTypeIcon(currentScenario.type)} {currentScenario.type}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <p><strong>Escenario:</strong> {currentScenario.context}</p>
                <p><strong>Personaje:</strong> {currentScenario.character}</p>
                <p><strong>Objetivo:</strong> {currentScenario.objective}</p>
              </div>
            </div>

            {/* Diálogo del NPC */}
            <div className="bg-blue-100 rounded-lg p-4">
              <p className="font-medium text-blue-800">
                {currentScenario.character.split(' - ')[0]} dice:
              </p>
              <p className="text-slate-700 italic">"{currentScenario.npcDialogue}"</p>
            </div>

            {/* Opciones de respuesta */}
            {!showFeedback && (
              <div className="space-y-2">
                <p className="font-semibold text-slate-800">¿Cómo respondes?</p>
                {currentScenario.responses.map((response) => (
                  <Button
                    key={response.id}
                    variant="outline"
                    onClick={() => handleResponse(response.id)}
                    className="w-full text-left justify-start p-4 h-auto whitespace-normal"
                  >
                    <span className="font-bold mr-2">{response.id})</span>
                    {response.text}
                  </Button>
                ))}
              </div>
            )}

            {/* Feedback */}
            {showFeedback && lastFeedback && (
              <div className="space-y-4">
                <div className="bg-white/80 rounded-lg p-4 space-y-4">
                  <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Feedback
                  </h4>
                  
                  {/* Puntuaciones */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Confianza</span>
                        <span>+{lastFeedback.score.confidence}</span>
                      </div>
                      <Progress value={(lastFeedback.score.confidence / 20) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Empatía</span>
                        <span>+{lastFeedback.score.empathy}</span>
                      </div>
                      <Progress value={(lastFeedback.score.empathy / 20) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Claridad</span>
                        <span>+{lastFeedback.score.clarity}</span>
                      </div>
                      <Progress value={(lastFeedback.score.clarity / 20) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Naturalidad</span>
                        <span>+{lastFeedback.score.naturalness}</span>
                      </div>
                      <Progress value={(lastFeedback.score.naturalness / 20) * 100} className="h-2" />
                    </div>
                  </div>

                  {/* Análisis y consejos */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-slate-700">💡 Análisis:</p>
                      <p className="text-sm text-slate-600">{lastFeedback.analysis}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">🎯 Mejora:</p>
                      <p className="text-sm text-slate-600">{lastFeedback.improvement}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">📚 Tip:</p>
                      <p className="text-sm text-slate-600">{lastFeedback.tip}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => startScenario()}
                    className="bg-blue-500 hover:bg-blue-600 flex-1"
                  >
                    Nueva Conversación
                  </Button>
                  <Button 
                    onClick={() => setCurrentScenario(null)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cambiar Nivel
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {!isExpanded && currentScenario && (
          <div className="text-center">
            <Button onClick={onToggleExpand} variant="outline" className="w-full">
              Ver estadísticas completas
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConversationCraftGame;
