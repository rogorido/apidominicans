---
--- City's name
---
SELECT place
FROM places
WHERE place_id = $1;

---
--- City's coordinates
---
SELECT longitude, latitude
FROM places
WHERE place_id = $1;

---
--- How many works with reeditions
---
SELECT COUNT(DISTINCT work_id)::integer AS total
FROM works.w_originales_reediciones w
WHERE w.place_print_id = $1;

---
--- How many works without reeditions
---
SELECT COUNT(DISTINCT work_id)::integer AS total
FROM works w
WHERE w.place_print_id = $1;

---
--- How many manuscripts
---
SELECT COUNT(DISTINCT work_id)::integer as total
FROM works w
WHERE w.place_print_id = $1 AND manuscrit = TRUE;

---
--- How many authors
---
SELECT COUNT(DISTINCT person_id)::integer AS total
FROM works.w_originales_reediciones w
JOIN persons ON  person_id = author_id
WHERE w.place_print_id = $1;

---
--- How many works without year of publication
---
SELECT COUNT(DISTINCT work_id) FILTER(WHERE original = TRUE)::integer AS original,
       COUNT(DISTINCT work_id) FILTER(WHERE original = false)::integer AS reed
FROM works.w_originales_reediciones w
WHERE (date_print IS NULL OR date_print = 1400)
     AND w.place_print_id = $1;
