/**
 * Database Models Index
 * Exports all model instances for easy import
 */

export { BaseModel } from './base'
export { UserModel, userModel } from './user'

// Import and export other models as needed
import { BaseModel } from './base'
import type {
  Page,
  ContentBlock,
  NavigationMenu,
  NavigationItem,
  Logo,
  FooterSection,
  FooterLink,
  MediaLibrary,
  ThemeSetting,
  StyleSetting,
  PageView,
  UserSession,
  SEOSetting,
  ActivityLog,
  SystemSetting,
} from '../types'

// Page Model
export class PageModel extends BaseModel<Page> {
  protected tableName = 'pages'
  protected primaryKey = 'id'

  async findBySlug(slug: string): Promise<Page | null> {
    return await this.findOne({ slug })
  }

  async getPublishedPages(): Promise<Page[]> {
    return await this.findAll({
      where: { is_published: true },
      orderBy: { column: 'created_at', direction: 'DESC' },
    })
  }

  async publishPage(pageId: number): Promise<number> {
    return await this.updateById(pageId, {
      is_published: true,
      publish_date: new Date(),
    } as Partial<Page>)
  }

  async unpublishPage(pageId: number): Promise<number> {
    return await this.updateById(pageId, {
      is_published: false,
    } as Partial<Page>)
  }
}

// Content Block Model
export class ContentBlockModel extends BaseModel<ContentBlock> {
  protected tableName = 'content_blocks'
  protected primaryKey = 'id'

  async getBlocksByPage(pageId: number): Promise<ContentBlock[]> {
    return await this.findAll({
      where: { page_id: pageId, is_active: true },
      orderBy: { column: 'sort_order', direction: 'ASC' },
    })
  }

  async reorderBlocks(pageId: number, blockIds: number[]): Promise<void> {
    for (let i = 0; i < blockIds.length; i++) {
      await this.updateById(blockIds[i], {
        sort_order: i,
      } as Partial<ContentBlock>)
    }
  }
}

// Navigation Model
export class NavigationMenuModel extends BaseModel<NavigationMenu> {
  protected tableName = 'navigation_menus'
  protected primaryKey = 'id'

  async getByPosition(
    position: 'header' | 'footer' | 'sidebar'
  ): Promise<NavigationMenu | null> {
    return await this.findOne({ position, is_active: true })
  }
}

export class NavigationItemModel extends BaseModel<NavigationItem> {
  protected tableName = 'navigation_items'
  protected primaryKey = 'id'

  async getItemsByMenu(menuId: number): Promise<NavigationItem[]> {
    return await this.findAll({
      where: { menu_id: menuId, is_active: true },
      orderBy: { column: 'sort_order', direction: 'ASC' },
    })
  }

  async getTopLevelItems(menuId: number): Promise<NavigationItem[]> {
    return await this.raw<NavigationItem>(
      'SELECT * FROM navigation_items WHERE menu_id = ? AND parent_id IS NULL AND is_active = TRUE ORDER BY sort_order ASC',
      [menuId]
    )
  }

  async getChildItems(parentId: number): Promise<NavigationItem[]> {
    return await this.findAll({
      where: { parent_id: parentId, is_active: true },
      orderBy: { column: 'sort_order', direction: 'ASC' },
    })
  }
}

// Logo Model
export class LogoModel extends BaseModel<Logo> {
  protected tableName = 'logos'
  protected primaryKey = 'id'

  async getActiveLogos(): Promise<Logo[]> {
    return await this.findAll({ where: { is_active: true } })
  }

  async getLogoByPosition(
    position: 'header' | 'footer' | 'mobile'
  ): Promise<Logo | null> {
    return await this.findOne({ position, is_active: true })
  }
}

// Footer Models
export class FooterSectionModel extends BaseModel<FooterSection> {
  protected tableName = 'footer_sections'
  protected primaryKey = 'id'

  async getActiveSections(): Promise<FooterSection[]> {
    return await this.findAll({
      where: { is_active: true },
      orderBy: { column: 'sort_order', direction: 'ASC' },
    })
  }
}

export class FooterLinkModel extends BaseModel<FooterLink> {
  protected tableName = 'footer_links'
  protected primaryKey = 'id'

  async getLinksBySection(sectionId: number): Promise<FooterLink[]> {
    return await this.findAll({
      where: { section_id: sectionId, is_active: true },
      orderBy: { column: 'sort_order', direction: 'ASC' },
    })
  }
}

// Media Library Model
export class MediaLibraryModel extends BaseModel<MediaLibrary> {
  protected tableName = 'media_library'
  protected primaryKey = 'id'

  async getByFolder(folder: string): Promise<MediaLibrary[]> {
    return await this.findAll({
      where: { folder },
      orderBy: { column: 'created_at', direction: 'DESC' },
    })
  }

  async searchMedia(query: string): Promise<MediaLibrary[]> {
    return await this.raw<MediaLibrary>(
      `SELECT * FROM media_library 
       WHERE title LIKE ? OR alt_text LIKE ? OR original_filename LIKE ? 
       ORDER BY created_at DESC`,
      [`%${query}%`, `%${query}%`, `%${query}%`]
    )
  }
}

// Theme Settings Model
export class ThemeSettingModel extends BaseModel<ThemeSetting> {
  protected tableName = 'theme_settings'
  protected primaryKey = 'id'

  async getActiveTheme(): Promise<ThemeSetting | null> {
    return await this.findOne({ is_active: true })
  }

  async activateTheme(themeId: number): Promise<void> {
    // Deactivate all themes
    await this.updateWhere({ is_active: true }, { is_active: false } as Partial<ThemeSetting>)
    // Activate selected theme
    await this.updateById(themeId, { is_active: true } as Partial<ThemeSetting>)
  }
}

// Style Settings Model
export class StyleSettingModel extends BaseModel<StyleSetting> {
  protected tableName = 'style_settings'
  protected primaryKey = 'id'

  async getStylesByCategory(category: string): Promise<StyleSetting[]> {
    return await this.findAll({ where: { category } })
  }

  async updateStyle(
    category: string,
    property: string,
    value: string
  ): Promise<number> {
    const existing = await this.findOne({ category, property })
    if (existing) {
      return await this.updateWhere(
        { category, property },
        { value } as Partial<StyleSetting>
      )
    } else {
      return await this.create({ category, property, value } as Partial<StyleSetting>)
    }
  }
}

// Analytics Models
export class PageViewModel extends BaseModel<PageView> {
  protected tableName = 'page_views'
  protected primaryKey = 'id'

  async trackPageView(data: Partial<PageView>): Promise<number> {
    return await this.create(data)
  }

  async getViewsByPage(pageSlug: string, days: number = 30): Promise<PageView[]> {
    return await this.raw<PageView>(
      `SELECT * FROM page_views 
       WHERE page_slug = ? AND viewed_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
       ORDER BY viewed_at DESC`,
      [pageSlug, days]
    )
  }

  async getViewsCount(pageSlug: string, days: number = 30): Promise<number> {
    const result = await this.rawOne<{ count: number }>(
      `SELECT COUNT(*) as count FROM page_views 
       WHERE page_slug = ? AND viewed_at >= DATE_SUB(NOW(), INTERVAL ? DAY)`,
      [pageSlug, days]
    )
    return result?.count || 0
  }
}

export class UserSessionModel extends BaseModel<UserSession> {
  protected tableName = 'user_sessions'
  protected primaryKey = 'id'

  async findBySessionId(sessionId: string): Promise<UserSession | null> {
    return await this.findOne({ session_id: sessionId })
  }

  async updateSession(
    sessionId: string,
    data: Partial<UserSession>
  ): Promise<number> {
    return await this.updateWhere({ session_id: sessionId }, data)
  }
}

// SEO Settings Model
export class SEOSettingModel extends BaseModel<SEOSetting> {
  protected tableName = 'seo_settings'
  protected primaryKey = 'id'

  async getByPageId(pageId: number): Promise<SEOSetting | null> {
    return await this.findOne({ page_id: pageId })
  }

  async getGlobalSEO(): Promise<SEOSetting | null> {
    return await this.rawOne<SEOSetting>(
      'SELECT * FROM seo_settings WHERE page_id IS NULL LIMIT 1'
    )
  }
}

// Activity Log Model
export class ActivityLogModel extends BaseModel<ActivityLog> {
  protected tableName = 'activity_logs'
  protected primaryKey = 'id'

  async logActivity(data: Partial<ActivityLog>): Promise<number> {
    return await this.create(data)
  }

  async getRecentActivity(limit: number = 50): Promise<ActivityLog[]> {
    return await this.findAll({
      orderBy: { column: 'created_at', direction: 'DESC' },
      limit,
    })
  }

  async getUserActivity(userId: number, limit: number = 50): Promise<ActivityLog[]> {
    return await this.findAll({
      where: { user_id: userId },
      orderBy: { column: 'created_at', direction: 'DESC' },
      limit,
    })
  }
}

// System Settings Model
export class SystemSettingModel extends BaseModel<SystemSetting> {
  protected tableName = 'system_settings'
  protected primaryKey = 'id'

  async getSetting(key: string): Promise<SystemSetting | null> {
    return await this.findOne({ setting_key: key })
  }

  async getPublicSettings(): Promise<SystemSetting[]> {
    return await this.findAll({ where: { is_public: true } })
  }

  async updateSetting(key: string, value: string): Promise<number> {
    const existing = await this.getSetting(key)
    if (existing) {
      return await this.updateWhere(
        { setting_key: key },
        { setting_value: value } as Partial<SystemSetting>
      )
    } else {
      return await this.create({
        setting_key: key,
        setting_value: value,
      } as Partial<SystemSetting>)
    }
  }
}

// Export singleton instances
export const pageModel = new PageModel()
export const contentBlockModel = new ContentBlockModel()
export const navigationMenuModel = new NavigationMenuModel()
export const navigationItemModel = new NavigationItemModel()
export const logoModel = new LogoModel()
export const footerSectionModel = new FooterSectionModel()
export const footerLinkModel = new FooterLinkModel()
export const mediaLibraryModel = new MediaLibraryModel()
export const themeSettingModel = new ThemeSettingModel()
export const styleSettingModel = new StyleSettingModel()
export const pageViewModel = new PageViewModel()
export const userSessionModel = new UserSessionModel()
export const seoSettingModel = new SEOSettingModel()
export const activityLogModel = new ActivityLogModel()
export const systemSettingModel = new SystemSettingModel()
