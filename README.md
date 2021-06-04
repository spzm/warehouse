# Warehouse software

1. [Solution significant requirements](https://github.com/spzm/warehouse/blob/main/docs/01-solution-significant-requirements.md)
2. [Solution design](https://github.com/spzm/warehouse/blob/main/docs/02-solution-design.md)
3. [Products API readme](https://github.com/spzm/warehouse/blob/main/products-api/README.md)

## Quick summary:

For the all requirements - one of the best fit was Nest.js. I had quite limited experience with it, since my
primary node.js frameworks are koa and express. The same time, I really enjoyed this quick dive last two days. 

There number of drawbacks in implemented decision for current design:
- domain model has to be extracted as core
- REST API design need re-thinking by better understanding of functional use cases
- response codes and custom error
- api tags
- naming - even I tried to do it accurate - I still don't think I'm find the final version for api resources, classes.

Nest.js has the best fit for NFR requirements - Simplicity (Easy to understand what it’s doing), Readability 
(Easy to scan the code, Naming) and company functional requirements - Google Cloud + Kubernetes + Node.js.
Please view more details on [Solution design](https://github.com/spzm/warehouse/blob/main/docs/02-solution-design.md).