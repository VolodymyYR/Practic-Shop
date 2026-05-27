# Create Product

## step by step

Requirements:

 - User have "product.create" permission

   

### 1. Upload an image for future product variants
```http
POST /api/Media/upload
Content-Type: multipart/form-data

file: <file>
```
**Response:**

```code
{ "url": "https://example/slippers-cat-38.jpg" }
```

---

### 2. Get Specification scheme, for future product variants
```http
GET /api/Category/schema?ids=6,7
```
**Response:**

```json
[
  { "key": "size", "label": "Розмір", "type": 2, "required": true, "values": ["36","37","38"] },
  { "key": "print", "label": "Принт", "type": 0, "required": false, "values": null }
]
```
Frontend will collect data from user to create product variant with this specific schema.

---

### 3. Create product with at least one variant
```http
POST /api/Product
Content-Type: application/json
```
```json
{
  "name": "Тапочки з котиками",
  "categories": [6],
  "variants": [
    {
      "articleCode": "SLP-CAT-38",
      "imageUrl": "https://example/slippers-cat-38.jpg",
      "price": 349.99,
      "discountPercentage": 0,
      "stockQuantity": 15,
      "specifications": {
        "size": "38",
        "print": "котики"
      }
    }
  ]
}
```

# Add Variant

## spet by step

Requirements:

 - User have "product.create" permission

   

### 1. Upload an image for future product variants
```http
POST /api/Media/upload
Content-Type: multipart/form-data

file: <file>
```
**Response:**

```code
{ "url": "https://example/slippers-cat-38.jpg" }
```

---

### 2. Get Specification scheme, for future product variants
```http
GET /api/Category/schema?ids=6,7
```
**Response:**

```json
[
  { "key": "size", "label": "Розмір", "type": 2, "required": true, "values": ["36","37","38"] },
  { "key": "print", "label": "Принт", "type": 0, "required": false, "values": null }
]
```
Frontend will collect data from user to create product variant with this specific schema.

---

### 3. Create variant with schema

```http
POST /api/Product/{productId}/variants
Content-Type: application/json
```

```json
{
  "articleCode": "SLP-CAT-39",
  "imageUrl": "slippers-cat-39.jpg",
  "price": 349.99,
  "label": "Сині тапочки з котиками",
  "description": "М'які флісові тапочки",
  "stockQuantity": 10,
  "discountPercentage": 0,
  "specifications": {
    "size": "39",
    "color": "Blue"
  }
}
```
