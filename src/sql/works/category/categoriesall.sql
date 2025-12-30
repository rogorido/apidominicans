
SELECT theme_id, theme, COUNT(*) AS total
FROM works_themes
JOIN themes USING (theme_id)
GROUP BY 1, 2
ORDER BY total DESC;
