import {
  bundledLanguages,
  createCssVariablesTheme,
  createHighlighter,
} from "shiki";

// Tokens are colored by the --shiki-* variables in globals.css, so one render
// serves both themes and code stays on the site's palette.
const theme = createCssVariablesTheme({ name: "palette" });
const highlighter = createHighlighter({ themes: [theme], langs: [] });

export async function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const shiki = await highlighter;
  const known = lang in bundledLanguages;
  if (known) await shiki.loadLanguage(lang as keyof typeof bundledLanguages);

  const html = shiki.codeToHtml(code, {
    lang: known ? lang : "text",
    theme: "palette",
    transformers: [
      {
        pre(node) {
          node.properties.role = "group";
          node.properties["aria-label"] = "Code sample";
        },
      },
    ],
  });

  return <div className="codeblock" dangerouslySetInnerHTML={{ __html: html }} />;
}
