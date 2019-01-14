# StocksPlot
Plot graph based on last 5 years stocks data

index.html - load the index.html file in browser.

On loading the page it fetched the data from the DB using TestServlet interface.

On applying the different filters in the  drop down down(duration/indices), data in the client got filtered according to the selection.

DB contains the below columns

mysql> describe data;
+-----------------+-------+------+-----+---------+-------+
| Field           | Type  | Null | Key | Default | Extra |
+-----------------+-------+------+-----+---------+-------+
| date            | date  | NO   | PRI | NULL    |       |
| dji_close_value | float | YES  |     | NULL    |       |
| bse_close_value | float | YES  |     | NULL    |       |
+-----------------+-------+------+-----+---------+-------+
