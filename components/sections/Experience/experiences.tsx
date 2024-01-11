"use client";

import React from "react";
import SectionHeading from "@/components/SectionHeading";
import { useSectionInView } from "@/lib/hooks";
import type { Experience } from "@/types/Experience";
import ExperienceComponent from "./experience";

export default function Experiences({ experiences }: {
  experiences: Experience[]
}) {
  const { ref } = useSectionInView("Experience");

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading>My experience</SectionHeading>
      {
        experiences.map(experience => <ExperienceComponent key={experience._id} experience={experience} />)
      }
    </section>
  );
}
