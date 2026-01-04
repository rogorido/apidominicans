--- Hábitos y profesiones

---
--- General table with persons data
---
select * from filipinas.profesiones;

---
--- Aggregating per place
---
SELECT place, coord, COUNT(*) as total
FROM filipinas.profesiones
GROUP BY place, coord
ORDER BY total DESC;

---
--- Relationship with birth places
---
WITH brutos AS
(SELECT pf.casa, pf.place AS lugar_profesion, pf.coord AS coord_profesion,
	n.place AS lugar_nacimiento, n.coord AS coord_nacimiento
FROM filipinas.profesiones AS pf
JOIN filipinas.nacimientos AS n USING (person_id))
SELECT brutos.lugar_profesion, brutos.coord_profesion,
       brutos.lugar_nacimiento, brutos.coord_nacimiento,
       COUNT(*) as total
FROM brutos
GROUP BY brutos.lugar_profesion, brutos.coord_profesion,
       brutos.lugar_nacimiento, brutos.coord_nacimiento;
