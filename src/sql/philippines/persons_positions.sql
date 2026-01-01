--- Positions

---
--- Which positions are thre and how many?
--- variablename: allPositions
WITH A AS
(SELECT person_id, details->'cargo' AS cargo
FROM persons_details
JOIN missions_persons b USING(person_id)
WHERE details ? 'cargo')
SELECT DISTINCT cargo, COUNT(*) AS total
FROM A
GROUP BY 1
ORDER BY 2 DESC;

---
--- With year, duration and ocasiones
--- variablename: positionsTime
WITH a AS
(SELECT person_id, details->'cargo' AS cargo
FROM persons_details
JOIN missions_persons b USING(person_id)
WHERE details ? 'cargo' AND
(details ? 'año' OR details ? 'duración' OR details ? 'ocasiones'))
SELECT DISTINCT cargo, COUNT(*) AS total
FROM a
GROUP BY 1
ORDER BY 2 DESC;

---
--- With year, and end
--- variablename: positionsYears
WITH A AS
(SELECT person_id, details->'cargo' AS cargo,
  CAST(details->>'año' AS INT)  AS año,
  CAST(details->>'año_fin' AS INT)  AS fin,
  CAST(details->>'duración' AS INT)  AS duracion
FROM persons_details
JOIN missions_persons b USING(person_id)
WHERE details ? 'cargo' AND details ? 'año' AND
  (details ? 'año_fin' OR details ? 'duración' ))
SELECT DISTINCT person_id, cargo, año, fin, duracion
FROM A;

---
--- Less specific: ocasiones
--- variablename: positionsLessSpecific
WITH A AS
(SELECT person_id, details->'cargo' AS cargo,
  CAST(details->>'ocasiones' AS INT)  AS ocasiones
FROM persons_details
JOIN missions_persons b USING(person_id)
WHERE details ? 'cargo' AND details ? 'ocasiones')
SELECT DISTINCT person_id, cargo, ocasiones
FROM A;
