
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Brain, Users, BookOpen, Heart, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Navigation from '@/components/Navigation';
import WelcomeHero from '@/components/WelcomeHero';
import QuickActions from '@/components/QuickActions';
import DailyStats from '@/components/DailyStats';

const Index = () => {
  const [timeSpent, setTimeSpent] = useState(0);
  const [wellbeingScore, setWellbeingScore] = useState(75);

  useEffect(() => {
    // Simular tiempo transcurrido
    const interval = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 60000); // Actualizar cada minuto

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <WelcomeHero />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel principal */}
          <div className="lg:col-span-2 space-y-6">
            <DailyStats timeSpent={timeSpent} wellbeingScore={wellbeingScore} />
            <QuickActions />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Bienestar del día */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Heart className="h-5 w-5" />
                  Tu Bienestar Hoy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-green-700">Puntuación general</span>
                      <span className="font-medium text-green-800">{wellbeingScore}/100</span>
                    </div>
                    <Progress value={wellbeingScore} className="h-3" />
                  </div>
                  <div className="text-sm text-green-700">
                    ¡Excelente! Mantén estos hábitos saludables.
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Acceso rápido */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-slate-800">Acceso Rápido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/monitor" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    Monitoreo Digital
                  </Button>
                </Link>
                <Link to="/relaxation" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Brain className="h-4 w-4 mr-2" />
                    Relajación
                  </Button>
                </Link>
                <Link to="/chat" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Chat Especialista
                  </Button>
                </Link>
                <Link to="/resources" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Recursos
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
