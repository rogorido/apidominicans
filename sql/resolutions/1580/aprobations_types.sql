
WITH A AS 
   (SELECT details->>'aprobación_tipo' tipo,
          details->>'aprobación_cargo' cargo,
          p.name AS province_name,
          COUNT(*) AS total
   FROM resolutions_details_1580 r
   JOIN provinces p ON p.province_id = (details->>'provincia')::int
   where details ? 'aprobación'
   GROUP BY details->>'aprobación_tipo', details->>'aprobación_cargo', p.name
   ORDER BY p.name, details->>'aprobación_cargo')
SELECT cargo, COUNT(*) AS total
FROM A
GROUP BY cargo;

