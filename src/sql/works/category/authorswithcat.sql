-- no tiene mucho misterio. De todas formas tarda un poco pq
-- analysis.persons_flat tiene q ejecutar funciones

-- Depende de:
-- analysis.persons_flat

WITH allworks as
  (SELECT work_id, author_id
  FROM works
  JOIN works_themes using (work_id)
  WHERE theme_id = $1)
SELECT *
FROM analysis.persons_flat
JOIN allworks ON author_id = person_id;
