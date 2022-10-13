-- etc.

SELECT COUNT(DISTINCT work_id) AS total
FROM works
WHERE work_id NOT IN
      (SELECT DISTINCT work_id
      FROM works_themes);
