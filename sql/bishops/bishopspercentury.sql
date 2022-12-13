-- obispos por diócesis: 
-- Lo cogemos de Todos los obispos con seculares (1200-1800)
-- sin los afiliados. los ponemos por siglos. 

WITH x AS (
  SELECT diocese_id,
     EXTRACT(century FROM DATE_nomination) as centuries,
     COUNT(*) AS total
  FROM vistas.b_emd_cs_sa
  GROUP BY diocese_id, centuries)
SELECT DISTINCT d.diocese_name, centuries, total 
FROM x
  JOIN general.dioceses d USING(diocese_id);
