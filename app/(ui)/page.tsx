import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Profile from "@/components/Profile";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Profile />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}
