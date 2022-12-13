
SELECT p.province_id,
       p.name AS province_name,
       COUNT(*)::int AS total
FROM houses
JOIN provinces p USING (province_id)
GROUP BY p.province_id, p.name;
