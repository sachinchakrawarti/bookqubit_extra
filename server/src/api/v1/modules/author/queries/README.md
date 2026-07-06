# Author Module Queries

This directory contains all SQL queries used by the **Author Module** in BookQubit.

The queries are organized by feature to improve readability, maintainability, and scalability.

---

# Directory Structure

```
queries/
│
├── admin/
├── aliases/
├── analytics/
├── authors/
├── languages/
├── shared/
├── translations/
└── index.js
```

---

# Folder Overview

## admin/

Contains SQL queries used for **administrative management of authors**.

Examples:

- Create Author
- Read Author
- Update Author
- Delete Author
- Search Authors
- Filter Authors
- List Authors
- Statistics

Example files:

```
create.author.sql
read.author.sql
update.author.sql
delete.author.sql
list.authors.sql
search.authors.sql
filter.authors.sql
stats.authors.sql
```

---

## authors/

Contains author-specific reusable SQL queries.

Typical examples include:

- Public author profile
- Author details
- Author books
- Author followers
- Author verification
- Featured authors

---

## aliases/

Contains queries for managing author aliases.

Examples:

- Create Alias
- Read Alias
- Update Alias
- Delete Alias
- List Aliases

---

## languages/

Contains queries for author-language relationships.

Examples:

- Add Language
- Read Language
- Update Language
- Delete Language
- List Languages

---

## translations/

Contains multilingual translation queries.

Examples:

- Create Translation
- Read Translation
- Update Translation
- Delete Translation
- List Translations

---

## analytics/

Contains reporting and analytical SQL.

Examples:

- Dashboard
- Overview
- Top Rated Authors
- Most Followed Authors
- Most Prolific Authors
- Language Reports
- Nationality Reports
- Rating Distribution
- Engagement
- Trends

Analytics queries should be **read-only**.

---

## shared/

Contains reusable SQL snippets shared across multiple queries.

Examples:

```
pagination.sql
sorting.sql
common-filters.sql
permissions.sql
```

These files help reduce duplication.

---

# Naming Convention

## CRUD

```
create.author.sql
read.author.sql
update.author.sql
delete.author.sql
```

---

## Collection Queries

```
list.authors.sql
search.authors.sql
filter.authors.sql
```

---

## Statistics

```
stats.authors.sql
dashboard.sql
overview.sql
```

---

# SQL Guidelines

- Use parameterized queries.
- Never concatenate user input into SQL.
- Prefer JOIN over multiple nested queries when appropriate.
- Keep each SQL file focused on a single responsibility.
- Use meaningful aliases.
- Avoid duplicated SQL logic.
- Use indexes whenever possible.
- Keep formatting consistent.

---

# Best Practices

✅ One SQL file = One operation

✅ Keep business logic out of SQL whenever possible.

✅ Reuse shared SQL snippets.

✅ Use transactions for multi-step operations.

✅ Prefer soft delete when applicable.

✅ Document complex queries with comments.

---

# Folder Responsibility

| Folder | Responsibility |
|---------|----------------|
| admin | Administrative author operations |
| authors | Public and reusable author queries |
| aliases | Author aliases |
| languages | Author languages |
| translations | Localized author content |
| analytics | Reporting and statistics |
| shared | Common reusable SQL |

---

# Future Expansion

As the Author module grows, additional folders may be introduced.

Example:

```
queries/
│
├── followers/
├── favorites/
├── awards/
├── books/
├── media/
├── history/
├── audit/
├── cache/
└── exports/
```

---

# Index File

`index.js` should export all SQL queries, allowing them to be imported from a single location.

Example:

```javascript
module.exports = {
    admin: require("./admin"),
    authors: require("./authors"),
    aliases: require("./aliases"),
    languages: require("./languages"),
    translations: require("./translations"),
    analytics: require("./analytics"),
};
```

---

# Goal

The objective of this structure is to provide:

- High readability
- Easy maintenance
- Consistent organization
- Scalable architecture
- Enterprise-ready SQL management
- Clear separation of responsibilities