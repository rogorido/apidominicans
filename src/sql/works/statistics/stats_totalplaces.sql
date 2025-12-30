-- rtt este código está repetido en category/
-- lo ideal sería sacar ese where $1 y hacerlo con
-- el sistema de los raw data...

SELECT place,
       COUNT(*) AS total,
       COUNT(*) FILTER (WHERE original = TRUE) AS totaloriginal,
       COUNT(*) FILTER (WHERE original = false) AS totalreed
FROM works.w_originales_reediciones
JOIN works_themes using (work_id)
GROUP BY 1
ORDER BY 2 desc;
