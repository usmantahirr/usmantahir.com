import Profile from "@/components/sections/Profile";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/Projects";

export default function Home() {

  return (
    <main className="flex flex-col items-center px-4">
      <Profile />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}
