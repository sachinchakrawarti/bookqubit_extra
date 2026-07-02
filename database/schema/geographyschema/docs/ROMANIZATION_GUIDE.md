# Romanization Guide

## BookQubit Database

**Schema:** Geography

**Version:** 1.0.0

---

# Overview

BookQubit supports **20+ languages** and therefore stores text in multiple forms.

Every translatable field may contain:

- Original Script
- Native Name
- Romanized (Latin)
- English Translation

This enables:

- Global Search
- SEO-friendly URLs
- URL Slugs
- Cross-language discovery
- Consistent APIs

---

# Terminology

## 1. Original

The text exactly as published.

Example

| Language | Original |
|----------|----------|
| Hindi | मैं नास्तिक क्यों हूँ |
| Japanese | 日本 |
| Arabic | الهند |
| Russian | Россия |

---

## 2. Native Name

How native speakers write it.

Example

| Country | Native Name |
|----------|-------------|
| India | भारत |
| Japan | 日本 |
| Germany | Deutschland |

---

## 3. Romanization (Latin)

Convert the original script into the Latin alphabet.

Romanization **does not translate meaning**.

Example

| Original | Romanized |
|-----------|------------|
| भारत | Bharat |
| 日本 | Nihon |
| 서울 | Seoul |
| Москва | Moskva |
| Αθήνα | Athína |

---

## 4. Translation

Translate the meaning into another language.

Example

| Original | Translation |
|-----------|-------------|
| 日本 | Japan |
| भारत | India |
| Deutschland | Germany |

---

# Romanization vs Translation

| Original | Romanization | Translation |
|-----------|--------------|-------------|
| भारत | Bharat | India |
| 日本 | Nihon | Japan |
| 대한민국 | Daehan Minguk | South Korea |
| 中国 | Zhongguo | China |
| Ελλάδα | Ellada | Greece |

---

# Why Romanization?

Romanization is used for:

- URL Slugs
- Search
- APIs
- SEO
- QR Codes
- International Users

Example

Original

```
भारत
```

Romanized

```
bharat
```

URL

```
/countries/bharat
```

instead of

```
/countries/भारत
```

---

# Romanization Standards

BookQubit follows internationally recognized standards whenever possible.

| Language | Standard |
|----------|----------|
| Hindi | ISO 15919 |
| Sanskrit | ISO 15919 |
| Marathi | ISO 15919 |
| Bengali | ISO 15919 |
| Gujarati | ISO 15919 |
| Punjabi | ISO 15919 |
| Tamil | ISO 15919 |
| Telugu | ISO 15919 |
| Kannada | ISO 15919 |
| Malayalam | ISO 15919 |
| Odia | ISO 15919 |
| Arabic | UNGEGN / BGN-PCGN |
| Persian | ALA-LC |
| Hebrew | ISO 259 |
| Russian | ISO 9 |
| Ukrainian | ISO 9 |
| Greek | ISO 843 |
| Japanese | Hepburn |
| Korean | Revised Romanization |
| Chinese | Hanyu Pinyin |
| Thai | RTGS |

---

# Database Fields

Each translation table contains

| Column | Description |
|---------|-------------|
| official_name | Official localized name |
| common_name | Common localized name |
| native_name | Native script |
| romanized_name | Latin representation |
| slug | URL-safe Romanized text |

Example

| official_name | native_name | romanized_name | slug |
|---------------|-------------|----------------|------|
| भारत | भारत | Bharat | bharat |
| 日本 | 日本 | Nihon | nihon |

---

# Slug Rules

BookQubit slugs always use:

- Latin alphabet
- lowercase
- hyphen separated
- ASCII only
- No spaces
- No punctuation

Examples

| Original | Slug |
|-----------|------|
| भारत | bharat |
| South Korea | south-korea |
| Côte d'Ivoire | cote-divoire |
| São Paulo | sao-paulo |

---

# Search Priority

BookQubit search checks in this order:

1. Slug
2. Romanized Name
3. Native Name
4. Common Name
5. Official Name

This allows users to search using either native or Latin text.

Example

Searching any of these returns the same country:

```
India
```

```
Bharat
```

```
भारत
```

---

# Romanization Systems

| Script | Example |
|---------|----------|
| Latin | India |
| Devanagari | Bharat |
| Arabic | Al-Hind |
| Cyrillic | Rossiya |
| Han | Zhongguo |
| Katakana | Ajia |
| Hangul | Seoul |

---

# Best Practices

✔ Never translate proper nouns during Romanization.

✔ Romanization preserves pronunciation, not meaning.

✔ Store translations separately.

✔ Store Romanization separately.

✔ URLs should always use Romanized slugs.

✔ Search should support:

- Native Script
- Romanized Text
- English Translation

---

# Example

Country

Original

```
भारत
```

Romanized

```
Bharat
```

English Translation

```
India
```

Slug

```
bharat
```

API

```json
{
  "official_name": "भारत",
  "native_name": "भारत",
  "romanized_name": "Bharat",
  "translation": "India",
  "slug": "bharat"
}
```

---

# Supported Writing Systems

BookQubit currently supports Romanization for:

- Latin
- Devanagari
- Bengali
- Gujarati
- Gurmukhi
- Tamil
- Telugu
- Kannada
- Malayalam
- Odia
- Arabic
- Persian
- Hebrew
- Greek
- Cyrillic
- Japanese
- Korean
- Simplified Chinese
- Traditional Chinese
- Thai

More writing systems can be added without changing the database schema.

---

# Future Enhancements

- Automatic Romanization
- AI-assisted Transliteration
- Pronunciation Generation
- Search Synonyms
- Alternate Spellings
- Historical Names
- Regional Variants
- Dialect Support

---

© BookQubit Database Documentation
Version 1.0.0