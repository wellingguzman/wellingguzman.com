Using Zend DB to select data from or use a table that doesn't belong to the adapter selected database, can be done by using `TableIdentifier` instead of a string as it shows below:

```php
<?php
use Zend\Db\Sql\Sql;
use Zend\Db\Sql\TableIdentifier;

$sql = new Sql($adapter);
$select = $sql->select();
$select->from(new TableIdentifier('table', 'database'));
$select->where(array('id' => 1));

$statement = $sql->prepareStatementForSqlObject($select);
$results = $statement->execute();
```