-- esto es un poco lío pero nos da una tabla de totales y porcentajes
-- con totales totales, totales por originales, etc.

-- pongo al final eso de ::integer etc pq no se sabe por qué
-- pg-promise me pasa lascosas como string
-- https://stackoverflow.com/questions/39168501/pg-promise-returns-integers-as-strings

WITH o AS
(SELECT place_print_id, place,
       COUNT(*) AS total,
       COUNT(*) FILTER(WHERE original = TRUE) AS totaloriginal,
       COUNT(*) FILTER(WHERE original = FALSE) AS totalreed
FROM works.w_originales_reediciones
WHERE place IS NOT null
GROUP BY 1, 2),

T AS
(SELECT SUM(o.total) AS total,
        SUM(o.totaloriginal) AS totaloriginal,
        SUM(o.totalreed) AS totalreed
 FROM o)

SELECT o.place_print_id, o.place, o.total::integer,
       round((o.total * 100) / t.total, 2)::real AS perctotal,
       o.totaloriginal::integer,
       round(o.totaloriginal * 100 / SUM(t.totaloriginal), 2)::real AS percoriginal,
       o.totalreed::integer,
       round(o.totalreed * 100 / SUM(t.totalreed), 2)::real AS percreediciones
FROM o, t
GROUP BY o.place_print_id, o.place, o.total, o.totaloriginal,
      t.total, t.totaloriginal,
      o.totalreed, t.totalreed;
