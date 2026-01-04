--- Missions, resignations, etc.

--- duration of the travels

WITH misiones AS
  (SELECT * FROM missions
  WHERE EXTRACT(DAY FROM begin_date) != '01'
  AND EXTRACT(MONTH FROM begin_date) != '01')
  SELECT mission_number, begin_date, arrival_date,
         arrival_date - begin_date as duration,
         (arrival_date - begin_date) / 365.0 as durationinyears
  FROM misiones
  WHERE mission_number != 2 AND mission_number != 39;


