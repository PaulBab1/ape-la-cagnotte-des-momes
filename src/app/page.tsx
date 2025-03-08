import { ProjectCardWrapper } from '@/components/project-card-wrapper'
import { prisma } from '@/lib/prisma'
import { Project } from '@/types/project'
import { Button } from '@/components/ui/button'
import { HandHeart, School2, Users } from 'lucide-react'
import Link from 'next/link'
import { AnimatedSection } from '@/components/ui/animated-section'

async function getProjects(): Promise<Project[]> {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  })
  
  return projects.map(project => ({
    ...project,
    imageUrl: project.imageUrl ?? undefined,
  }))
}

export default async function Home() {
  const projects = await getProjects()

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        {/* Image de fond */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        />
        
        {/* Calque avec éléments graphiques */}
        <div className="absolute inset-0 bg-black/40">
          <div className="absolute inset-0" style={{ 
            background: `
              radial-gradient(circle at 20% 30%, rgba(132, 204, 22, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(132, 204, 22, 0.1) 0%, transparent 40%),
              linear-gradient(60deg, rgba(132, 204, 22, 0.05) 0%, transparent 50%)
            `
          }} />
          <div className="absolute -left-10 top-20 w-40 h-40 rounded-full bg-lime-400/10 blur-3xl" />
          <div className="absolute -right-10 bottom-20 w-60 h-60 rounded-full bg-lime-400/10 blur-3xl" />
        </div>

        {/* Contenu */}
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Ensemble, enrichissons l'avenir de nos enfants
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 drop-shadow-lg text-slate-200">
            L'APE la Cagnotte des Mômes de l'École d'Épinay-sur-Odon s'engage à créer un environnement 
            éducatif stimulant pour nos élèves.
          </p>
          <Button size="lg" variant="default" className="bg-white text-slate-900 hover:bg-slate-100 shadow-lg">
            Faire un don
          </Button>
        </div>
      </section>

      {/* Notre Impact */}
      <section className="py-16 bg-gradient-to-b from-orange-50 to-orange-100/50">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-orange-500 via-red-600 to-purple-600 text-transparent bg-clip-text">
              Notre Impact
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection delay={200}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-100 to-amber-200 flex items-center justify-center shadow-lg shadow-orange-100">
                  <School2 className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-orange-900">Enrichissement Éducatif</h3>
                <p className="text-orange-800">
                  Financement de matériel pédagogique et d'activités enrichissantes
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={400}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center shadow-lg shadow-amber-100">
                  <Users className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-amber-900">Communauté Soudée</h3>
                <p className="text-amber-800">
                  Une communauté de parents engagés pour le bien-être des élèves
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={600}>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose-100 to-purple-100 flex items-center justify-center shadow-lg shadow-rose-100">
                  <HandHeart className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-rose-900">Soutien Flexible</h3>
                <p className="text-rose-800">
                  Des dons mensuels ou ponctuels pour soutenir nos actions
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Réalisations Section */}
      <section className="relative py-16 scroll-mt-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:16px_16px] opacity-50" />
        <div className="container mx-auto px-4 md:px-6 relative">
          <AnimatedSection className="flex justify-center items-center mb-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 via-pink-600 to-pink-500 text-transparent bg-clip-text">
                Nos Réalisations
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Grâce à votre générosité, nous enrichissons continuellement l'expérience scolaire de nos enfants. 
                Découvrez les projets que nous avons pu réaliser ensemble.
              </p>
            </div>
          </AnimatedSection>

          {projects.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              Aucun projet pour le moment.
            </p>
          ) : (
            <AnimatedSection delay={200}>
              <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
                {projects.map((project) => (
                  <ProjectCardWrapper 
                    key={project.id}
                    project={project}
                    className="transform hover:scale-[1.01] transition-transform duration-300"
                  />
                ))}
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-transparent to-pink-50/50 py-8 text-center">
        <p className="text-slate-600">
          <a href="mailto:lacagnottedesmomes14310@gmail.com" className="hover:text-pink-600 transition-colors">
            lacagnottedesmomes14310@gmail.com
          </a>
        </p>
      </footer>
    </main>
  )
}
