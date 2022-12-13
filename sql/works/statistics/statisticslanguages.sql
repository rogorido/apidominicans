-- quitamos las obras obras que no tienen lengua

SELECT language_work, COUNT(*) AS total
FROM works
-- WHERE language_work <> ''
GROUP BY 1
ORDER BY COUNT(*) DESC;
