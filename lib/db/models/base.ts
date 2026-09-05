/**
 * Base Model Class
 * Provides common CRUD operations for all models
 */

import { query, queryOne, insert, update, deleteQuery } from '../connection'
import { createQueryBuilder, type OrderDirection } from '../query-builder'
import type { PaginatedResult } from '../types'

export abstract class BaseModel<T> {
  protected abstract tableName: string
  protected abstract primaryKey: string

  /**
   * Find all records
   */
  async findAll(options?: {
    where?: Record<string, any>
    orderBy?: { column: string; direction: OrderDirection }
    limit?: number
    offset?: number
  }): Promise<T[]> {
    const builder = createQueryBuilder().table(this.tableName)

    if (options?.where) {
      Object.entries(options.where).forEach(([key, value]) => {
        if (value === null) {
          builder.where(key, 'IS NULL')
        } else if (Array.isArray(value)) {
          builder.where(key, 'IN', value)
        } else {
          builder.where(key, '=', value)
        }
      })
    }

    if (options?.orderBy) {
      builder.orderBy(options.orderBy.column, options.orderBy.direction)
    }

    if (options?.limit) {
      builder.limit(options.limit)
    }

    if (options?.offset) {
      builder.offset(options.offset)
    }

    const { sql, params } = builder.buildSelect()
    return await query<T>(sql, params)
  }

  /**
   * Find a single record by ID
   */
  async findById(id: number | string): Promise<T | null> {
    const builder = createQueryBuilder()
      .table(this.tableName)
      .where(this.primaryKey, '=', id)
      .limit(1)

    const { sql, params } = builder.buildSelect()
    return await queryOne<T>(sql, params)
  }

  /**
   * Find a single record by criteria
   */
  async findOne(where: Record<string, any>): Promise<T | null> {
    const builder = createQueryBuilder().table(this.tableName).limit(1)

    Object.entries(where).forEach(([key, value]) => {
      if (value === null) {
        builder.where(key, 'IS NULL')
      } else {
        builder.where(key, '=', value)
      }
    })

    const { sql, params } = builder.buildSelect()
    return await queryOne<T>(sql, params)
  }

  /**
   * Create a new record
   */
  async create(data: Partial<T>): Promise<number> {
    const builder = createQueryBuilder().table(this.tableName)
    const { sql, params } = builder.buildInsert(data as Record<string, any>)
    return await insert(sql, params)
  }

  /**
   * Update a record by ID
   */
  async updateById(id: number | string, data: Partial<T>): Promise<number> {
    const builder = createQueryBuilder()
      .table(this.tableName)
      .where(this.primaryKey, '=', id)

    const { sql, params } = builder.buildUpdate(data as Record<string, any>)
    return await update(sql, params)
  }

  /**
   * Update records by criteria
   */
  async updateWhere(
    where: Record<string, any>,
    data: Partial<T>
  ): Promise<number> {
    const builder = createQueryBuilder().table(this.tableName)

    Object.entries(where).forEach(([key, value]) => {
      builder.where(key, '=', value)
    })

    const { sql, params } = builder.buildUpdate(data as Record<string, any>)
    return await update(sql, params)
  }

  /**
   * Delete a record by ID
   */
  async deleteById(id: number | string): Promise<number> {
    const builder = createQueryBuilder()
      .table(this.tableName)
      .where(this.primaryKey, '=', id)

    const { sql, params } = builder.buildDelete()
    return await deleteQuery(sql, params)
  }

  /**
   * Delete records by criteria
   */
  async deleteWhere(where: Record<string, any>): Promise<number> {
    const builder = createQueryBuilder().table(this.tableName)

    Object.entries(where).forEach(([key, value]) => {
      builder.where(key, '=', value)
    })

    const { sql, params } = builder.buildDelete()
    return await deleteQuery(sql, params)
  }

  /**
   * Count records
   */
  async count(where?: Record<string, any>): Promise<number> {
    const builder = createQueryBuilder().table(this.tableName)

    if (where) {
      Object.entries(where).forEach(([key, value]) => {
        if (value === null) {
          builder.where(key, 'IS NULL')
        } else {
          builder.where(key, '=', value)
        }
      })
    }

    const { sql, params } = builder.buildCount()
    const result = await queryOne<{ count: number }>(sql, params)
    return result?.count || 0
  }

  /**
   * Check if a record exists
   */
  async exists(where: Record<string, any>): Promise<boolean> {
    const count = await this.count(where)
    return count > 0
  }

  /**
   * Get paginated results
   */
  async paginate(options: {
    page?: number
    per_page?: number
    where?: Record<string, any>
    orderBy?: { column: string; direction: OrderDirection }
  }): Promise<PaginatedResult<T>> {
    const page = options.page || 1
    const per_page = options.per_page || 20
    const offset = (page - 1) * per_page

    const [data, total] = await Promise.all([
      this.findAll({
        where: options.where,
        orderBy: options.orderBy,
        limit: per_page,
        offset,
      }),
      this.count(options.where),
    ])

    const total_pages = Math.ceil(total / per_page)

    return {
      data,
      total,
      page,
      per_page,
      total_pages,
      has_next: page < total_pages,
      has_prev: page > 1,
    }
  }

  /**
   * Execute raw SQL query
   */
  async raw<R = any>(sql: string, params?: any[]): Promise<R[]> {
    return await query<R>(sql, params)
  }

  /**
   * Execute raw SQL and return single result
   */
  async rawOne<R = any>(sql: string, params?: any[]): Promise<R | null> {
    return await queryOne<R>(sql, params)
  }
}
