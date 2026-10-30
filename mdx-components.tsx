import type { MDXComponents } from "mdx/types";
import type { ComponentProps, ReactElement } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Diagram } from "@/components/Diagram";

const components: MDXComponents = {
  Diagram,
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
