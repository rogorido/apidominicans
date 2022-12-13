-- cogemos la view works.w_originales_reediciones
-- que agrupa todo: originales y reediciones

SELECT place,
       COUNT(*) AS total,
       COUNT(*) FILTER (WHERE original = TRUE) AS totaloriginal,
       COUNT(*) FILTER (WHERE original = false) AS totalreed
FROM works.w_originales_reediciones
JOIN works_themes using (work_id)
WHERE $1
GROUP BY 1
ORDER BY 2 desc;
