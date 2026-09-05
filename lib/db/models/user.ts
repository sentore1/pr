/**
 * User Model
 * Handles user database operations
 */

import { BaseModel } from './base'
import type { User, UserCreate, UserUpdate } from '../types'
import bcrypt from 'bcryptjs'
import { config } from '@/lib/config'

export class UserModel extends BaseModel<User> {
  protected tableName = 'users'
  protected primaryKey = 'id'

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    return await this.findOne({ email })
  }

  /**
   * Create a new user with hashed password
   */
  async createUser(data: UserCreate): Promise<number> {
    // Password should already be hashed before calling this
    return await this.create(data as Partial<User>)
  }

  /**
   * Hash password
   */
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, config.security.bcryptRounds)
  }

  /**
   * Verify password
   */
  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }

  /**
   * Update user password
   */
  async updatePassword(userId: number, newPassword: string): Promise<number> {
    const hashedPassword = await this.hashPassword(newPassword)
    return await this.updateById(userId, {
      password_hash: hashedPassword,
    } as Partial<User>)
  }

  /**
   * Update last login timestamp
   */
  async updateLastLogin(userId: number): Promise<number> {
    return await this.updateById(userId, {
      last_login: new Date(),
    } as Partial<User>)
  }

  /**
   * Get active users
   */
  async getActiveUsers(): Promise<User[]> {
    return await this.findAll({ where: { is_active: true } })
  }

  /**
   * Get users by role
   */
  async getUsersByRole(role: 'admin' | 'editor' | 'viewer'): Promise<User[]> {
    return await this.findAll({ where: { role, is_active: true } })
  }

  /**
   * Deactivate user
   */
  async deactivateUser(userId: number): Promise<number> {
    return await this.updateById(userId, {
      is_active: false,
    } as Partial<User>)
  }

  /**
   * Activate user
   */
  async activateUser(userId: number): Promise<number> {
    return await this.updateById(userId, {
      is_active: true,
    } as Partial<User>)
  }
}

// Export singleton instance
export const userModel = new UserModel()
