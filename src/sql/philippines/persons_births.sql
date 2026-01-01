SELECT place, coord, COUNT(*) as total
FROM filipinas.nacimientos
GROUP BY place, coord
ORDER BY total DESC;
