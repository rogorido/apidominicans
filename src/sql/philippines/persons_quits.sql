--- Quit, resign, etc.

--- Global table with persons, etc.
--- variablename: personsResigns
SELECT * from filipinas.renuncias;

--- Aggregate data per mission: with percentages
--- calculamos los totales de pesonas por misión
--- variablename: resignationsAggMission
WITH totales AS (
SELECT mission_ID, mission_NUMBER, extract(year from begin_date) as anyo_salida, COUNT(*) AS totalgeneral
FROM missions_persons
JOIN missions USING (mission_ID)
WHERE arrived = true
GROUP BY mission_ID, mission_NUMBER, anyo_salida),
---
--- calculamos los totales de renuncias pero con lo otro
conjunto AS
(SELECT mission_NUMBER, T.anyo_salida, COUNT(*) AS totalrenuncias, T.totalgeneral
FROM renuncias
JOIN totales T USING (mission_NUMBER)
GROUP BY mission_NUMBER, T.anyo_salida, T.totalgeneral)
--- hacemos el conjunto
SELECT mission_NUMBER, anyo_salida, totalgeneral, totalrenuncias,
       round(totalrenuncias*100.0/totalgeneral, 2) AS porcentaje
FROM conjunto
ORDER BY mission_NUMBER;

--- luego calculamos más o menos el tiempo...
--- cuidaodo: no tengo los que vuelven luego otra vez...
--- variablename: timeToResign
SELECT person_id, name, family_name, type_person,
       anyo, arrival_date, mission_number,
       anyo::int - EXTRACT(year FROM arrival_date) as tiempo,
       duracion
FROM filipinas.renuncias;

---
--- Aggs of type of person
--- variablename: aggTypePerson
SELECT type_person, count(*) as total
FROM filipinas.renuncias
group by 1;
