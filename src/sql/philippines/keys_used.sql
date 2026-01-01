SELECT DISTINCT jsonb_object_keys(details), COUNT(*)
  FROM persons_details a
  join missions_persons b using(person_id)
  GROUP BY 1
  ORDER BY 2 desc;
