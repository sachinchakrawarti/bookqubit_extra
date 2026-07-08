// src/api/v1/modules/languages/dto/create-language.dto.js

export default class CreateLanguageDto {
  constructor(data = {}) {
    this.language_code = (data.language_code ?? '').trim().toLowerCase();
    this.language_name = (data.language_name ?? '').trim();
    this.english_name = (data.english_name ?? '').trim();
    this.native_name = (data.native_name ?? '').trim();

    this.iso_639_1 = data.iso_639_1?.trim().toLowerCase() || null;
    this.iso_639_2 = data.iso_639_2?.trim().toLowerCase() || null;
    this.iso_639_3 = data.iso_639_3?.trim().toLowerCase() || null;

    this.locale_code = data.locale_code?.trim() || null;
    this.default_script_id = data.default_script_id ?? null;
    this.direction = data.direction?.trim().toUpperCase() || 'LTR';
    this.is_default = data.is_default ? 1 : 0;
    this.is_active = data.is_active !== false ? 1 : 0;
  }
}