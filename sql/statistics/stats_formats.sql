
SELECT CASE
    WHEN format IS NULL THEN 'Sin formato'
    WHEN format = '' THEN 'Sin formato'
    WHEN format = 'fol' THEN 'fol.'
    WHEN format = '9' THEN '8'
    ELSE format
    END,
    COUNT(*) AS total,
    COUNT(*) FILTER (WHERE original = TRUE) AS totaloriginal,
    COUNT(*) FILTER (WHERE original = false) AS totalreed
FROM works.w_originales_reediciones w
${wheresql:raw}
GROUP BY 1
ORDER BY total DESC;
