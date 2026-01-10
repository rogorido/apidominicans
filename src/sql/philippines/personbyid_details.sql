---
--- Details about concrete person (by id)
---

---
--- All data: not very usable
---
SELECT *
FROM persons_details
WHERE person_id = $1;


---
--- Infos about 'cargos', offices, etc.
--- Note: we use the own-defined type office_rec
---
SELECT mp.person_id, pd.person_detail_id,
       v.cargo, v.casa, v.año,
       v.año_fin, v.lugar, v.provincia,
       v.duracion, v.ocasiones, v.materia,
       v.zona, v.capítulo,
       pl.place as place_name
FROM   missions_persons      mp
JOIN   persons_details       pd USING (person_id)
--- we populate the type office_rec with 'details'
CROSS JOIN LATERAL
       jsonb_populate_record( null::office_rec, details ) AS v
--- left joins to get names of places, etc.
LEFT JOIN houses AS h ON v.casa = h.house_id
LEFT JOIN provinces AS p ON v.provincia = p.province_id
LEFT JOIN places pl on v.lugar = pl.place_id
WHERE pd.details ? 'cargo' AND person_id = $1
--- we order by person_detail_id because it is a way
--- to get the potential order of offices
ORDER BY pd.person_detail_id;

---
--- Infos about deaths.
---
with a as
(SELECT person_id, person_detail_id, details
FROM persons_details
join missions_persons b using(person_id)
WHERE details ? 'muerte'),
b as (
SELECT a.person_id, a.person_detail_id, x.*
from a,
     jsonb_to_record(details)
     as x(muerte text, casa int, año int,
          lugar int, causa text))
select b.*, h.name as house_name, p.place as place_name
from b
left JOIN houses as h ON b.casa = h.house_id
left JOIN places as p ON b.lugar = p.place_id
WHERE person_id = $1;

---
--- Infos about travels.
--- Note: we use the own-defined type meta_info_rec
---
SELECT
       mp.person_id, pd.person_detail_id,
       v.muerto,
       v.vuelta,
       v.original,
       v.fecha_inicio,
       v.viaje_origen,
       pl.place as place_name_origen,
       v.viaje_destino,
       pl2.place as place_name_destino,
       v.motivos,                     -- array de texto
       m.interesante,
       m.volver      AS volver_a_mirar,
       m.seguridad,
       m.nota
FROM   missions_persons      mp
JOIN   persons_details       pd USING (person_id)
-- extraemos el objeto «viaje» y lo convertimos en columnas
CROSS JOIN LATERAL
       jsonb_to_record( pd.details -> 'viaje' )
       AS v(
            muerto        boolean,
            vuelta        boolean,
            motivos       text[],          -- array
            original      boolean,
            meta_info     jsonb,           -- sigue siendo jsonb
            fecha_inicio  text,
            viaje_origen  int,
            viaje_destino int
          )
-- extraemos el sub‑objeto «meta_info» y lo convertimos en columnas
CROSS JOIN LATERAL
       jsonb_populate_record( null::meta_info_rec, v.meta_info ) AS m
left join places pl on v.viaje_origen = pl.place_id
left join places pl2 on v.viaje_destino = pl2.place_id
WHERE pd.details ? 'viaje' and person_id = $1;
