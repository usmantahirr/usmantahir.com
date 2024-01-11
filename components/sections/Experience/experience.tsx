'use client';

import React from "react";
import moment from "moment/moment";
import Image from 'next/image';
import { CgWorkAlt } from "react-icons/cg";
import { LuGraduationCap } from "react-icons/lu";
import SectionHeading from "@/components/SectionHeading";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";
import { Experience } from "@/types/Experience";
import { PortableText } from "@portabletext/react";

import "react-vertical-timeline-component/style.min.css";


export const formatDate = (from: string, to: string): string => {
  const fromDate = moment(from);
  const toDate = moment(to);

  return `${fromDate.format('MMMM Do YYYY')} - ${to ? toDate.format('MMMM Do YYYY') : 'Present'}`
}

export default function Experience({ experiences }: {
  experiences: Experience[]
}) {
  const { ref } = useSectionInView('Experience');
  const { theme } = useTheme();

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading>My experience</SectionHeading>
      <VerticalTimeline layout='1-column-left'>
        {experiences.map((experience: Experience) => (
          <React.Fragment key={experience._id}>
            <VerticalTimelineElement
              visible={true}
              contentStyle={{
                background: theme === 'light' ? '#f3f4f6' : 'rgba(255, 255, 255, 0.05)',
                boxShadow: 'none',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                textAlign: 'left',
                padding: '1.3rem 2rem',
              }}
              contentArrowStyle={{
                display: 'none'
              }}
              date={formatDate(experience.from, experience.to)}
              icon={React.createElement('img', {
                src: experience.logo,
                class: 'timeline-logo'
              })}
              iconStyle={{
                background: "white",
                width: '60px',
                height: '60px',
                top: '10px',
                left: '-12px',
                fontSize: '2rem',
              }}
            >
              <h3 className="font-semibold capitalize">{experience.institution}</h3>
              <p className="font-normal !mt-0">{experience.location}</p>
              <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75">
                <PortableText value={experience.description} />
              </p>
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
    </section>
  );
}
