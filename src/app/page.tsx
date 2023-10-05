import Intro from '@/app/components/intro';
import SectionDivider from '@/app/components/section-divider';
import About from '@/app/components/about';

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <SectionDivider />
      <About />
    </main>
  );
}
