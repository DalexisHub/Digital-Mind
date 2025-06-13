
import { Play, Pause, Coffee, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const QuickActions = () => {
  const { toast } = useToast();

  const handleBreakStart = () => {
    toast({
      title: "¡Descanso iniciado! 🌱",
      description: "Tómate 5 minutos para relajarte. Tu mente lo agradecerá.",
      duration: 5000,
    });
  };

  const handleEmergency = () => {
    toast({
      title: "Contacto de emergencia",
      description: "Línea de crisis: 113 - Siempre hay ayuda disponible",
      duration: 8000,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-slate-800">Acciones Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            onClick={handleBreakStart}
            className="h-20 flex-col gap-2 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
          >
            <Coffee className="h-6 w-6" />
            <span className="text-sm">Descanso</span>
          </Button>

          <Button
            variant="outline"
            className="h-20 flex-col gap-2 border-blue-200 hover:bg-blue-50"
          >
            <Play className="h-6 w-6 text-blue-600" />
            <span className="text-sm text-blue-700">Meditación</span>
          </Button>

          <Button
            variant="outline"
            className="h-20 flex-col gap-2 border-purple-200 hover:bg-purple-50"
          >
            <Pause className="h-6 w-6 text-purple-600" />
            <span className="text-sm text-purple-700">Pausar Apps</span>
          </Button>

          <Button
            onClick={handleEmergency}
            variant="outline"
            className="h-20 flex-col gap-2 border-red-200 hover:bg-red-50"
          >
            <Phone className="h-6 w-6 text-red-600" />
            <span className="text-sm text-red-700">Ayuda</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
