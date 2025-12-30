
-- total dioceses
-- but not edm!
SELECT COUNT(*) as total
FROM general.dioceses;

--total bishops
SELECT COUNT(DISTINCT url) as total
FROM vistas.b_edm_cs_sa;

-- total bishops from orders
SELECT COUNT(DISTINCT url) as total
FROM vistas.b_edm_cs_sa
WHERE religious_order IS NOT NULL;
