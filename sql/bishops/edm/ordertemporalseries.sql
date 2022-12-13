
WITH anyos AS (
      SELECT generate_series($1, $2, 1) AS serie)
SELECT serie,
       bishops_order_per_year_edm_without_country($3, serie) AS total 
FROM anyos;
