interface ArticleBodyProps {
  html: string;
}

export function ArticleBody({ html }: ArticleBodyProps) {
  return (
    <div
      className="prose-cozy"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
