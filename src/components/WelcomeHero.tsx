
import { useState, useEffect } from 'react';
import { Sparkles, Sun, Moon, Cloud } from 'lucide-react';

const WelcomeHero = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  const [icon, setIcon] = useState<React.ReactNode>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Buenos días');
      setIcon(<Sun className="h-6 w-6 text-orange-500" />);
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Buenas tardes');
      setIcon(<Cloud className="h-6 w-6 text-blue-500" />);
    } else {
      setGreeting('Buenas noches');
      setIcon(<Moon className="h-6 w-6 text-indigo-500" />);
    }
  }, [currentTime]);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 p-8 text-white">
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <h1 className="text-2xl md:text-3xl font-bold">
            {greeting}, Usuario
          </h1>
          <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
        </div>
        
        <p className="text-lg text-blue-100 mb-6 max-w-2xl">
          Tu bienestar digital es importante. Aquí tienes herramientas para mantener un equilibrio saludable con la tecnología.
        </p>
        
        <div className="flex items-center gap-6 text-sm text-blue-200">
          <div>
            <span className="text-blue-100">Hoy es</span>
            <div className="font-medium text-white">
              {currentTime.toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
          <div>
            <span className="text-blue-100">Hora</span>
            <div className="font-medium text-white">
              {currentTime.toLocaleTimeString('es-ES', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHero;
