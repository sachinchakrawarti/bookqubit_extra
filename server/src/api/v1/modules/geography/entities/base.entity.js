/**
 * Base Entity
 * Abstract base class for all entities
 */

export class BaseEntity {
  constructor(data = {}) {
    this.id = data.id || null;
    this.created_at = data.created_at || null;
    this.updated_at = data.updated_at || null;
    this.deleted_at = data.deleted_at || null;
  }

  /**
   * Check if entity is new (not saved)
   */
  isNew() {
    return this.id === null || this.id === undefined;
  }

  /**
   * Check if entity is deleted
   */
  isDeleted() {
    return this.deleted_at !== null;
  }

  /**
   * Get entity id
   */
  getId() {
    return this.id;
  }

  /**
   * Get created at timestamp
   */
  getCreatedAt() {
    return this.created_at;
  }

  /**
   * Get updated at timestamp
   */
  getUpdatedAt() {
    return this.updated_at;
  }

  /**
   * Convert to JSON
   */
  toJSON() {
    return {
      id: this.id,
      created_at: this.created_at,
      updated_at: this.updated_at,
      deleted_at: this.deleted_at
    };
  }
}

export default BaseEntity;