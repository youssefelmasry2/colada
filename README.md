# Colada 

## Running the project

```bash
docker compose up -d 
```

Then go to:
- http://localhost for the API
- http://localhost:8081 for Mongo Express (database GUI)

## Data Model & Relationships

```
User
 ├── has many → Orders
 └── has many → Reviews

Merchant
 ├── has many → Products
 ├── has many → Orders
 └── has many → Promotions

Product
 ├── belongs to → Merchant
 └── has many → Reviews

Order
 ├── belongs to → User
 ├── belongs to → Merchant
 ├── has many → OrderItems (embedded)
 └── may have → Promotion

OrderItem (embedded in Order)
 └── references → Product (with price snapshot)

Promotion
 └── belongs to → Merchant

Review
 ├── belongs to → User
 └── belongs to → Product
```

### Indexes
- `User.email` - unique, indexed (for login lookups)
- `Merchant.email` - unique, indexed
- `Merchant.storeName` - unique, indexed
- `Product.merchantId` - indexed (for filtering products by merchant)
- `Order.merchant` - indexed (for getting orders by merchant)
- `Promotion.code` - unique, indexed (for promo code lookups)
- `Review.product` - indexed (for getting reviews by product) 

## Assumptions I made

- Users are already authenticated (no auth/JWT stuff implemented)
- Stock doesn't run out - didn't add stock validation when creating orders
- Each promotion belongs to one merchant only
- Everything is in the same currency
- OrderItems store a price snapshot so if product price changes later, order history stays accurate
- No MongoDB transactions - operations aren't atomic, so if something fails mid-order there's no rollback
- Prices are stored as regular Numbers, not Decimal - good enough for this but not ideal for real money stuff 
- Error handling isn't perfect - most errors just return 500 to the client. I'm sure I'll adapt to whatever patterns are already in place once I'm in the codebase.

## What I got done

**Data Modeling** - All the schemas with proper refs and a few indexes

**Aggregation** - Merchant performance report (orders by status, revenue, avg order value)

**Docker setup** - Everything runs with docker compose, nginx is proxying the api with some basic security headers

## What I didn't finish

The promotion impact analysis (before/during/after metrics).
Top product/category insights

## Quick note

I'll be honest  my brain is pretty fried at this point. I know this assessment is heavy on MongoDB and aggregations, and I didn't get to everything. But I pick things up fast when I can actually dig into real problems, so I'm confident I can get deeper into Mongo during onboarding if given the chance.

Also fair warning i'm pretty NestJS biased based on the module architecture I used here .


