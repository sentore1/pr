/**
 * MySQL Database Connection Pool
 * Manages database connections with automatic pooling
 */

// Load .env.local for scripts running outside Next.js (e.g. tsx scripts/)
import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'
dotenvConfig({ path: resolve(process.cwd(), '.env.local') })

import mysql from 'mysql2/promise'
import { config } from '@/lib/config'

let pool: mysql.Pool | null = null

/**
 * Get or create MySQL connection pool
 */
export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: config.database.host,
      port: config.database.port,
      user: config.database.user,
      password: config.database.password,
      database: config.database.name,
      connectionLimit: config.database.connectionLimit,
      queueLimit: config.database.queueLimit,
      waitForConnections: true,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
      timezone: '+00:00',
      dateStrings: false,
      multipleStatements: false,
      namedPlaceholders: true,
    })

    // Handle pool-level errors gracefully (mysql2 typings only expose 'enqueue')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(pool as any).on('error', (err: any) => {
      console.error('MySQL pool error:', err)
      if (err?.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection lost. Reconnecting...')
        pool = null
      }
    })

    console.log('✓ MySQL connection pool created')
  }

  return pool
}

/**
 * Get a connection from the pool
 */
export async function getConnection(): Promise<mysql.PoolConnection> {
  const pool = getPool()
  return await pool.getConnection()
}

/**
 * Execute a query with automatic connection handling
 */
export async function query<T = any>(
  sql: string,
  params?: any[]
): Promise<T[]> {
  const pool = getPool()
  const [rows] = await pool.execute(sql, params)
  return rows as T[]
}

/**
 * Execute a single query and return first result
 */
export async function queryOne<T = any>(
  sql: string,
  params?: any[]
): Promise<T | null> {
  const results = await query<T>(sql, params)
  return results.length > 0 ? results[0] : null
}

/**
 * Execute an insert query and return the inserted ID
 */
export async function insert(
  sql: string,
  params?: any[]
): Promise<number> {
  const pool = getPool()
  const [result] = await pool.execute(sql, params)
  return (result as mysql.ResultSetHeader).insertId
}

/**
 * Execute an update query and return affected rows
 */
export async function update(
  sql: string,
  params?: any[]
): Promise<number> {
  const pool = getPool()
  const [result] = await pool.execute(sql, params)
  return (result as mysql.ResultSetHeader).affectedRows
}

/**
 * Execute a delete query and return affected rows
 */
export async function deleteQuery(
  sql: string,
  params?: any[]
): Promise<number> {
  const pool = getPool()
  const [result] = await pool.execute(sql, params)
  return (result as mysql.ResultSetHeader).affectedRows
}

/**
 * Execute multiple queries in a transaction
 */
export async function transaction<T>(
  callback: (connection: mysql.PoolConnection) => Promise<T>
): Promise<T> {
  const connection = await getConnection()
  
  try {
    await connection.beginTransaction()
    const result = await callback(connection)
    await connection.commit()
    return result
  } catch (error) {
    await connection.rollback()
    throw error
  } finally {
    connection.release()
  }
}

/**
 * Test database connection
 */
export async function testConnection(): Promise<boolean> {
  try {
    const pool = getPool()
    await pool.query('SELECT 1')
    console.log('✓ Database connection successful')
    return true
  } catch (error) {
    console.error('✗ Database connection failed:', error)
    return false
  }
}

/**
 * Close all connections in the pool
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end()
    pool = null
    console.log('✓ MySQL connection pool closed')
  }
}

/**
 * Get pool statistics
 */
export function getPoolStats() {
  if (!pool) {
    return null
  }

  return {
    totalConnections: (pool as any)._allConnections?.length || 0,
    freeConnections: (pool as any)._freeConnections?.length || 0,
    queuedRequests: (pool as any)._connectionQueue?.length || 0,
  }
}
