--- cuántos autores han publicado ahí

SELECT COUNT(DISTINCT person_id) AS total
FROM works.w_originales_reediciones w
JOIN works USING (work_id)
JOIN persons ON  person_id = author_id
WHERE w.place_print_id = $1;

--- cuántas obras no tienen año
SELECT COUNT(DISTINCT work_id) FILTER(WHERE original = TRUE) AS original,
       COUNT(DISTINCT work_id) FILTER(WHERE original = false) AS reed
FROM works.w_originales_reediciones w
WHERE (date_print IS NULL OR date_print = 1400)
     AND w.place_print_id = $1;
