
---
--- Languages
--- --- variablename: languagesAll
WITH A AS
(SELECT person_id, details->'lenguas' AS lenguas
FROM persons_details
JOIN missions_persons b USING(person_id)
WHERE details ? 'lenguas')
SELECT DISTINCT lenguas, COUNT(*) AS total
FROM A
GROUP BY 1
ORDER BY 2 DESC;
