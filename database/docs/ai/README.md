# AI Documentation

Welcome to the **AI Documentation** for the **BookQubit Database** project.

This directory contains resources that help developers use Artificial Intelligence (AI) tools effectively while building and maintaining the BookQubit Database.

The goal is to ensure that AI-generated code, SQL, JSON, documentation, and project files follow the same architecture, standards, and naming conventions used throughout the project.

---

# Purpose

The AI documentation helps developers:

- Generate consistent SQL scripts
- Create new database schemas
- Generate JSON seed data
- Build repositories
- Create importers
- Write project documentation
- Follow project standards
- Reduce repetitive work
- Improve development speed

---

# Directory Structure

```text
docs/
└── ai/
    │
    ├── README.md
    ├── prompts/
    ├── templates/
    ├── rules/
    ├── context/
    ├── workflows/
    ├── examples/
    └── best_practices/
```

---

# Folder Overview

## prompts/

Contains reusable prompts for AI assistants.

Examples:

- Create a new schema
- Generate SQL tables
- Generate repository classes
- Create JSON data
- Write documentation
- Generate migrations

---

## templates/

Contains reusable templates.

Examples:

- SQL table template
- Repository template
- Importer template
- JSON template
- Documentation template

---

## rules/

Contains project rules that AI should follow.

Examples:

- SQL formatting
- Naming conventions
- Folder organization
- JavaScript standards
- Documentation standards

---

## context/

Contains project context that can be shared with AI tools.

Examples:

- Project overview
- Folder structure
- Database architecture
- Technology stack
- Schema organization

Providing this context helps AI generate responses that match the project's design.

---

## workflows/

Contains step-by-step development workflows.

Examples:

- Create a new schema
- Build an importer
- Generate seed data
- Create a repository
- Add translations
- Migrate to PostgreSQL

---

## examples/

Contains sample prompts and expected outputs.

Examples:

- Author schema generation
- Book importer generation
- SQL examples
- JSON examples

---

## best_practices/

Documents recommendations for working with AI.

Topics include:

- Prompt writing
- Reviewing generated code
- Avoiding duplicate code
- Validating SQL
- Testing generated scripts

---

# AI Use Cases

AI can assist with:

- SQL generation
- Schema design
- Documentation writing
- JSON generation
- Repository creation
- Importer creation
- Migration scripts
- Test generation
- Query optimization
- Code refactoring

---

# Development Workflow

```text
Developer
      │
      ▼
Choose AI Prompt
      │
      ▼
Provide Project Context
      │
      ▼
Generate Output
      │
      ▼
Review Output
      │
      ▼
Test
      │
      ▼
Commit
```

---

# AI Guidelines

When using AI:

- Always provide project context.
- Follow the project's naming conventions.
- Keep generated code modular.
- Review all generated content before use.
- Test SQL scripts before execution.
- Validate JSON files.
- Update documentation when changes are made.

AI should assist development, not replace code review or testing.

---

# Supported AI Tools

This documentation can be used with various AI coding assistants, including:

- ChatGPT
- GitHub Copilot
- Claude
- Gemini
- Cursor AI
- Windsurf
- Continue
- Sourcegraph Cody
- Amazon Q Developer

---

# Related Documentation

- `docs/architecture/`
- `docs/setup/`
- `docs/schemas/`
- `docs/import_system/`
- `docs/examples/`
- `docs/references/`

---

# Version

**Version:** 1.0.0

**Status:** Active Development