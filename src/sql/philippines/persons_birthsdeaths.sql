---- Births and Deaths

--- Births
SELECT place, coord, COUNT(*) as total
FROM filipinas.nacimientos
GROUP BY place, coord
ORDER BY total DESC;

---- Global table with persons, etc.
SELECT * from filipinas.muertes;

---- Aggregate data per place
SELECT place, coord, COUNT(*) as total
FROM filipinas.muertes
GROUP BY place, coord
ORDER BY total DESC;
