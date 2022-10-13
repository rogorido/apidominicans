-- más liado de lo q debería
-- ver explicaciones en
-- e0a87713-249a-4540-ac3e-01a40eca19b2 en
-- [[file:consultas.org][file:~/geschichte/artikel/obrasdominicas/consultas.org]]

WITH w AS
(SELECT DISTINCT work_id
 FROM works.w_originales_reediciones
 WHERE original = TRUE AND place_print_id = $1),

 T AS
 (SELECT COUNT(*) AS totales FROM w),

 c AS
 (SELECT theme, COUNT(*) AS total
  FROM themes
  JOIN works_themes USING (theme_id)
  JOIN w USING (work_id)
  GROUP BY 1)

SELECT theme, total, round(total * 100 / t.totales::NUMERIC, 2)
FROM c, T;
