---
--- Persons all data (from persons_flat view)
--- variablename: personsAllFlat
---
SELECT *
FROM persons_flat
JOIN missions_persons USING (person_id);

