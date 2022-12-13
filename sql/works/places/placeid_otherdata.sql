--- nombre de la ciudad

SELECT place
FROM places
WHERE place_id = $1;

--- coordenadas de la ciudad

SELECT longitude, latitude
FROM places
WHERE place_id = $1;

--- cuántos autores han publicado ahí

SELECT COUNT(DISTINCT person_id)::integer AS total
FROM works.w_originales_reediciones w
JOIN persons ON  person_id = author_id
WHERE w.place_print_id = $1;

--- cuántas obras no tienen año
SELECT COUNT(DISTINCT work_id) FILTER(WHERE original = TRUE)::integer AS original,
       COUNT(DISTINCT work_id) FILTER(WHERE original = false)::integer AS reed
FROM works.w_originales_reediciones w
WHERE (date_print IS NULL OR date_print = 1400)
     AND w.place_print_id = $1;
