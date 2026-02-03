# SQL to MongoDB Aggregation Mapping

| SQL | MongoDB Aggregation |
|-----|---------------------|
| WHERE | `$match` |
| GROUP BY | `$group` |
| HAVING | `$match` |
| SELECT | `$project` |
| ORDER BY | `$sort` |
| LIMIT | `$limit` |
| SUM() | `$sum` |
| COUNT() | `$sum` / `$sortByCount` |
| JOIN | `$lookup` |
| SELECT INTO NEW_TABLE | `$out` |
| MERGE INTO TABLE | `$merge` |
| UNION ALL | `$unionWith` |



$ne = not
$unwind = breaks items from array to multiple objects

source : https://www.mongodb.com/docs/manual/reference/sql-aggregation-comparison/