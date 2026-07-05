# Transliteration Guide

## BookQubit Database

Version: 1.0.0

---

# Overview

Transliteration converts text from one writing system (script) into another while preserving pronunciation as closely as possible.

Unlike translation, transliteration does **not** change the meaning.

---

# Definition

Transliteration

```
Original Script
        ↓
Different Script
```

Meaning remains exactly the same.

---

# Examples

| Original | Transliteration |
|-----------|----------------|
| भारत | Bharat |
| Москва | Moskva |
| Ελλάδα | Ellada |
| 日本 | Nihon |
| 서울 | Seoul |

---

# Transliteration vs Translation

Original

```
भारत
```

Transliteration

```
Bharat
```

Translation

```
India
```

---

# Why BookQubit Uses Transliteration

- URL Slugs
- Search
- API
- SEO
- User Input
- Cross-language Matching

---

# Supported Scripts

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
- Hebrew
- Cyrillic
- Greek
- Japanese
- Korean
- Chinese
- Thai
- Latin

---

# Database Fields

romanized_name

slug

alternate_spellings

---

# Example

Original

```
मैं नास्तिक क्यों हूँ
```

Transliteration

```
Main Nastik Kyon Hoon
```

Slug

```
main-nastik-kyon-hoon
```

---

# Standards

Hindi → ISO 15919

Japanese → Hepburn

Chinese → Hanyu Pinyin

Korean → Revised Romanization

Greek → ISO 843

Russian → ISO 9

Arabic → UNGEGN

---

# Best Practices

✔ Never change meaning

✔ Preserve pronunciation

✔ ASCII slug

✔ Store separately from translations

✔ Support alternate spellings

---

# Future

- AI Transliteration
- Search Suggestions
- Alternate Spellings
- Pronunciation Support