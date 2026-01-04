
--- total persons in the Philippines
SELECT DISTINCT COUNT(*) AS total
  FROM persons A
  JOIN missions_persons b USING(person_id);

---
--- Missions total
---
SELECT COUNT(DISTINCT mission_id) AS total
FROM missions;

---
--- Total of birth places
---
SELECT COUNT(DISTINCT birth_place) AS total
FROM persons_flat
JOIN missions_persons USING (person_id);

---
--- Total of types of persons
---
SELECT DISTINCT type_person, COUNT(*) AS total
FROM persons_flat
JOIN missions_persons USING (person_id)
GROUP BY 1
ORDER BY 2 DESC;

---
--- Total of looked up
---
SELECT DISTINCT lookedup, COUNT(*) AS total
FROM persons_flat
JOIN missions_persons USING (person_id)
GROUP BY 1
ORDER BY 2 DESC;

---
--- Total of different professions houses
---
SELECT COUNT(DISTINCT prof_house) AS total
FROM persons_flat
JOIN missions_persons USING (person_id);

---
--- Total of different provinces
---
SELECT COUNT(DISTINCT province_id) AS total
FROM persons_flat
JOIN missions_persons USING (person_id);

---
--- Total of resignations
---
SELECT COUNT(*) as total
FROM filipinas.renuncias;
