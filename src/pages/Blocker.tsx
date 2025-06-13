
import { useState, useEffect } from 'react';
import { Shield, Clock, Smartphone, Globe, Pause, Play, Settings, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';

const Blocker = () => {
  const { toast } = useToast();
  const [isBlocking, setIsBlocking] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [sessionDuration, setSessionDuration] = useState(25);
  const [blockedApps, setBlockedApps] = useState([
    { name: 'Instagram', icon: '📷', blocked: true, timeSpent: 45 },
    { name: 'TikTok', icon: '🎵', blocked: true, timeSpent: 38 },
    { name: 'Facebook', icon: '👥', blocked: false, timeSpent: 22 },
    { name: 'YouTube', icon: '▶️', blocked: false, timeSpent: 67 },
    { name: 'Twitter', icon: '🐦', blocked: true, timeSpent: 31 },
    { name: 'WhatsApp', icon: '💬', blocked: false, timeSpent: 89 },
  ]);
  const [customWebsites, setCustomWebsites] = useState([
    'reddit.com',
    'netflix.com',
    'twitch.tv'
  ]);
  const [newWebsite, setNewWebsite] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBlocking && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsBlocking(false);
            toast({
              title: "¡Sesión de enfoque completada! 🎉",
              description: "Has mantenido el foco durante toda la sesión. ¡Excelente trabajo!",
              duration: 5000,
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBlocking, timeRemaining, toast]);

  const startBlockingSession = () => {
    setTimeRemaining(sessionDuration * 60);
    setIsBlocking(true);
    toast({
      title: "Sesión de enfoque iniciada 🎯",
      description: `Bloqueo activo por ${sessionDuration} minutos. ¡Mantén el foco!`,
      duration: 3000,
    });
  };

  const stopBlockingSession = () => {
    setIsBlocking(false);
    setTimeRemaining(0);
    toast({
      title: "Sesión pausada",
      description: "El bloqueo ha sido desactivado.",
      duration: 2000,
    });
  };

  const toggleAppBlock = (appIndex: number) => {
    setBlockedApps(prev => 
      prev.map((app, index) => 
        index === appIndex ? { ...app, blocked: !app.blocked } : app
      )
    );
  };

  const addCustomWebsite = () => {
    if (newWebsite.trim() && !customWebsites.includes(newWebsite.trim())) {
      setCustomWebsites(prev => [...prev, newWebsite.trim()]);
      setNewWebsite('');
      toast({
        title: "Sitio web agregado",
        description: `${newWebsite} se agregó a la lista de bloqueo.`,
        duration: 2000,
      });
    }
  };

  const removeWebsite = (website: string) => {
    setCustomWebsites(prev => prev.filter(site => site !== website));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const blockedAppsCount = blockedApps.filter(app => app.blocked).length;
  const totalTimeSpent = blockedApps.reduce((total, app) => total + app.timeSpent, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-800">Control de Bloqueo</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Mantén el foco bloqueando aplicaciones y sitios web que te distraen
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel principal de control */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sesión de enfoque */}
            <Card className={`${isBlocking ? 'bg-gradient-to-br from-red-50 to-orange-50 border-red-200' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-800">
                  <Shield className="h-6 w-6" />
                  Sesión de Enfoque
                  {isBlocking && <Badge className="bg-red-500">Activa</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isBlocking ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Label htmlFor="duration" className="text-slate-700">Duración (minutos):</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={sessionDuration}
                        onChange={(e) => setSessionDuration(Number(e.target.value))}
                        min="5"
                        max="180"
                        className="w-24"
                      />
                    </div>
                    <Button 
                      onClick={startBlockingSession}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Iniciar Sesión de Enfoque
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-800 mb-2">
                        {formatTime(timeRemaining)}
                      </div>
                      <Progress 
                        value={(timeRemaining / (sessionDuration * 60)) * 100} 
                        className="h-3"
                      />
                      <p className="text-sm text-slate-600 mt-2">
                        Tiempo restante de la sesión
                      </p>
                    </div>
                    <Button 
                      onClick={stopBlockingSession}
                      variant="outline"
                      className="w-full border-red-300 text-red-700 hover:bg-red-50"
                    >
                      <Pause className="h-4 w-4 mr-2" />
                      Pausar Sesión
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Apps bloqueadas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-800">
                  <Smartphone className="h-6 w-6" />
                  Aplicaciones
                  <Badge variant="outline">{blockedAppsCount} bloqueadas</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {blockedApps.map((app, index) => (
                    <div key={app.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{app.icon}</span>
                        <div>
                          <p className="font-medium text-slate-800">{app.name}</p>
                          <p className="text-sm text-slate-500">{app.timeSpent}min hoy</p>
                        </div>
                      </div>
                      <Switch
                        checked={app.blocked}
                        onCheckedChange={() => toggleAppBlock(index)}
                        disabled={isBlocking}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sitios web personalizados */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-slate-800">
                  <Globe className="h-6 w-6" />
                  Sitios Web Personalizados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="ejemplo.com"
                    value={newWebsite}
                    onChange={(e) => setNewWebsite(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addCustomWebsite()}
                  />
                  <Button onClick={addCustomWebsite} variant="outline">
                    Agregar
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {customWebsites.map((website) => (
                    <Badge 
                      key={website} 
                      variant="secondary" 
                      className="cursor-pointer hover:bg-red-100 hover:text-red-700"
                      onClick={() => removeWebsite(website)}
                    >
                      {website} ✕
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar con estadísticas */}
          <div className="space-y-6">
            {/* Estadísticas del día */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Clock className="h-5 w-5" />
                  Estadísticas Hoy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-800">{totalTimeSpent}min</div>
                  <p className="text-sm text-blue-600">Tiempo total en apps</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-800">3</div>
                  <p className="text-sm text-green-600">Sesiones completadas</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-800">76%</div>
                  <p className="text-sm text-purple-600">Reducción vs ayer</p>
                </div>
              </CardContent>
            </Card>

            {/* Consejos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <AlertCircle className="h-5 w-5" />
                  Consejos de Enfoque
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <p className="text-sm text-yellow-800">
                    <strong>Técnica Pomodoro:</strong> Alterna 25 min de trabajo con 5 min de descanso.
                  </p>
                </div>
                <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                  <p className="text-sm text-green-800">
                    <strong>Zona sin distracciones:</strong> Mantén el teléfono en otra habitación.
                  </p>
                </div>
                <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                  <p className="text-sm text-blue-800">
                    <strong>Objetivos claros:</strong> Define qué quieres lograr antes de empezar.
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

export default Blocker;
