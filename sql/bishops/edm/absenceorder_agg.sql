-- Diócesis donde no ha habido regulares

WITH paisestotales AS (
     SELECT country, COUNT(d.diocese_id) AS countrytotal
     FROM general.places
     JOIN general.dioceses d USING(place_id)
     GROUP BY country),
     
orrgtotales AS (
     SELECT r_order_id, r_order_acronym, r_country, COUNT(*) AS dioctotales
     FROM order_absent_dioceses($1)
     GROUP BY r_order_id, r_order_acronym, r_country)

SELECT o.r_order_id,
       o.r_order_acronym AS orden,
       o.r_country AS country,
       countrytotal AS total_country,
       dioctotales AS total_absent,
       round(round(dioctotales::numeric / countrytotal::NUMERIC, 3) * 100, 1) AS percentage
FROM orrgtotales o
JOIN paisestotales P ON p.country = o.r_country;
