-- ver en 32bc2a07-134b-4ef5-bfc1-f843828f110a
-- en obrasdominicas.
WITH allworks as
  (SELECT work_id
  FROM works
  JOIN works_themes using (work_id)
  WHERE theme_id = $1)
SELECT theme, COUNT(*) AS total
FROM themes
JOIN works_themes using (theme_id)
JOIN allworks using (work_id)
WHERE theme_id <> $1
GROUP BY 1;
