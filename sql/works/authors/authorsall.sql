
WITH x AS
(SELECT person_id, name, family_name,
        p.datebirth, p.datedeath,
        original, printed, manuscrit
FROM persons P
JOIN works.w_originales_reediciones w ON p.person_id = w.author_id)
SELECT person_id, name || ' ' || family_name AS author,
        datebirth, datedeath,
       COUNT(*) FILTER(WHERE original = TRUE) AS totaloriginal,
       COUNT(*) FILTER(WHERE original = TRUE AND printed = TRUE) AS totalprinted,
       COUNT(*) FILTER(WHERE original = TRUE AND manuscrit = TRUE) AS totalmanuscrit,
       COUNT(*) FILTER(WHERE original = FALSE ) AS totalreed
FROM x
GROUP BY 1, 2, 3, 4
ORDER BY totaloriginal DESC;
