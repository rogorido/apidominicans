SELECT COUNT(DISTINCT work_id) AS total
FROM works
JOIN works_themes using (work_id)
WHERE $1
