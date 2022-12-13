SELECT houses.house_id, houses.name as housename,
       pr.name AS provincia,
       places.place as Place, places.country AS Country,
       places.longitude, places.latitude,
       press, pop1500,logpop1500, indepcity, univ1450,
       bishop, laymag, marketpot1500, water,
       logcitygrowth15, logcitygrowth16
FROM houses
  LEFT JOIN places USING (place_id)
  LEFT JOIN provinces pr USING (province_id)
  LEFT JOIN analysis.cities_with_socioeconomicdata USING (place_id)
WHERE men = TRUE
ORDER BY houses.name;
