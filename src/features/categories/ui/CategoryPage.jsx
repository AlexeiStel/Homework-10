import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchCategoryItems } from "../api/categoryApi";
import { useAuth } from "@auth/model/AuthProvider";
import InfinityScroll from "../../../shared/components/InfinityScroll";
import './CategoryPage.css';

const CategoryPage = () => {
  const { type } = useParams();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [maxPages, setMaxPages] = useState(null);
  const observer = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    setItems(()=>[]);  
    setPage(1);  
    setMaxPages(null);
  }, [type]);

  

  useEffect(() => {

    if (loading || !page || (maxPages && page > maxPages)) return;
    setLoading(true);

    fetchCategoryItems(type, page)
      .then((response) => {
        setItems((prevItems) => [...prevItems, ...response.data.results]);
        setMaxPages(response.data.info.pages);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [page, type]);


  const loadMore = useCallback(() => {
    if (!loading && (!maxPages || page < maxPages)) {
      setPage((prev) => prev + 1);
    }
  }, [loading, maxPages, page]);

  return (
    <div className="category-container">
      <h2>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
      <InfinityScroll loadMore={loadMore} hasMore={page < maxPages} isLoading={loading}>
        <ul>
          {items.map((item, index) => (
            <li key={`${item.id}/${index}`}>
              <Link to={`/category/${type}/${item.id}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </InfinityScroll>
    </div>
  );
};

export default CategoryPage;
