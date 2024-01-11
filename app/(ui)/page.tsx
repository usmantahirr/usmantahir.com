import { Suspense } from "react";
import Profile from "@/components/sections/Profile";
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";

export default function Home() {

  return (
    <main className="flex flex-col items-center px-4">
      <Suspense fallback="Loading...">
        <Profile />
      </Suspense>
      <Suspense fallback="Loading...">
        <Experience />
      </Suspense>
      <Contact />
    </main>
  );
}
