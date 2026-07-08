# Language Schema Tables

## Overview

The Language Schema consists of five core tables designed to manage languages, writing systems, localized names, regional mappings, and aliases.

---

# Table Relationship

```
scripts
   │
   │
   ▼
languages
   │
   ├──────────────┐
   │              │
   ▼              ▼
language_names   language_regions
   │
   ▼
language_aliases
```

---

# 1. languages

Stores the master record for every supported language.

## Primary Key

```
language_id
```

## Important Columns

| Column | Description |
|---------|-------------|
| language_code | Internal language code |
| language_name | Default language name |
| english_name | English display name |
| native_name | Native language name |
| iso_639_1 | ISO 639-1 code |
| iso_639_2 | ISO 639-2 code |
| iso_639_3 | ISO 639-3 code |
| locale_code | Locale identifier |
| default_script_id | Writing system |
| direction | LTR / RTL |
| is_default | Default application language |
| is_active | Active language |

## Example

| language_code | language_name |
|---------------|---------------|
| en | English |
| hi | Hindi |
| ar | Arabic |

---

# 2. scripts

Stores Unicode writing systems.

## Primary Key

```
script_id
```

## Important Columns

| Column | Description |
|---------|-------------|
| script_code | Internal script code |
| iso15924_code | ISO 15924 code |
| script_name | Script name |
| native_name | Native script name |
| direction | LTR / RTL |
| unicode_range | Unicode block |

## Example

| Script | ISO |
|----------|-----|
| Latin | Latn |
| Devanagari | Deva |
| Arabic | Arab |

---

# 3. language_names

Stores translated names for every language.

Example

English displayed in Hindi

```
अंग्रेज़ी
```

Hindi displayed in English

```
Hindi
```

Japanese displayed in French

```
Japonais
```

## Primary Key

```
language_name_id
```

## Important Columns

| Column | Description |
|---------|-------------|
| language_id | Language being translated |
| display_language_id | Language used for display |
| language_name | Localized language name |
| native_name | Native representation |
| short_name | Short display label |
| is_preferred | Preferred translation |
| is_official | Official translation |
| is_active | Active record |

---

# 4. language_regions

Maps languages to countries or regions.

## Primary Key

```
language_region_id
```

## Important Columns

| Column | Description |
|---------|-------------|
| language_id | Language |
| country_id | Country reference |
| is_official | Official language |
| is_primary | Primary language |
| speaker_population | Estimated speakers |
| literacy_rate | Literacy percentage |
| notes | Additional information |

## Example

English

- United States
- Canada
- Australia

Hindi

- India

Arabic

- Saudi Arabia
- Egypt
- UAE

---

# 5. language_aliases

Stores alternate names for searching and compatibility.

## Primary Key

```
language_alias_id
```

## Important Columns

| Column | Description |
|---------|-------------|
| language_id | Parent language |
| alias_name | Alias text |
| alias_type | Alias category |
| language_code | Optional alias code |
| is_preferred | Preferred alias |
| is_searchable | Search enabled |
| sort_order | Display order |
| notes | Additional notes |

## Alias Types

- alternative
- native
- historical
- abbreviation
- iso
- transliteration
- romanized
- common
- short

## Examples

English

- Modern English
- British English
- Old English

Hindi

- Hindustani
- Modern Hindi

---

# Relationships

## scripts → languages

```
scripts.script_id
        │
        ▼
languages.default_script_id
```

Relationship

```
One Script
      │
      ▼
Many Languages
```

---

## languages → language_names

```
languages.language_id
        │
        ▼
language_names.language_id
```

Relationship

```
One Language
      │
      ▼
Many Localized Names
```

---

## languages → language_regions

```
languages.language_id
        │
        ▼
language_regions.language_id
```

Relationship

```
One Language
      │
      ▼
Many Countries
```

---

## languages → language_aliases

```
languages.language_id
        │
        ▼
language_aliases.language_id
```

Relationship

```
One Language
      │
      ▼
Many Aliases
```

---

# Summary

| Table | Purpose |
|---------|---------|
| languages | Master language records |
| scripts | Unicode writing systems |
| language_names | Localized display names |
| language_regions | Language-to-country mapping |
| language_aliases | Alternate and searchable names |

---

# Design Goals

- Fully normalized schema
- ISO 639 compliant
- ISO 15924 compliant
- Unicode ready
- Locale aware
- RTL/LTR support
- Search friendly
- Extensible for future language metadata
- Optimized for multilingual applications