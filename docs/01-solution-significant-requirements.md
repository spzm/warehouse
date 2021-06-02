# Solution Significant Requirements
The main goal of this doc is to extract significant requirements. 

Goal - implement a warehouse software.

## Functional Requirements

### Storing articles
- Article should have: an identification number, name, available in stock.
- Articles can be loaded from a file (inventory.json).

### Storing products
- Products are made from different articles.
- Product should have: name, price, list of articles with quantity.
- Products can be loaded from a file (products.json)

### Minimal functionality
- Get all products, and their quantity based on inventory.
- Sell a product (with inventory update).

## Non-Functional Requirements

Coding language choice.

### Simplicity

- Easy to understand what it’s doing

### Readability

- Easy to scan the code
- Naming
  
### Maintainability


### Testability

