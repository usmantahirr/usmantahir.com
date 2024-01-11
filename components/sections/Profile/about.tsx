'use client';

import React from 'react';
import SectionHeading from '../../SectionHeading';
import { motion } from 'framer-motion';
import { useSectionInView } from '@/lib/hooks';
import { PortableTextBlock } from 'sanity';
import { PortableText } from '@portabletext/react'

export default function About({ content }: { content: PortableTextBlock[] }) {
  const { ref } = useSectionInView('About');

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[60rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <PortableText value={content} />
    </motion.section>
  );
}
