
import { useState } from 'react';
import { Send, Bot, User, Phone, Calendar, Heart, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Navigation from '@/components/Navigation';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'specialist';
  timestamp: Date;
  senderName?: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy tu asistente de bienestar digital. ¿En qué puedo ayudarte hoy? Puedo ofrecerte consejos sobre salud mental, técnicas de relajación, o conectarte con un especialista.',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simular respuesta del bot
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('ansiedad') || message.includes('ansioso')) {
      return 'Entiendo que estás sintiendo ansiedad. Te recomiendo probar la técnica de respiración 4-7-8. ¿Te gustaría que te guíe a través de un ejercicio de relajación? También puedo conectarte con un especialista si lo necesitas.';
    } else if (message.includes('estrés') || message.includes('estresado')) {
      return 'El estrés es muy común en nuestra era digital. Te sugiero tomar descansos regulares de las pantallas y practicar mindfulness. ¿Has intentado nuestros ejercicios de relajación progresiva?';
    } else if (message.includes('sueño') || message.includes('dormir')) {
      return 'Los problemas de sueño pueden estar relacionados con el uso de dispositivos antes de dormir. Te recomiendo evitar pantallas 1 hora antes de acostarte y establecer una rutina nocturna relajante.';
    } else if (message.includes('redes sociales') || message.includes('instagram') || message.includes('tiktok')) {
      return 'Las redes sociales pueden generar comparación social y ansiedad. Te sugiero limitar tu tiempo en estas apps y considerar desactivar las notificaciones. ¿Te gustaría que te ayude a establecer límites?';
    } else {
      return 'Gracias por compartir eso conmigo. Estoy aquí para apoyarte en tu bienestar digital. ¿Hay algo específico sobre tu relación con la tecnología que te preocupe? También puedo conectarte con un psicólogo especializado si lo prefieres.';
    }
  };

  const scheduleAppointment = () => {
    toast({
      title: "Cita programada ✅",
      description: "Te contactaremos en las próximas 24 horas para confirmar tu cita con un especialista.",
      duration: 5000,
    });
  };

  const callEmergency = () => {
    toast({
      title: "Línea de crisis",
      description: "113 - Servicio de emergencias psicológicas 24/7",
      duration: 8000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Panel lateral */}
          <div className="lg:col-span-1 space-y-6">
            {/* Opciones rápidas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Ayuda Inmediata
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={callEmergency}
                  variant="outline"
                  className="w-full justify-start border-red-200 text-red-700 hover:bg-red-50"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Línea de Crisis
                </Button>
                <Button
                  onClick={scheduleAppointment}
                  variant="outline"
                  className="w-full justify-start border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Agendar Cita
                </Button>
              </CardContent>
            </Card>

            {/* Especialistas disponibles */}
            <Card>
              <CardHeader>
                <CardTitle>Especialistas Online</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="font-medium text-sm">Dra. María López</div>
                    <div className="text-xs text-slate-600">Psicóloga Clínica</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div>
                    <div className="font-medium text-sm">Dr. Carlos Ruiz</div>
                    <div className="text-xs text-slate-600">Terapeuta Digital</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <div>
                    <div className="font-medium text-sm">Dra. Ana García</div>
                    <div className="text-xs text-slate-600">Especialista en Ansiedad</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Temas frecuentes */}
            <Card>
              <CardHeader>
                <CardTitle>Temas Frecuentes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  'Ansiedad digital',
                  'Adicción a redes sociales',
                  'Problemas de sueño',
                  'Estrés laboral',
                  'Autoestima y comparación'
                ].map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setInputMessage(topic)}
                    className="w-full text-left p-2 text-sm bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat principal */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Chat de Bienestar Digital
                </CardTitle>
                <p className="text-blue-100 text-sm">
                  Conversación confidencial y segura con IA especializada
                </p>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Área de mensajes */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.sender !== 'user' && (
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-blue-100">
                            <Bot className="h-4 w-4 text-blue-600" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <div
                          className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-slate-500'
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString('es-ES', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                      
                      {message.sender === 'user' && (
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-slate-200">
                            <User className="h-4 w-4 text-slate-600" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-3 justify-start">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-blue-100">
                          <Bot className="h-4 w-4 text-blue-600" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-slate-100 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-75"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-150"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Área de entrada */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Escribe tu mensaje aquí..."
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1"
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!inputMessage.trim()}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Esta conversación es confidencial. Si tienes una emergencia, llama al 113.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
