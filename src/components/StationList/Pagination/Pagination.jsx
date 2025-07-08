import Link from 'next/link';
import './Pagination.css';

const Pagination = ({ stations, page, name, country, language, tag, pageNum }) => {
  const itemsPerPage = 20;
  const totalPages = Math.ceil(stations.length / itemsPerPage);
  const currentPage = parseInt(pageNum) || 1;

  const queries = [name && 'name=' + name, country && 'country=' + country, language && 'language=' + language, tag && 'tag=' + tag]
    .filter(Boolean)
    .join('&')
    .replaceAll(' ', '+');

  const makeHref = (p) => {
    const base = page === 'search' ? `/search/page/${p}` : `/stations/${p}`;
    return queries ? `${base}?${queries}` : base;
  };

  // Helper to render a page link
  const PageLink = (p) => (
    <Link key={`page-${p}`} href={makeHref(p)}>
      <button className={p === currentPage ? 'active' : ''}>{p}</button>
    </Link>
  );

  if (totalPages <= 1) return null;

  // Pages to show:
  const pages = [];

  // Arrow: ←
  if (currentPage > 1) {
    pages.push(
      <Link key="prev" href={makeHref(currentPage - 1)}>
        <button className="arrow">←</button>
      </Link>
    );
  }

  if (totalPages <= 6) {
    // Показываем все страницы, если их <= 6
    for (let i = 1; i <= totalPages; i++) {
      pages.push(PageLink(i));
    }
  } else {
    // Показываем первые 3
    for (let i = 1; i <= 3; i++) {
      pages.push(PageLink(i));
    }

    if (currentPage > 5) {
      pages.push(<span key="dots-start" className="dots">...</span>);
    }

    // Центральный текущий элемент (если не входит в первые/последние 3)
    if (currentPage > 3 && currentPage < totalPages - 2) {
      pages.push(PageLink(currentPage));
    }

    if (currentPage < totalPages - 4) {
      pages.push(<span key="dots-end" className="dots">...</span>);
    }

    // Показываем последние 3
    for (let i = totalPages - 2; i <= totalPages; i++) {
      if (i > 3) pages.push(PageLink(i));
    }
  }

  // Arrow: →
  if (currentPage < totalPages) {
    pages.push(
      <Link key="next" href={makeHref(currentPage + 1)}>
        <button className="arrow">→</button>
      </Link>
    );
  }

  return (
    <div className="pagination">
      {pages}
    </div>
  );
};

export default Pagination;
