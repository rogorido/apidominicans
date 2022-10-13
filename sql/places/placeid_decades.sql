-- ver detalles en 45e51769-e6b6-4175-ab62-9f3912465b87
-- [[file:consultas.org][file:~/geschichte/artikel/obrasdominicas/consultas.org]]

WITH
series AS
      (SELECT generate_series(1450, 1700, 10) AS r_from),
      rangos AS (
      SELECT r_from, (r_from + 9) AS r_to FROM series)

SELECT r_from, r_to,
       (SELECT count(*) FROM works.w_originales_reediciones
               WHERE date_print BETWEEN r_from AND r_to
                     AND date_print <> 1400
                     AND place_print_id = $1)  AS total,
       (SELECT count(*) FROM works.w_originales_reediciones
        WHERE date_print BETWEEN r_from AND r_to
                     AND date_print <> 1400
                     AND place_print_id = $1
                     AND original = TRUE )  AS totaloriginal,
       (SELECT count(*) FROM works.w_originales_reediciones
        WHERE date_print BETWEEN r_from AND r_to
                     AND date_print <> 1400
                     AND place_print_id = $1
                     AND original = FALSE )  AS totalreed
FROM rangos;
