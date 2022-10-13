-- esto es un poco lío pero nos da una tabla de totales y porcentajes
-- con totales totales, totales por originales, etc.

WITH o AS
(SELECT place,
       COUNT(*) AS total,
       COUNT(*) FILTER(WHERE original = TRUE) AS totaloriginal,
       COUNT(*) FILTER(WHERE original = FALSE) AS totalreed
FROM works.w_originales_reediciones
WHERE place IS NOT null
GROUP BY 1),

T AS
(SELECT SUM(o.total) AS total,
        SUM(o.totaloriginal) AS totaloriginal,
        SUM(o.totalreed) AS totalreed
 FROM o)

SELECT o.place, o.total,
       round((o.total * 100) / t.total, 2) AS perctotal,
       o.totaloriginal,
       round(o.totaloriginal * 100 / SUM(t.totaloriginal), 2) AS percoriginal,
       o.totalreed,
       round(o.totalreed * 100 / SUM(t.totalreed), 2) AS percreediciones
FROM o, t
GROUP BY o.place, o.total, o.totaloriginal,
      t.total, t.totaloriginal,
      o.totalreed, t.totalreed;
