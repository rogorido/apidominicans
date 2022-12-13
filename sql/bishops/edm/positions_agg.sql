SELECT url, bishop_fullname, COUNT(*) AS total 
FROM vistas.periplo_edm_op -- view 
GROUP BY url, bishop_fullname;
