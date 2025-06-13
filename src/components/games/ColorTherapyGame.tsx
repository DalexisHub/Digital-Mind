
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, Shuffle } from 'lucide-react';

const ColorTherapyGame = () => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [currentMood, setCurrentMood] = useState('');

  const colors = [
    { name: 'Tranquilidad', color: '#87CEEB', emotion: 'calma' },
    { name: 'Energía', color: '#FFD700', emotion: 'alegría' },
    { name: 'Naturaleza', color: '#90EE90', emotion: 'equilibrio' },
    { name: 'Pasión', color: '#FF6B6B', emotion: 'fuerza' },
    { name: 'Serenidad', color: '#DDA0DD', emotion: 'paz' },
    { name: 'Confianza', color: '#4169E1', emotion: 'seguridad' },
    { name: 'Creatividad', color: '#FF8C00', emotion: 'inspiración' },
    { name: 'Pureza', color: '#F8F8FF', emotion: 'claridad' },
  ];

  const moods = [
    { name: 'Ansioso/a', recommendation: ['#87CEEB', '#DDA0DD', '#90EE90'] },
    { name: 'Triste', recommendation: ['#FFD700', '#FF8C00', '#FF6B6B'] },
    { name: 'Estresado/a', recommendation: ['#90EE90', '#87CEEB', '#F8F8FF'] },
    { name: 'Energético/a', recommendation: ['#4169E1', '#FF6B6B', '#FF8C00'] },
  ];

  const handleColorClick = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const getRecommendation = () => {
    const selectedMood = moods.find(mood => mood.name === currentMood);
    return selectedMood?.recommendation || [];
  };

  const generateRandomPalette = () => {
    const shuffled = [...colors].sort(() => 0.5 - Math.random());
    const palette = shuffled.slice(0, 3).map(c => c.color);
    setSelectedColors(palette);
  };

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-yellow-100 border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-800">
          <Palette className="h-5 w-5" />
          Terapia de Colores
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">¿Cómo te sientes hoy?</h3>
          <div className="grid grid-cols-2 gap-2">
            {moods.map((mood) => (
              <Button
                key={mood.name}
                variant={currentMood === mood.name ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentMood(mood.name)}
                className="text-xs"
              >
                {mood.name}
              </Button>
            ))}
          </div>
        </div>

        {currentMood && (
          <div className="p-3 bg-white/60 rounded-lg">
            <h4 className="text-sm font-semibold text-slate-700 mb-2">
              Colores recomendados para ti:
            </h4>
            <div className="flex gap-2">
              {getRecommendation().map((color, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-slate-800">Crea tu paleta personal</h3>
            <Button
              onClick={generateRandomPalette}
              size="sm"
              variant="outline"
              className="flex items-center gap-1"
            >
              <Shuffle className="h-3 w-3" />
              Sorpresa
            </Button>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {colors.map((colorItem) => (
              <div
                key={colorItem.name}
                onClick={() => handleColorClick(colorItem.color)}
                className={`aspect-square rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                  selectedColors.includes(colorItem.color)
                    ? 'border-slate-800 scale-95'
                    : 'border-white hover:scale-105'
                } shadow-sm`}
                style={{ backgroundColor: colorItem.color }}
                title={`${colorItem.name} - ${colorItem.emotion}`}
              />
            ))}
          </div>
        </div>

        {selectedColors.length > 0 && (
          <div className="p-4 bg-white/60 rounded-lg">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Tu paleta seleccionada:</h4>
            <div 
              className="h-16 rounded-lg shadow-inner"
              style={{
                background: `linear-gradient(90deg, ${selectedColors.join(', ')})`
              }}
            />
            <p className="text-xs text-slate-600 mt-2">
              Observa estos colores durante unos minutos y respira profundamente
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ColorTherapyGame;
