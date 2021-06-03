# Solution design

## Assumptions

1. FR requires storing product price, but it's not represented in mock data. So, prices will be omitted in the solution.
2. Business domain has defined that inventory is storing articles. This naming convention will be taking into account when possible. 

## API design

There are two consumable resources by FR - products and inventory. They can be represented as two resources in REST API. Name "inventory" won't work well for REST naming convention, so 'articles' is used to get all items in inventory. 

```
/products - GET, DELETE
/inventory-articles - GET, POST, DELETE
```

### API design Tradeoffs:
- DELETE method to represent a selling is used for simplicity. If more requirements or more detailed process explained - /checkout and /
- Selling a product remove multiple articles and product count will be updated. In real worlds when we sell a product it not just disappear, so we have to store information about sold product and articles. For the reason of simplicity, we will use additional table to log that, but choosing the approach in real system design depends on global requirements.
- node.js and microservices architecture will be used as it is part of future sustainable platform (target platform is k8s and GCloud). In general, backend choice have many options by the language and framework. For the architecture - serverless or hybrid SOA/microservice architectures are also valid. In general, MACH architecture represents the modern direction for scaled e-commerce platform.

## Data model design

1. Data model represented by three entities - product, product articles and articles inventory. Count of a product depends of available inventory articles.
2. When a product selled - multiple inventory articles should be removed with it. It requires execute the changes in transaction to maintain consistency of parallel operations.
3. Tables are normilized - but that could impact performance. To properly organize database model - more requirements have to be collected.

![Data model diagram](https://github.com/spzm/warehouse/raw/main/docs/resources/db-schema.png)

### Data Model Tradeoffs:

Usual database choice requires much more detail - number of expecting users, performance baseline, availability and scalability, resilience. 

Existing requirements: 

- microservice architecture (target k8s and GCloud) - chosen as design approach.
- relation between entities, transactions

By these requirements, easy choice can be PostgreSql, MySql, 