
--- total persons in the Philippines
SELECT DISTINCT count(*) as total
  FROM persons a
  join missions_persons b using(person_id);
