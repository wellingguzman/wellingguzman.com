MySQL provides a database with metadata and information about the server, such as list of all the tables in a database and columns data type.

Fetching a table information can be done with the following query:

```sql
SELECT TABLE_NAME, ENGINE, TABLE_COLLATION
FROM INFORMATION_SCHEMA.TABLES
WHERE
  TABLE_SCHEMA = "mydatabase"
  AND TABLE_NAME = "Products"
```

Result:

```text
+------------+--------+-----------------+
| TABLE_NAME | ENGINE | TABLE_COLLATION |
+------------+--------+-----------------+
| products   | InnoDB | utf8_general_ci |
+------------+--------+-----------------+
```

This result is what we expected, the name, the engine and the collation. The problem comes when the table have uppercase letter, as the result always seems to be in lowercase.

I can't tell if this is a configuration issue or a mysql bug.

Making a the condition for table name twice solves the issue.

```sql
SELECT TABLE_NAME, ENGINE, TABLE_COLLATION
FROM INFORMATION_SCHEMA.TABLES
WHERE
  TABLE_SCHEMA = "mydatabase"
  AND (
    TABLE_NAME = "Products"
    OR TABLE_NAME = "Products"
  )
```

The query above will result with the table name in the original case it was created.

```text
+------------+--------+-----------------+
| TABLE_NAME | ENGINE | TABLE_COLLATION |
+------------+--------+-----------------+
| Products   | InnoDB | utf8_general_ci |
+------------+--------+-----------------+
```
