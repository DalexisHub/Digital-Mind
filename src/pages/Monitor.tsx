
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Clock, Smartphone, Calendar, TrendingDown, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Navigation from '@/components/Navigation';

const Monitor = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const weeklyData = [
    { name: 'Lun', hours: 6.5, apps: 45 },
    { name: 'Mar', hours: 8.2, apps: 52 },
    { name: 'Mié', hours: 7.1, apps: 48 },
    { name: 'Jue', hours: 9.3, apps: 61 },
    { name: 'Vie', hours: 5.8, apps: 39 },
    { name: 'Sáb', hours: 4.2, apps: 28 },
    { name: 'Dom', hours: 3.9, apps: 31 },
  ];

  const appUsageData = [
    { name: 'Instagram', value: 35, color: '#E1306C' },
    { name: 'TikTok', value: 25, color: '#000000' },
    { name: 'WhatsApp', value: 20, color: '#25D366' },
    { name: 'YouTube', value: 15, color: '#FF0000' },
    { name: 'Otras', value: 5, color: '#8B5CF6' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-slate-800">Monitoreo Digital</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Comprende tus patrones de uso digital para tomar decisiones más conscientes sobre tu tiempo
          </p>
        </div>

        {/* Controles de período */}
        <div className="flex justify-center">
          <div className="bg-white rounded-lg p-1 shadow-sm border">
            {[
              { id: 'today', label: 'Hoy' },
              { id: 'week', label: 'Esta semana' },
              { id: 'month', label: 'Este mes' }
            ].map((period) => (
              <Button
                key={period.id}
                variant={selectedPeriod === period.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedPeriod(period.id)}
                className="mx-1"
              >
                {period.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Estadísticas principales */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gráfico de barras - Uso semanal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-blue-600" />
                  Tiempo de Pantalla Semanal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip 
                      formatter={(value, name) => [`${value}h`, 'Horas de uso']}
                      labelStyle={{ color: '#1e293b' }}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="hours" fill="url(#gradient)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#1d4ed8" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Alertas y recomendaciones */}
            <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-800">
                  <Eye className="h-5 w-5" />
                  Recomendaciones Personalizadas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white/60 rounded-lg p-4">
                  <h4 className="font-medium text-amber-800 mb-2">📱 Uso de Instagram</h4>
                  <p className="text-sm text-amber-700">
                    Has superado tu límite diario en Instagram. Considera tomar un descanso de 15 minutos.
                  </p>
                </div>
                <div className="bg-white/60 rounded-lg p-4">
                  <h4 className="font-medium text-amber-800 mb-2">⏰ Patrón de uso nocturno</h4>
                  <p className="text-sm text-amber-700">
                    Tu uso de dispositivos después de las 10 PM puede afectar tu sueño. Te sugerimos activar el modo nocturno.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel lateral */}
          <div className="space-y-6">
            {/* Uso por categorías */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Uso por Apps</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={appUsageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {appUsageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Uso']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 mt-4">
                  {appUsageData.map((app) => (
                    <div key={app.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: app.color }}
                        ></div>
                        <span>{app.name}</span>
                      </div>
                      <span className="font-medium">{app.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Metas diarias */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Metas de Hoy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Límite de pantalla</span>
                    <span>6h / 8h</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Descansos realizados</span>
                    <span>4 / 6</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Sin dispositivos antes de dormir</span>
                    <span>✅ Completado</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Monitor;
