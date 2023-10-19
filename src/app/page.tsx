import Intro from '@/app/components/intro';
import SectionDivider from '@/app/components/section-divider';
import About from '@/app/components/about';
import Projects from '@/app/components/projects';
import Skills from '@/app/components/skills';
import Experience from '@/app/components/experience';

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <SectionDivider />
      <About />
      <Projects />
      <Skills />
      <Experience />
    </main>
  );
}
