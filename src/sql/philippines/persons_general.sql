---
--- Flat table with all infos about persons in missions
SELECT *
FROM analysis.persons_flat
JOIN missions_persons USING (person_id);
