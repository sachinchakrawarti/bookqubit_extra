// src/api/v1/modules/languages/dto/update-language.dto.js

export default class UpdateLanguageDto {
  constructor(data = {}) {
    if (data.language_name !== undefined) {
      this.language_name = String(data.language_name).trim();
    }

    if (data.english_name !== undefined) {
      this.english_name = String(data.english_name).trim();
    }

    if (data.native_name !== undefined) {
      this.native_name = String(data.native_name).trim();
    }

    if (data.locale_code !== undefined) {
      this.locale_code = data.locale_code
        ? String(data.locale_code).trim()
        : null;
    }

    if (data.default_script_id !== undefined) {
      this.default_script_id = data.default_script_id ?? null;
    }

    if (data.direction !== undefined) {
      this.direction = String(data.direction).trim().toUpperCase();
    }

    if (data.is_default !== undefined) {
      this.is_default = data.is_default ? 1 : 0;
    }

    if (data.is_active !== undefined) {
      this.is_active = data.is_active ? 1 : 0;
    }
  }
}