
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Paintbrush, RotateCcw, Download } from 'lucide-react';

const ZenDrawing = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#4A90E2');
  const [strokeWidth, setStrokeWidth] = useState(3);

  const colors = [
    '#4A90E2', '#50E3C2', '#B8E986', '#F5A623',
    '#F8E71C', '#BD10E0', '#B4A7D6', '#9013FE',
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(x, y);
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'mi-dibujo-zen.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <Card className="bg-gradient-to-br from-green-50 to-teal-100 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800">
          <Paintbrush className="h-5 w-5" />
          Dibujo Zen
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-semibold text-slate-700">Colores</h4>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600">Grosor:</span>
              <input
                type="range"
                min="1"
                max="10"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(Number(e.target.value))}
                className="w-16"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <div
                key={color}
                onClick={() => setStrokeColor(color)}
                className={`w-6 h-6 rounded-full cursor-pointer border-2 transition-all ${
                  strokeColor === color ? 'border-slate-800 scale-110' : 'border-white'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="border-2 border-slate-200 rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            width={300}
            height={200}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="cursor-crosshair bg-white w-full"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>

        <div className="flex justify-center gap-2">
          <Button
            onClick={clearCanvas}
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <RotateCcw className="h-3 w-3" />
            Limpiar
          </Button>
          <Button
            onClick={downloadDrawing}
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Download className="h-3 w-3" />
            Guardar
          </Button>
        </div>

        <div className="text-xs text-slate-500 text-center p-2 bg-white/60 rounded">
          <p>Dibuja libremente para liberar tensiones y encontrar calma interior</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZenDrawing;
