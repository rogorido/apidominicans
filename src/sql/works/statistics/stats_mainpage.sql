--- consultas simples para estadísticas generales

SELECT COUNT(DISTINCT work_id) AS total
FROM works;

SELECT COUNT(DISTINCT work_id) as total
FROM works
WHERE manuscrit = TRUE;

SELECT COUNT(DISTINCT work_id) as total
FROM works
WHERE printed = TRUE;

SELECT COUNT(DISTINCT author_id) AS total
FROM works;
