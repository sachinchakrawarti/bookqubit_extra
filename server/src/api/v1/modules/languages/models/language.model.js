// src/api/v1/modules/languages/models/language.model.js

export default class Language {
  constructor(row = {}) {
    this.language_id = row.language_id ?? null;
    this.language_code = row.language_code ?? null;

    this.language_name = row.language_name ?? null;
    this.english_name = row.english_name ?? null;
    this.native_name = row.native_name ?? null;

    this.iso_639_1 = row.iso_639_1 ?? null;
    this.iso_639_2 = row.iso_639_2 ?? null;
    this.iso_639_3 = row.iso_639_3 ?? null;

    this.locale_code = row.locale_code ?? null;
    this.default_script_id = row.default_script_id ?? null;
    this.direction = row.direction ?? 'LTR';

    this.sort_order = row.sort_order ?? 0;
    this.is_default = Boolean(row.is_default);
    this.is_active = Boolean(row.is_active);

    this.created_at = row.created_at ?? null;
    this.updated_at = row.updated_at ?? null;
  }
}