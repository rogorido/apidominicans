
SELECT theme_id, theme, COUNT(*) AS total
FROM works_themes
JOIN themes USING (theme_id)
JOIN works USING (work_id)
JOIN persons ON person_id = author_id
WHERE author_id = $1
GROUP BY 1, 2
ORDER BY total DESC;
