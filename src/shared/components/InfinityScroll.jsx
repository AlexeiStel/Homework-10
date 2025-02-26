import { useEffect, useRef } from 'react';

const InfinityScroll = ({ children, loadMore, isLoading, hasMore }) => {
  const observer = useRef(null);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (isLoading || !hasMore) return;

    const currentLoadMore = loadMoreRef.current;

    const options = {
      root: null, 
      rootMargin: '20px',
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore(); 
      }
    }, options);

    if (currentLoadMore) {
      observer.current.observe(currentLoadMore);
    }

    return () => {
      if (observer.current && currentLoadMore) {
        observer.current.unobserve(currentLoadMore);
      }
    };
  }, [isLoading, hasMore, loadMore]);

  return (
    <div>
      {children}
      {hasMore && !isLoading && (
        <div ref={loadMoreRef} style={{ height: '20px', backgroundColor: 'transparent' }} />
      )}
      {isLoading && <p>Загрузка...</p>}
    </div>
  );
};

export default InfinityScroll;
