SELECT diocese_id,
       d.diocese_name,
       (d.other_data->'gcatholic'->>'foundation')::INTEGER AS foundation,
        url_hierarchy,
       p.longitude, p.latitude, p.country
FROM dioceses d
  LEFT JOIN general.places P USING (place_id)
WHERE diocese_id = $1
