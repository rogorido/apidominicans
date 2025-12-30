
SELECT order_id, religious_order, diocese_id,
       d.diocese_name, p.country,
       p.longitude, p.latitude,
       COUNT(*) AS total 
FROM vistas.b_cph_cs_sa
JOIN general.dioceses d USING(diocese_id)
LEFT JOIN general.places P USING(place_id)
WHERE order_id = $1
GROUP BY order_id, religious_order, diocese_id, d.diocese_name,
      p.country, p.longitude, p.latitude
ORDER BY d.diocese_name;
