type TOCItem = { id: string; label: string };

type Props = {
  items: ReadonlyArray<TOCItem>;
  title?: string;
};

export default function PageTOC({ items, title = "On this page" }: Props) {
  return (
    <aside className="page-toc" aria-label="Table of contents">
      <h3 className="page-toc-title">{title}</h3>
      <ol className="page-toc-list">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.label}</a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
