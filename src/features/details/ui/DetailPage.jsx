import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchDetailItem } from "../api/detailApi";

const DetailPage = () => {
  const { type, id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetailItem(type, id).then((data) => {
      setItem(data);
      setLoading(false);
    });
  }, [type, id]);

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Item not found</p>;

  return (
    <div>
      {item.name ? <h2>{item.name}</h2> : ""}
      {item.type ? <p>{item.type}</p> : ""}
      {item.dimension ? <p>{item.dimension}</p> : ""}
      {item.image ? <img src={item.image} alt={item.name} /> : ""}
      {item.status ? <p>{item.status}</p> : ""}
      {item.air_date ? <p>{item.air_date}</p> : ""}
      {item.episode ? <p>{item.episode}</p> : ""}
      {item.species ? <p>{item.species}</p> : ""}
      {item.created ? <p>{item.created}</p> : ""}
    </div>
  );
};

export default DetailPage;
