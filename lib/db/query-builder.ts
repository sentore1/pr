/**
 * SQL Query Builder
 * Provides a fluent interface for building SQL queries
 */

export type WhereOperator = '=' | '!=' | '>' | '<' | '>=' | '<=' | 'LIKE' | 'IN' | 'NOT IN' | 'IS NULL' | 'IS NOT NULL'
export type OrderDirection = 'ASC' | 'DESC'

export interface WhereClause {
  column: string
  operator: WhereOperator
  value?: any
}

export interface JoinClause {
  type: 'INNER' | 'LEFT' | 'RIGHT'
  table: string
  on: string
}

export class QueryBuilder {
  private selectColumns: string[] = ['*']
  private tableName: string = ''
  private whereClauses: WhereClause[] = []
  private joinClauses: JoinClause[] = []
  private orderByColumns: { column: string; direction: OrderDirection }[] = []
  private limitValue?: number
  private offsetValue?: number
  private groupByColumns: string[] = []

  /**
   * Set the table to query
   */
  table(name: string): this {
    this.tableName = name
    return this
  }

  /**
   * Set columns to select
   */
  select(...columns: string[]): this {
    this.selectColumns = columns
    return this
  }

  /**
   * Add a WHERE clause
   */
  where(column: string, operator: WhereOperator, value?: any): this {
    this.whereClauses.push({ column, operator, value })
    return this
  }

  /**
   * Add an AND WHERE clause (alias for where)
   */
  andWhere(column: string, operator: WhereOperator, value?: any): this {
    return this.where(column, operator, value)
  }

  /**
   * Add a JOIN clause
   */
  join(type: 'INNER' | 'LEFT' | 'RIGHT', table: string, on: string): this {
    this.joinClauses.push({ type, table, on })
    return this
  }

  /**
   * Add an INNER JOIN
   */
  innerJoin(table: string, on: string): this {
    return this.join('INNER', table, on)
  }

  /**
   * Add a LEFT JOIN
   */
  leftJoin(table: string, on: string): this {
    return this.join('LEFT', table, on)
  }

  /**
   * Add an ORDER BY clause
   */
  orderBy(column: string, direction: OrderDirection = 'ASC'): this {
    this.orderByColumns.push({ column, direction })
    return this
  }

  /**
   * Set LIMIT
   */
  limit(value: number): this {
    this.limitValue = value
    return this
  }

  /**
   * Set OFFSET
   */
  offset(value: number): this {
    this.offsetValue = value
    return this
  }

  /**
   * Add GROUP BY clause
   */
  groupBy(...columns: string[]): this {
    this.groupByColumns.push(...columns)
    return this
  }

  /**
   * Build the SELECT query
   */
  buildSelect(): { sql: string; params: any[] } {
    const params: any[] = []
    let sql = `SELECT ${this.selectColumns.join(', ')} FROM ${this.tableName}`

    // Add JOINs
    if (this.joinClauses.length > 0) {
      for (const join of this.joinClauses) {
        sql += ` ${join.type} JOIN ${join.table} ON ${join.on}`
      }
    }

    // Add WHERE clauses
    if (this.whereClauses.length > 0) {
      const conditions = this.whereClauses.map((clause) => {
        if (clause.operator === 'IS NULL' || clause.operator === 'IS NOT NULL') {
          return `${clause.column} ${clause.operator}`
        }
        if (clause.operator === 'IN' || clause.operator === 'NOT IN') {
          const placeholders = clause.value.map(() => '?').join(', ')
          params.push(...clause.value)
          return `${clause.column} ${clause.operator} (${placeholders})`
        }
        params.push(clause.value)
        return `${clause.column} ${clause.operator} ?`
      })
      sql += ` WHERE ${conditions.join(' AND ')}`
    }

    // Add GROUP BY
    if (this.groupByColumns.length > 0) {
      sql += ` GROUP BY ${this.groupByColumns.join(', ')}`
    }

    // Add ORDER BY
    if (this.orderByColumns.length > 0) {
      const orders = this.orderByColumns.map(
        (o) => `${o.column} ${o.direction}`
      )
      sql += ` ORDER BY ${orders.join(', ')}`
    }

    // Add LIMIT and OFFSET
    if (this.limitValue !== undefined) {
      sql += ` LIMIT ?`
      params.push(this.limitValue)
    }
    if (this.offsetValue !== undefined) {
      sql += ` OFFSET ?`
      params.push(this.offsetValue)
    }

    return { sql, params }
  }

  /**
   * Build an INSERT query
   */
  buildInsert(data: Record<string, any>): { sql: string; params: any[] } {
    const columns = Object.keys(data)
    const values = Object.values(data)
    const placeholders = columns.map(() => '?').join(', ')

    const sql = `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (${placeholders})`
    return { sql, params: values }
  }

  /**
   * Build an UPDATE query
   */
  buildUpdate(data: Record<string, any>): { sql: string; params: any[] } {
    const columns = Object.keys(data)
    const values = Object.values(data)
    const params: any[] = [...values]

    const sets = columns.map((col) => `${col} = ?`).join(', ')
    let sql = `UPDATE ${this.tableName} SET ${sets}`

    // Add WHERE clauses
    if (this.whereClauses.length > 0) {
      const conditions = this.whereClauses.map((clause) => {
        if (clause.operator === 'IS NULL' || clause.operator === 'IS NOT NULL') {
          return `${clause.column} ${clause.operator}`
        }
        params.push(clause.value)
        return `${clause.column} ${clause.operator} ?`
      })
      sql += ` WHERE ${conditions.join(' AND ')}`
    }

    return { sql, params }
  }

  /**
   * Build a DELETE query
   */
  buildDelete(): { sql: string; params: any[] } {
    const params: any[] = []
    let sql = `DELETE FROM ${this.tableName}`

    // Add WHERE clauses
    if (this.whereClauses.length > 0) {
      const conditions = this.whereClauses.map((clause) => {
        if (clause.operator === 'IS NULL' || clause.operator === 'IS NOT NULL') {
          return `${clause.column} ${clause.operator}`
        }
        params.push(clause.value)
        return `${clause.column} ${clause.operator} ?`
      })
      sql += ` WHERE ${conditions.join(' AND ')}`
    }

    return { sql, params }
  }

  /**
   * Build a COUNT query
   */
  buildCount(): { sql: string; params: any[] } {
    const params: any[] = []
    let sql = `SELECT COUNT(*) as count FROM ${this.tableName}`

    // Add WHERE clauses
    if (this.whereClauses.length > 0) {
      const conditions = this.whereClauses.map((clause) => {
        if (clause.operator === 'IS NULL' || clause.operator === 'IS NOT NULL') {
          return `${clause.column} ${clause.operator}`
        }
        params.push(clause.value)
        return `${clause.column} ${clause.operator} ?`
      })
      sql += ` WHERE ${conditions.join(' AND ')}`
    }

    return { sql, params }
  }
}

/**
 * Create a new query builder instance
 */
export function createQueryBuilder(): QueryBuilder {
  return new QueryBuilder()
}
