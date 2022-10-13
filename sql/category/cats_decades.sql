
--- categoría X por década [pero cuidado esto no tiene en cuenta ms!]
WITH
series AS
      (SELECT generate_series(1450, 1700, 10) AS r_from),
      rangos AS (
      SELECT r_from, (r_from + 9) AS r_to FROM series)
SELECT r_from, r_to,
       (SELECT count(*) FROM works.w_originales_reediciones
        JOIN works_themes USING (work_id)
        WHERE date_print BETWEEN r_from AND r_to
        AND date_print <> 1400
        AND theme_id = $1)  AS total,
       (SELECT count(*) FROM works.w_originales_reediciones
        JOIN works_themes USING (work_id)
        WHERE date_print BETWEEN r_from AND r_to
        AND date_print <> 1400 AND original = TRUE
        AND theme_id = $1)  AS totaloriginal,
       (SELECT count(*) FROM works.w_originales_reediciones
        JOIN works_themes USING (work_id)
        WHERE date_print BETWEEN r_from AND r_to
        AND date_print <> 1400 AND original = FALSE
        AND theme_id = $1)  AS totalreed
FROM rangos;
