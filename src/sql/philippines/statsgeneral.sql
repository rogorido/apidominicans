
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

---
--- Percetages of several interesting data frailes and legos
--- variable_name: interesting_percs
---
--- NOTE: some data are twice (because they are in other queries above!)
WITH b AS
(SELECT COUNT(DISTINCT person_id) AS total,
        COUNT(DISTINCT person_id) filter (where p.type_person = 'Fraile') AS total_frailes,
        COUNT(DISTINCT person_id) filter (where p.type_person = 'Lego') AS total_legos,
        COUNT (DISTINCT person_id) FILTER (WHERE details ? 'viaje') AS with_viajes,
        COUNT (DISTINCT person_id) FILTER (WHERE details ? 'viaje' and p.type_person = 'Fraile') AS with_viajes_frailes,
        COUNT (DISTINCT person_id) FILTER (WHERE details ? 'viaje' and p.type_person = 'Lego') AS with_viajes_legos,
        COUNT (DISTINCT person_id) FILTER (WHERE details ? 'cargo') AS with_cargos,
        COUNT (DISTINCT person_id) FILTER (WHERE details ? 'cargo' and p.type_person = 'Fraile') AS with_cargos_frailes,
        COUNT (DISTINCT person_id) FILTER (WHERE details ? 'cargo' and p.type_person = 'Lego') AS with_cargos_legos,
        COUNT (DISTINCT person_id) FILTER (WHERE details ? 'lenguas') AS with_lenguas,
        COUNT (DISTINCT person_id) FILTER (WHERE details ? 'lenguas' and p.type_person = 'Fraile') AS with_lenguas_frailes,
        COUNT (DISTINCT person_id) FILTER (WHERE details ? 'lenguas' and p.type_person = 'Lego') AS with_lenguas_legos,
        COUNT (DISTINCT person_id) FILTER (WHERE details ? 'profesión') AS with_profession,
        COUNT (DISTINCT person_id) FILTER (WHERE details ? 'profesión' and p.type_person = 'Fraile') AS with_profession_frailes,
        COUNT (DISTINCT person_id) FILTER (WHERE details ? 'profesión' and p.type_person = 'Lego') AS with_profession_legos,
        COUNT (DISTINCT person_id) FILTER (WHERE details ? 'hábito') AS with_habit,
        COUNT (DISTINCT person_id) FILTER (WHERE details ? 'hábito' and p.type_person = 'Fraile') AS with_habit_frailes,
        COUNT (DISTINCT person_id) FILTER (WHERE details ? 'hábito' and p.type_person = 'Lego') AS with_habit_legos,
        COUNT (DISTINCT person_id) FILTER (WHERE details ? 'nacimiento') AS with_birth,
        COUNT (DISTINCT person_id) FILTER (WHERE details ? 'nacimiento' and p.type_person = 'Fraile') AS with_birth_frailes,
        COUNT (DISTINCT person_id) FILTER (WHERE details ? 'nacimiento' and p.type_person = 'Lego') AS with_birth_legos,
        COUNT (DISTINCT person_id) FILTER (WHERE details ? 'renuncia') AS with_resign,
        COUNT (DISTINCT person_id) FILTER (WHERE details ? 'renuncia' and p.type_person = 'Fraile') AS with_resign_frailes,
        COUNT (DISTINCT person_id) FILTER (WHERE details ? 'renuncia' and p.type_person = 'Lego') AS with_resign_legos
 FROM persons p
 join persons_details using (person_id)
 JOIN missions_persons USING (person_id)
)
SELECT b.total, b.total_frailes, b.total_legos,
   b.with_viajes, b.with_viajes_frailes, b.with_viajes_legos,
   round((b.with_viajes * 100.0) / b.total, 2) AS percentage_viajes,
   round((b.with_viajes_frailes * 100.0) / b.total_frailes, 2) AS percentage_viajes_frailes,
   round((b.with_viajes_legos * 100.0) / b.total_legos, 2) AS percentage_viajes_legos,
   b.with_cargos, b.with_cargos_frailes, b.with_cargos_legos,
   round((b.with_cargos * 100.0) / b.total, 2) AS percentage_cargos,
   round((b.with_cargos_frailes * 100.0) / b.total_frailes, 2) AS percentage_cargos_frailes,
   round((b.with_cargos_legos * 100.0) / b.total_legos, 2) AS percentage_cargos_legos,
   b.with_lenguas, b.with_lenguas_frailes, b.with_lenguas_legos,
   round((b.with_lenguas * 100.0) / b.total, 2) AS percentage_lenguas,
   round((b.with_lenguas_frailes * 100.0) / b.total_frailes, 2) AS percentage_lenguas_frailes,
   round((b.with_lenguas_legos * 100.0) / b.total_legos, 2) AS percentage_lenguas_legos,
   b.with_profession, b.with_profession_frailes, b.with_profession_legos,
   round((b.with_profession * 100.0) / b.total, 2) AS percentage_profession,
   round((b.with_profession_frailes * 100.0) / b.total_frailes, 2) AS percentage_profession_frailes,
   round((b.with_profession_legos * 100.0) / b.total_legos, 2) AS percentage_profession_legos,
   b.with_habit, b.with_habit_frailes, b.with_habit_legos,
   round((b.with_habit * 100.0) / b.total, 2) AS percentage_habit,
   round((b.with_habit_frailes * 100.0) / b.total_frailes, 2) AS percentage_habit_frailes,
   round((b.with_habit_legos * 100.0) / b.total_legos, 2) AS percentage_habit_legos,
   b.with_birth, b.with_birth_frailes, b.with_birth_legos,
   round((b.with_birth * 100.0) / b.total, 2) AS percentage_birth,
   round((b.with_birth_frailes * 100.0) / b.total_frailes, 2) AS percentage_birth_frailes,
   round((b.with_birth_legos * 100.0) / b.total_legos, 2) AS percentage_birth_legos,
   b.with_resign, b.with_resign_frailes, b.with_resign_legos,
   round((b.with_resign * 100.0) / b.total, 2) AS percentage_resign,
   round((b.with_resign_frailes * 100.0) / b.total_frailes, 2) AS percentage_resign_frailes,
   round((b.with_resign_legos * 100.0) / b.total_legos, 2) AS percentage_resign_legos
FROM b;
