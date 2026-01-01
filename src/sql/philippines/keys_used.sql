--- We get all keys used in persons_details
--- and specific keys with specific informations (cargo, muerte, etc.)

SELECT DISTINCT jsonb_object_keys(details), COUNT(*)
  FROM persons_details a
  join missions_persons b using(person_id)
  GROUP BY 1
  ORDER BY 2 desc;

--- We get all keys used in persons_details with cargo
SELECT DISTINCT jsonb_object_keys(details), count(*) as total
FROM persons_details
join missions_persons b using(person_id)
WHERE details ? 'cargo'
  GROUP BY 1
  ORDER BY 2 desc;

--- We get all keys used in persons_details with muerte
SELECT DISTINCT jsonb_object_keys(details), count(*) as total
FROM persons_details
join missions_persons b using(person_id)
WHERE details ? 'muerte'
  GROUP BY 1
  ORDER BY 2 desc;

--- We get all keys used in persons_details with viaje
SELECT DISTINCT jsonb_object_keys(details), count(*) as total
FROM persons_details
join missions_persons b using(person_id)
WHERE details ? 'viaje'
  GROUP BY 1
  ORDER BY 2 desc;

--- We get all keys used in persons_details with renuncia
SELECT DISTINCT jsonb_object_keys(details), count(*) as total
FROM persons_details
join missions_persons b using(person_id)
WHERE details ? 'renuncia'
  GROUP BY 1
  ORDER BY 2 desc;
