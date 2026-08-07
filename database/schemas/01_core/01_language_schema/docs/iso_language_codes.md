# ISO Language Codes

## Overview

Language identifiers are essential for building multilingual applications. Instead of storing language names directly, modern systems use internationally recognized standards to uniquely identify languages, writing systems, and locales.

The BookQubit Language Schema follows these standards to ensure consistency, interoperability, and scalability.

---

# Standards Used

| Standard       | Organization       | Purpose                                                 |
| -------------- | ------------------ | ------------------------------------------------------- |
| **ISO 639-1**  | ISO                | Two-letter language codes                               |
| **ISO 639-2**  | ISO                | Three-letter language codes (bibliographic/terminology) |
| **ISO 639-3**  | ISO                | Three-letter codes for individual languages             |
| **ISO 15924**  | ISO                | Script (writing system) codes                           |
| **ISO 3166-1** | ISO                | Country/region codes                                    |
| **BCP 47**     | IETF               | Language tags (locales)                                 |
| **Unicode**    | Unicode Consortium | Universal character encoding                            |
| **CLDR**       | Unicode Consortium | Locale and internationalization data                    |

---

# ISO 639 Language Codes

## ISO 639-1

ISO 639-1 defines **two-letter** language codes and is the preferred standard for most applications.

| Language   | Code |
| ---------- | ---- |
| English    | `en` |
| Hindi      | `hi` |
| Arabic     | `ar` |
| Bengali    | `bn` |
| Chinese    | `zh` |
| French     | `fr` |
| German     | `de` |
| Japanese   | `ja` |
| Korean     | `ko` |
| Russian    | `ru` |
| Spanish    | `es` |
| Tamil      | `ta` |
| Telugu     | `te` |
| Gujarati   | `gu` |
| Marathi    | `mr` |
| Punjabi    | `pa` |
| Urdu       | `ur` |
| Portuguese | `pt` |
| Italian    | `it` |
| Dutch      | `nl` |

---

## ISO 639-2

ISO 639-2 provides three-letter codes. These are commonly used in libraries, archives, and metadata systems.

| Language | Code  |
| -------- | ----- |
| English  | `eng` |
| Hindi    | `hin` |
| Japanese | `jpn` |
| Arabic   | `ara` |
| Chinese  | `zho` |
| French   | `fra` |
| German   | `deu` |
| Russian  | `rus` |
| Spanish  | `spa` |
| Tamil    | `tam` |

---

## ISO 639-3

ISO 639-3 expands language identification to include thousands of individual languages and dialects.

Example:

| Language | Code  |
| -------- | ----- |
| English  | `eng` |
| Hindi    | `hin` |
| Sanskrit | `san` |
| Bhojpuri | `bho` |
| Maithili | `mai` |
| Kashmiri | `kas` |

---

# ISO 15924 Script Codes

Scripts identify the writing system used by a language.

| Script        | Code   | Example Language |
| ------------- | ------ | ---------------- |
| Latin         | `Latn` | English          |
| Devanagari    | `Deva` | Hindi            |
| Arabic        | `Arab` | Arabic, Urdu     |
| Cyrillic      | `Cyrl` | Russian          |
| Han (Chinese) | `Hani` | Chinese          |
| Hiragana      | `Hira` | Japanese         |
| Katakana      | `Kana` | Japanese         |
| Hangul        | `Hang` | Korean           |
| Tamil         | `Taml` | Tamil            |
| Bengali       | `Beng` | Bengali          |
| Gujarati      | `Gujr` | Gujarati         |
| Gurmukhi      | `Guru` | Punjabi          |
| Hebrew        | `Hebr` | Hebrew           |
| Thai          | `Thai` | Thai             |
| Georgian      | `Geor` | Georgian         |

---

# ISO 3166-1 Country Codes

Country codes are commonly combined with language codes to create locale identifiers.

| Country        | Code |
| -------------- | ---- |
| India          | `IN` |
| United States  | `US` |
| United Kingdom | `GB` |
| Canada         | `CA` |
| Australia      | `AU` |
| Japan          | `JP` |
| China          | `CN` |
| Germany        | `DE` |
| France         | `FR` |
| Brazil         | `BR` |
| Saudi Arabia   | `SA` |

---

# BCP 47 Locale Identifiers

A locale combines a language code with optional script and region information.

## Format

```text
language[-Script][-REGION]
```

Examples:

| Locale       | Description                  |
| ------------ | ---------------------------- |
| `en`         | English                      |
| `en-US`      | English (United States)      |
| `en-GB`      | English (United Kingdom)     |
| `hi-IN`      | Hindi (India)                |
| `ar-SA`      | Arabic (Saudi Arabia)        |
| `zh-CN`      | Chinese (China)              |
| `zh-Hant-TW` | Traditional Chinese (Taiwan) |
| `sr-Cyrl-RS` | Serbian (Cyrillic, Serbia)   |
| `sr-Latn-RS` | Serbian (Latin, Serbia)      |

---

# Language Direction

Some languages are written from left to right, while others are written from right to left.

| Direction | Description   |
| --------- | ------------- |
| `LTR`     | Left-to-Right |
| `RTL`     | Right-to-Left |

Examples:

| Language | Direction |
| -------- | --------- |
| English  | LTR       |
| Hindi    | LTR       |
| Japanese | LTR       |
| Tamil    | LTR       |
| Arabic   | RTL       |
| Urdu     | RTL       |
| Hebrew   | RTL       |
| Persian  | RTL       |

---

# Unicode

BookQubit stores all multilingual text using Unicode.

Benefits include:

* Global character support
* Emoji support
* Cross-platform compatibility
* Accurate storage of multilingual text
* Reliable searching and sorting

Example:

| Language | Text   |
| -------- | ------ |
| English  | Hello  |
| Hindi    | नमस्ते |
| Japanese | こんにちは  |
| Arabic   | مرحبًا |
| Russian  | Привет |
| Chinese  | 你好     |

---

# CLDR (Common Locale Data Repository)

CLDR provides standardized localization data, including:

* Language names
* Territory names
* Date formats
* Time formats
* Number formats
* Currency formats
* Pluralization rules
* Calendar systems
* Measurement units

BookQubit can integrate CLDR data to improve localization quality.

---

# Recommended Database Fields

The `languages` table should include the following fields.

| Column        | Example | Standard        |
| ------------- | ------- | --------------- |
| `code`        | `en`    | ISO 639-1       |
| `locale`      | `en-US` | BCP 47          |
| `name`        | English | Application     |
| `native_name` | English | Native language |
| `script`      | `Latn`  | ISO 15924       |
| `direction`   | `LTR`   | Application     |
| `enabled`     | `TRUE`  | Application     |

---

# Example Language Records

| Code | Locale | Name     | Native Name | Script | Direction |
| ---- | ------ | -------- | ----------- | ------ | --------- |
| en   | en-US  | English  | English     | Latn   | LTR       |
| hi   | hi-IN  | Hindi    | हिन्दी      | Deva   | LTR       |
| ar   | ar-SA  | Arabic   | العربية     | Arab   | RTL       |
| ja   | ja-JP  | Japanese | 日本語         | Jpan*  | LTR       |
| ko   | ko-KR  | Korean   | 한국어         | Hang   | LTR       |

> **Note:** Japanese commonly uses a combination of scripts (Kanji, Hiragana, and Katakana). ISO 15924 also defines `Jpan` to represent the Japanese writing system as a whole.

---

# Best Practices

* Prefer ISO 639-1 codes whenever available.
* Use ISO 639-3 only when a language has no ISO 639-1 code or when greater specificity is required.
* Store script codes using ISO 15924.
* Store locale identifiers using BCP 47.
* Use ISO 3166-1 country codes in locale identifiers.
* Store all multilingual text as Unicode.
* Support both LTR and RTL layouts.
* Keep translations and transliterations separate from the language registry.
* Validate codes before inserting them into the database.

---

# References

| Standard   | Description                   |
| ---------- | ----------------------------- |
| ISO 639    | Language code standards       |
| ISO 15924  | Script code standard          |
| ISO 3166-1 | Country code standard         |
| BCP 47     | Language tag specification    |
| Unicode    | Universal character encoding  |
| CLDR       | Common Locale Data Repository |

---

# Summary

Using internationally recognized standards makes the Language Schema portable, interoperable, and future-proof. By combining ISO 639 language codes, ISO 15924 script codes, ISO 3166-1 region codes, BCP 47 locale identifiers, Unicode, and CLDR data, BookQubit provides a robust foundation for multilingual content, localization, search, and global expansion.
