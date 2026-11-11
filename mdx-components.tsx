import type { MDXComponents } from "mdx/types";
import type { ComponentProps, ReactElement } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Diagram } from "@/components/Diagram";
import { Clip } from "@/components/Clip";
import { Cast, Cycle, Dates, Figure, Funnel, Lesson, RingMark, Rule, Split, Steps, Summary, Todo } from "@/components/PostParts";
import { Bars, Evidence, Flow, PairCheck, SeatMap } from "@/components/RegionParts";

const components: MDXComponents = {
  Bars,
  Cast,
  Clip,
  Cycle,
  Dates,
  Evidence,
  Diagram,
  Figure,
  Flow,
  Funnel,
  Lesson,
  PairCheck,
  RingMark,
  Rule,
  SeatMap,
  Split,
  Steps,
  Summary,
  Todo,
  // A fenced block arrives as <pre><code class="language-x">. Inline code
  // skips this and stays a plain <code>.
  pre({ children }) {
    const { className = "", children: code } = (
      children as ReactElement<ComponentProps<"code">>
    ).props;
    return (
      <CodeBlock
        code={String(code).replace(/\n$/, "")}
        lang={className.replace("language-", "")}
      />
    );
  },
  table: (props) => (
    <div className="tablewrap" role="group" aria-label="Table" tabIndex={0}>
      <table {...props} />
    </div>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
