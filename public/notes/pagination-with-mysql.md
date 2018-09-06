Having a large dataset and only needing to fetch a specific number of rows, It is the reason `LIMIT` clause exists. It allows to limit the number of rows in the result returned by a SQL statement.

Pagination refers to the process of dividing a dataset into smaller parts.

The ability to send data to the user faster by fetching the whole dataset by smaller pieces at a time, is one of the benefits of using pagination.

## How it works

Pagination works by defining the maximum number of rows in the results per request and what page is being requested.

The table below represents the items on the `users` table.

```
+----+----------+
| id | Name     |
+----+----------+
| 1  | John     |
| 2  | Jane     |
| 3  | Peter    |
| 4  | Joseph   |
| 5  | Mary     |
| 6  | Jack     |
| 7  | Ann      |
| 8  | Bill     |
| 9  | Sam      |
| 10 | Rose     |
| 11 | Juan     |
+----+----------+
```

For this example the maximum number of rows will be `2`, which means on every request we are going to get at most 2 rows.

The table has 11 rows, and we are limiting the result by 2 rows per request, resulting in a 6 pages of 2 items. Determined by dividing the number of rows (`11`) by the number of rows per page (`2`), and making sure the result is rounded to the next integer number.

```
Total pages = CEIL(Total number of rows / Limit number of rows)
```

MySQL doesn't have a `PAGE` clause, but it has a `OFFSET` clause, which allow to move the position from where to start counting the `LIMIT` value.

The value of `OFFSET` is done by multiplying the page number your are looking minus 1 by the `LIMIT` clause value.

```
OFFSET = (PAGE - 1) * LIMIT
```

In the table above there is 11 and to get the first 2 rows we use the following query:

```
PAGE = 1
LIMIT = 2
OFFSET = (PAGE-1) * LIMIT
OFFSET = (1-1) * 2
OFFSET = 0 * 2
OFFSET = 0
```

The offset initial value is `0`, and not `1`, that's why we subtract 1 from the page number.

```sql
SELECT `id`, `name` FROM `users` LIMIT 2 OFFSET 0
```

The following result will represents the page 1 of the pagination:

```
+----+----------+
| id | Name     |
+----+----------+
| 1  | John     |
| 2  | Jane     |
+----+----------+
```

MySQL has a different way to use offset, without using the `OFFSET` clause.

```sql
SELECT `id`, `name` FROM `users` LIMIT 0,2
```

The first parameter is the offset and the second parameter is the rows count.

To get the second page or in other word the next two rows, we must use the `OFFSET` as the example below:

```
PAGE = 2
LIMIT = 2
OFFSET = (PAGE-1) * LIMIT
OFFSET = (2-1) * 2
OFFSET = 1 * 2
OFFSET = 2
```

```sql
SELECT `id`, `name` FROM `users` LIMIT 2 OFFSET 2
```

The result of the query will be:

```
+----+----------+
| id | Name     |
+----+----------+
| 3  | Peter    |
| 4  | Joseph   |
+----+----------+
```

The query translate to skip the first 2 items and get the next 2 rows.

So getting the third page we use the following and `OFFSET` of 4, to skip the first 4 items.

```
PAGE = 3
LIMIT = 2
OFFSET = (PAGE-1) * LIMIT
OFFSET = (3-1) * 2
OFFSET = 2 * 2
OFFSET = 4
```

```sql
SELECT `id`, `name` FROM `users` LIMIT 2 OFFSET 4
```

```
+----+----------+
| id | Name     |
+----+----------+
| 5  | Mary     |
| 6  | Jack     |
+----+----------+
```

## Problem using ORDER BY

Using `OFFSET` and `ORDER BY` together could make the pagination non-functional.

From MySQL documentation:

> If multiple rows have identical values in the ORDER BY columns, the server is free to return those rows in any order, and may do so differently depending on the overall execution plan. In other words, the sort order of those rows is nondeterministic with respect to the nonordered columns.

The most common situation is that if you are sorting by a column that doesn't have an index, MySQL Server cannot determine a proper order of the rows resulting in different orders.

One way to solve this is by adding an index to the column or columns. Although this may not be as optimal if you don't want or need to add indexes to multiple columns only for this purpose.

From MySQL documentation:

> If it is important to ensure the same row order with and without LIMIT, include additional columns in the ORDER BY clause to make the order deterministic.

What this means is there's another way to solve this is by adding to `ORDER BY` columns list an unique column, for example a primary key column.

```sql
SELECT `id`, `name` FROM `users` LIMIT 2 OFFSET 2 ORDER BY `name`, `id`
```

Instead of:

```sql
SELECT `id`, `name` FROM `users` LIMIT 2 OFFSET 2 ORDER BY `name`
```

This way you can make sure that MySQL sorts the rows before finding the `LIMIT` number of rows.