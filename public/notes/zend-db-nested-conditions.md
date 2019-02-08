If you want to nest multiple conditions using Zend DB, there's two methods made for this, `nest()` and `unnest()`, it begins and ends the nesting. Alternative you can use `nest` and `unnest` as property.

We are going to create the query below using Zend DB.

```sql
SELECT `id`, `name`, `language`, `country`
FROM `customers`
WHERE `country` = 'jp'
    AND (`language` = 'en' OR `language` = 'ja')
```

```php
use Zend\Db\Sql\Sql;
use Zend\Db\Sql\Where;

$sql = new Sql($adapter);
$select = $sql->select();
$select->columns([
  'id',
  'name',
  'language',
  'country'
]);
$select->from('customers');

$where = new Where();
$where->equalTo('country', 'jp');

// Open nesting
$whereNest = $where->nest();
$whereNest->equalTo('language', 'en');
$whereNest->or;
$whereNest->equalTo('language', 'ja');

// Close nesting
$whereNest->unnest();
$select->where($where);

$statement = $sql->prepareStatementForSqlObject($select);
$results = $statement->execute();
```