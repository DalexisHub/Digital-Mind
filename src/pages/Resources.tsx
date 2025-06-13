
import { useState } from 'react';
import { BookOpen, ExternalLink, Download, Heart, Brain, Shield, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const resourceCategories = [
    { id: 'all', name: 'Todos', icon: BookOpen },
    { id: 'anxiety', name: 'Ansiedad', icon: Heart },
    { id: 'sleep', name: 'Sueño', icon: Brain },
    { id: 'digital', name: 'Bienestar Digital', icon: Shield },
    { id: 'social', name: 'Redes Sociales', icon: Users },
    { id: 'time', name: 'Gestión del Tiempo', icon: Clock },
  ];

  const resources = [
    {
      id: 1,
      title: 'Técnicas de Respiración para la Ansiedad',
      description: 'Aprende métodos científicamente probados para reducir la ansiedad mediante ejercicios de respiración.',
      category: 'anxiety',
      type: 'Artículo',
      readTime: '5 min',
      author: 'Dr. Ana García',
      url: '#',
      featured: true,
    },
    {
      id: 2,
      title: 'Higiene del Sueño Digital',
      description: 'Cómo los dispositivos afectan tu descanso y qué hacer para mejorar la calidad del sueño.',
      category: 'sleep',
      type: 'Guía',
      readTime: '8 min',
      author: 'Dr. Carlos Mendoza',
      url: '#',
      featured: true,
    },
    {
      id: 3,
      title: 'Desintoxicación Digital: Primeros Pasos',
      description: 'Una guía práctica para reducir el tiempo de pantalla y crear hábitos digitales saludables.',
      category: 'digital',
      type: 'Guía',
      readTime: '12 min',
      author: 'Lic. María López',
      url: '#',
      featured: false,
    },
    {
      id: 4,
      title: 'Redes Sociales y Autoestima',
      description: 'Entendiendo el impacto psicológico de las redes sociales y cómo proteger tu bienestar mental.',
      category: 'social',
      type: 'Artículo',
      readTime: '7 min',
      author: 'Psic. Roberto Silva',
      url: '#',
      featured: false,
    },
    {
      id: 5,
      title: 'Técnica Pomodoro para el Bienestar',
      description: 'Cómo usar la gestión del tiempo para reducir el estrés y mejorar la productividad.',
      category: 'time',
      type: 'Tutorial',
      readTime: '10 min',
      author: 'Coach Elena Ruiz',
      url: '#',
      featured: false,
    },
    {
      id: 6,
      title: 'Mindfulness en la Era Digital',
      description: 'Ejercicios de atención plena diseñados específicamente para usuarios de tecnología.',
      category: 'digital',
      type: 'Ejercicios',
      readTime: '15 min',
      author: 'Dr. Miguel Torres',
      url: '#',
      featured: true,
    },
  ];

  const testimonials = [
    {
      name: 'Laura M.',
      age: 28,
      text: 'Los recursos de bienestar digital me ayudaron a reducir mi tiempo de pantalla en un 40%. Me siento mucho más tranquila.',
      category: 'digital',
    },
    {
      name: 'Carlos R.',
      age: 35,
      text: 'Las técnicas de respiración fueron un cambio total. Ahora puedo manejar mejor mis episodios de ansiedad.',
      category: 'anxiety',
    },
    {
      name: 'Ana S.',
      age: 24,
      text: 'Mejoré mi higiene del sueño siguiendo las guías. Duermo mejor y me despierto más descansada.',
      category: 'sleep',
    },
  ];

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

  const featuredResources = resources.filter(resource => resource.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-800">Centro de Recursos</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Información confiable y herramientas respaldadas por expertos para tu bienestar digital y mental
          </p>
        </div>

        <Tabs defaultValue="resources" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="resources">Recursos</TabsTrigger>
            <TabsTrigger value="featured">Destacados</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonios</TabsTrigger>
          </TabsList>

          <TabsContent value="resources" className="space-y-6">
            {/* Category Filter */}
            <Card>
              <CardHeader>
                <CardTitle className="text-slate-800">Filtrar por Categoría</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {resourceCategories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = selectedCategory === category.id;
                    return (
                      <Button
                        key={category.id}
                        variant={isSelected ? "default" : "outline"}
                        onClick={() => setSelectedCategory(category.id)}
                        className="flex items-center gap-2"
                      >
                        <Icon className="h-4 w-4" />
                        {category.name}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="space-y-3">
                    <div className="flex items-start justify-between">
                      <Badge variant="secondary">{resource.type}</Badge>
                      {resource.featured && <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">Destacado</Badge>}
                    </div>
                    <CardTitle className="text-lg text-slate-800 line-clamp-2">
                      {resource.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600 text-sm line-clamp-3">
                      {resource.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span>{resource.author}</span>
                      <span>{resource.readTime} de lectura</span>
                    </div>
                    <Button className="w-full" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Leer Recurso
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredResources.map((resource) => (
                <Card key={resource.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">Destacado</Badge>
                      <Badge variant="outline">{resource.type}</Badge>
                    </div>
                    <CardTitle className="text-xl text-slate-800">
                      {resource.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600">
                      {resource.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <span className="font-medium">{resource.author}</span>
                      <span>{resource.readTime} de lectura</span>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                      <Download className="h-4 w-4 mr-2" />
                      Acceder Ahora
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="pt-6">
                    <blockquote className="text-slate-700 italic mb-4">
                      "{testimonial.text}"
                    </blockquote>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-800">{testimonial.name}</p>
                        <p className="text-sm text-slate-500">{testimonial.age} años</p>
                      </div>
                      <Heart className="h-5 w-5 text-red-500" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Resources;
