"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { useSectionInView } from "@/lib/hooks";
import type { Experience } from "@/types/Experience";
import ExperienceComponent from "./experience";

export default function Experiences({ experiences }: { experiences: Experience[] }) {
  const { ref } = useSectionInView("Experience");

  return (
    <motion.section
      ref={ref}
      className="mb-28 scroll-mt-28 sm:mb-40"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="experience"
    >
      <SectionHeading>My experience</SectionHeading>
      {experiences.map((experience) => (
        <ExperienceComponent key={experience._id} experience={experience} />
      ))}
    </motion.section>
  );
}
