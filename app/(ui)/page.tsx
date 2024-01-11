import Profile from "@/components/sections/Profile";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";

export default function Home() {

  return (
    <main className="flex flex-col items-center px-4">
      <Profile />
      <Experience />
      <Contact />
    </main>
  );
}
