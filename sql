CREATE TABLE three (num INT not null, item INT not null, id char(10) not null, quanlity INT not null, price DECIMAL (8,2) not null, PRIMARY KEY (num, item));

INSERT INTO three (num, item, id, quanlity, price) values (30001, 1, "a1", 10, 5.2),(30001, 2, "b2", 3, 7.6), (30001, 3, "bs1", 5, 11.2), (30001, 4, "bs2", 15, 9.2),(30002, 1, "b3", 2, 20.2),(30003, 1, "c0", 100, 10),(30004, 1, "o2", 50, 2.50),(30005, 1, "c0", 5, 10),(30005, 2, "b1", 10, 8.99),(30005, 3, "a2", 10, 2.2),(30005, 4, "m1", 5, 14.99);

SELECT num , SUM(quanlity * price) AS Total from three GROUP BY num HAVING SUM(quanlity * price) >= 100;