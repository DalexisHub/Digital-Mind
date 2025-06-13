
import { Clock, Smartphone, TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface DailyStatsProps {
  timeSpent: number;
  wellbeingScore: number;
}

const DailyStats = ({ timeSpent, wellbeingScore }: DailyStatsProps) => {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const dailyGoal = 480; // 8 horas en minutos
  const currentUsage = 180 + timeSpent; // Simular uso actual
  const progressPercentage = Math.min((currentUsage / dailyGoal) * 100, 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-slate-800">Estadísticas de Hoy</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tiempo de pantalla */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-slate-700">Tiempo de Pantalla</span>
            </div>
            <div className="text-2xl font-bold text-slate-800">
              {formatTime(currentUsage)}
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="text-sm text-slate-600">
              Meta diaria: {formatTime(dailyGoal)}
            </div>
          </div>

          {/* Apps más usadas */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-purple-600" />
              <span className="font-medium text-slate-700">App Principal</span>
            </div>
            <div className="text-2xl font-bold text-slate-800">Instagram</div>
            <div className="text-sm text-slate-600">{formatTime(45)} hoy</div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingDown className="h-4 w-4 text-green-600" />
              <span className="text-green-600">-15% vs ayer</span>
            </div>
          </div>

          {/* Descansos */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="font-medium text-slate-700">Descansos</span>
            </div>
            <div className="text-2xl font-bold text-slate-800">7</div>
            <div className="text-sm text-slate-600">Pausas realizadas</div>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-green-600">+3 vs ayer</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyStats;
