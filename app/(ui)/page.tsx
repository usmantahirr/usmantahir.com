import Contact from "@/components/sections/contact";
import Experience from "@/components/sections/experience";
import Index from "@/components/sections/Projects";
import Skills from "@/components/sections/skills";
import Profile from "@/components/sections/Profile";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Profile />
      <Index />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}
