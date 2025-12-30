SELECT COUNT(DISTINCT author_id) AS total
FROM works
JOIN works_themes using (work_id)
WHERE theme_id = $1
