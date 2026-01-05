---
--- Persons which can be interesting because they have many data
--- variablename: personsMostInfo
---
SELECT DISTINCT person_id, COUNT(*) AS total
 FROM persons_details
 JOIN missions_persons b USING(person_id)
 GROUP BY 1
 HAVING COUNT(*) > 3
 ORDER BY 2 DESC;
