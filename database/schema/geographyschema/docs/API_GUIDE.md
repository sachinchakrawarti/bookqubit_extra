# Geography Schema API Guide

## Overview

The Geography Schema provides a centralized API for accessing geographical information throughout the BookQubit platform.

All APIs are read-only except administrative endpoints.

This schema is shared by:

- 📚 Books
- 📖 Comics
- 👤 Authors
- 🏢 Publishers
- 👥 Users
- 🏛 Organizations
- 🎉 Events
- 🌍 Search
- 📊 Analytics

---

# Base URL

```
/api/v1/geography
```

---

# Authentication

| Endpoint | Authentication |
|-----------|---------------|
| Public Geography APIs | ❌ No |
| Search APIs | ❌ No |
| Admin APIs | ✅ Yes |
| Import APIs | ✅ Admin |
| Seed APIs | ✅ Admin |

---

# Response Format

Successful response

```json
{
    "success": true,
    "message": "Countries fetched successfully.",
    "data": [],
    "meta": {
        "page": 1,
        "limit": 20,
        "total": 249
    }
}
```

Error response

```json
{
    "success": false,
    "message": "Country not found.",
    "error": {
        "code": "COUNTRY_NOT_FOUND"
    }
}
```

---

# Continents API

## Get All Continents

```
GET /continents
```

Response

```json
[
    {
        "id":1,
        "name":"Asia",
        "code":"AS"
    }
]
```

---

## Get Continent

```
GET /continents/{id}
```

---

# Regions API

## Get All Regions

```
GET /regions
```

---

## Regions by Continent

```
GET /continents/{continentId}/regions
```

Example

```
GET /continents/2/regions
```

---

# Sub Regions API

## Get All

```
GET /subregions
```

---

## Get by Region

```
GET /regions/{regionId}/subregions
```

---

# Countries API

## Get All Countries

```
GET /countries
```

Query Parameters

| Parameter | Description |
|------------|-------------|
| page | Pagination |
| limit | Items per page |
| search | Search country |
| sort | Sorting |
| language | Response language |

Example

```
GET /countries?page=1&limit=20
```

---

## Get Country

```
GET /countries/{countryId}
```

---

## Search Country

```
GET /countries/search?q=india
```

---

## Country by ISO2

```
GET /countries/code/IN
```

---

## Country by ISO3

```
GET /countries/code3/IND
```

---

## Country Languages

```
GET /countries/{id}/languages
```

---

## Country States

```
GET /countries/{id}/states
```

---

## Country Cities

```
GET /countries/{id}/cities
```

---

## Neighbor Countries

```
GET /countries/{id}/neighbors
```

---

## Country Capital

```
GET /countries/{id}/capital
```

---

## Country Flag

```
GET /countries/{id}/flag
```

---

# States API

## Get All States

```
GET /states
```

---

## Get State

```
GET /states/{id}
```

---

## Search State

```
GET /states/search?q=madhya
```

---

## State Cities

```
GET /states/{id}/cities
```

---

# Cities API

## Get Cities

```
GET /cities
```

---

## Get City

```
GET /cities/{id}
```

---

## Search City

```
GET /cities/search?q=bhopal
```

---

# Languages API

## Get Languages

```
GET /languages
```

---

## Country Languages

```
GET /languages/country/{countryId}
```

---

# Currency API

## Get All

```
GET /currencies
```

---

## Currency

```
GET /currencies/{id}
```

---

# Timezones API

## Get All

```
GET /timezones
```

---

## Country Timezones

```
GET /countries/{id}/timezones
```

---

# Translation API

## Country Translation

```
GET /countries/{id}/translations
```

Example

```
GET /countries/101/translations?lang=hi
```

---

## State Translation

```
GET /states/{id}/translations
```

---

## City Translation

```
GET /cities/{id}/translations
```

---

# Search APIs

## Global Search

```
GET /search?q=india
```

Returns

- Continents
- Regions
- Countries
- States
- Cities

---

## Country Search

```
GET /search/countries?q=india
```

---

## City Search

```
GET /search/cities?q=tokyo
```

---

## State Search

```
GET /search/states?q=california
```

---

# Filter APIs

## Countries by Continent

```
GET /countries?continent=asia
```

---

## Countries by Region

```
GET /countries?region=southern-asia
```

---

## Countries by Currency

```
GET /countries?currency=INR
```

---

## Countries by Language

```
GET /countries?language=hi
```

---

# Pagination

```
?page=1

&limit=25
```

Response

```json
{
    "meta":{
        "page":1,
        "limit":25,
        "total":249,
        "pages":10
    }
}
```

---

# Sorting

Ascending

```
?sort=name
```

Descending

```
?sort=-name
```

---

# Filtering

Examples

```
?continent=asia

?currency=USD

?timezone=Asia/Kolkata

?language=en
```

---

# Localization

Supported

```
?lang=en

?lang=hi

?lang=ja

?lang=fr

?lang=ar

?lang=ko
```

---

# Admin APIs

Create Country

```
POST /admin/countries
```

Update Country

```
PUT /admin/countries/{id}
```

Delete Country

```
DELETE /admin/countries/{id}
```

---

# Seed APIs

Run Seed

```
POST /admin/seed
```

---

# Import APIs

Import CSV

```
POST /admin/import/countries
```

Import JSON

```
POST /admin/import/json
```

---

# Export APIs

Export Countries

```
GET /export/countries
```

Export States

```
GET /export/states
```

Export Cities

```
GET /export/cities
```

Supported formats

- JSON
- CSV
- SQL

---

# Status Codes

| Code | Meaning |
|------|---------|
|200|Success|
|201|Created|
|204|Deleted|
|400|Bad Request|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|
|409|Conflict|
|422|Validation Error|
|500|Internal Server Error|

---

# API Versioning

```
/api/v1/geography

/api/v2/geography
```

Future versions should remain backward compatible whenever possible.

---

# Rate Limits

| User Type | Limit |
|-----------|-------|
| Guest | 100 requests/hour |
| Registered User | 1,000 requests/hour |
| Admin | Unlimited |

---

# Best Practices

- Use pagination for large datasets.
- Prefer IDs or ISO codes over names for lookups.
- Cache reference data such as continents and currencies.
- Always request localized names using the `lang` parameter when building multilingual interfaces.
- Validate ISO codes before import.
- Return consistent JSON response structures across all endpoints.

---

# Future APIs

Planned endpoints include:

- Nearby Cities
- Reverse Geocoding
- Coordinates Lookup
- Distance Between Cities
- Population Rankings
- Country Statistics
- GeoJSON Export
- Interactive Map Data
- Climate Zones
- Postal Code Lookup

---

# Document Information

| Property | Value |
|----------|-------|
| Project | BookQubit |
| Module | Geography Schema |
| Document | API_GUIDE.md |
| API Version | v1 |
| Database | SQLite |
| Status | Production Ready |