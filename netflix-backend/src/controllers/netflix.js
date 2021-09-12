import movies from "../jsons/movies.json";

export const getCategories = (req, res) => {
  const count = Array.from(
    new Set(movies.map((item) => item.category || "other"))
  );
  return res.json(count);
};

export const getPaginatedData = (req, res) => {
  const category =
    req.query.category === "other" ? undefined : req.query.category;
  const page = req.query.page;
  const per_page = req.query.limit;

  const filteredData = movies.filter(
    (item) => item.category === category || undefined
  );
  const data = paginator(filteredData, page, per_page);
  return res.json(data);
};

const paginator = (items, pageCount, perPage) => {
  let page = parseInt(pageCount) || 1;
  let per_page = perPage || 10;
  let offset = (page - 1) * per_page;
  let paginatedItems = items.slice(offset).slice(0, per_page);
  let total_pages = Math.ceil(items.length / per_page);
  return {
    page,
    per_page,
    total: items.length,
    total_pages,
    data: paginatedItems,
  };
};
