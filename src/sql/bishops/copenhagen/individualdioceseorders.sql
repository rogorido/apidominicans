-- there is for sure a better way for doing this... but which one?

WITH G AS 
  (SELECT bishop_all_id,
         (case
                  when order_acronym IS null THEN 'Secular'
                  else order_acronym
                end)
  FROM vistas.b_cph_cs_sa
  WHERE diocese_id = $1),

T AS
( SELECT order_acronym, COUNT(*) AS total FROM G
  GROUP BY order_acronym),

tg AS
(SELECT sum(total) AS totalglobal FROM T )

SELECT order_acronym, total,
       round((total * 100)/ tg.totalglobal, 1) AS percentage
FROM T, tg
GROUP BY order_acronym, total, tg.totalglobal;

