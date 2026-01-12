---
--- Keys used total
---
--- NOTE: we have to use :raw, since otherwise the variable $1 gets
--- converted to 'VARIABLE'!
---
SELECT DISTINCT jsonb_object_keys(details),
       COUNT(*) AS total
FROM persons_details
JOIN missions_persons USING (person_id)
WHERE details @> '{"cargo": "$1:raw" }'
GROUP BY 1
ORDER BY 2 DESC;

---
--- Table with the data of position X
---
SELECT
       m.person_id, pd.person_detail_id,
       v.casa,
       h.name as house_name,
       v.año, v.año_fin, v.duración,
       v.lugar, v.provincia,
       v.materia
FROM   persons_details pd
JOIN   missions_persons m USING (person_id)
CROSS JOIN LATERAL
       jsonb_to_record( pd.details)
       AS v(
            casa int,
            año int,
            año_fin int,
            duración int,
            lugar int,
            provincia int,
            materia text
          )
left join houses h on v.casa = h.house_id
where details @> '{"cargo": "$1:raw"}';

---
--- Aggregate with houses
---
WITH A AS (
SELECT
       M.person_id, pd.person_detail_id,
       v.casa, h.NAME AS house_name,
       v.año, v.año_fin, v.duración,
       v.lugar, v.provincia,
       v.materia
FROM   persons_details pd
JOIN   missions_persons M USING (person_id)
CROSS JOIN LATERAL
       jsonb_to_record( pd.details)
       AS v(
            casa INT,
            año INT,
            año_fin INT,
            duración INT,
            lugar INT,
            provincia INT, materia TEXT
          )
LEFT JOIN houses h ON v.casa = h.house_id
WHERE details @> '{"cargo": "$1:raw"}')
SELECT house_name, COUNT(*) as total
FROM A
GROUP BY 1
ORDER BY 2 DESC;


---
--- Aggregate with materia
---
WITH A AS (
SELECT
       M.person_id, pd.person_detail_id,
       v.casa, h.NAME AS house_name,
       v.año, v.año_fin, v.duración,
       v.lugar, v.provincia,
       v.materia
FROM   persons_details pd
JOIN   missions_persons M USING (person_id)
CROSS JOIN LATERAL
       jsonb_to_record( pd.details)
       AS v(
            casa INT,
            año INT,
            año_fin INT,
            duración INT,
            lugar INT,
            provincia INT, materia TEXT
          )
LEFT JOIN houses h ON v.casa = h.house_id
WHERE details @> '{"cargo": "$1:raw"}')
SELECT materia, COUNT(*) as total
FROM A
GROUP BY 1
ORDER BY 2 DESC;
