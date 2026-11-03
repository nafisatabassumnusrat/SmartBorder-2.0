import { AppSettings } from '../types';
import { storageEngine } from './storageEngine';
import { userService } from './userService';
import { auditService } from './auditService';

export class SettingsService {
  public async getSettings(): Promise<AppSettings> {
    return storageEngine.getSettings();
  }

  public async updateSettings(updates: Partial<AppSettings>): Promise<AppSettings> {
    const user = await userService.getCurrentUser();
    userService.assertPermission(user.role, 'EDIT_SETTINGS');

    const current = storageEngine.getSettings();
    const updated = { ...current, ...updates };
    storageEngine.saveSettings(updated);

    await auditService.recordAction({
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: 'SETTINGS_UPDATED',
      entityType: 'SETTINGS',
      entityId: 'global',
      details: `Updated platform settings: ${Object.keys(updates).join(', ')}`
    });

    return updated;
  }

  public async resetDemoData(): Promise<void> {
    const user = await userService.getCurrentUser();
    userService.assertPermission(user.role, 'RESET_DEMO_DATA');

    storageEngine.resetToFactory();

    await auditService.recordAction({
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: 'RESET_DEMO_DATA',
      entityType: 'SYSTEM',
      entityId: 'factory-reset',
      details: 'Restored all database seeds and configurations to factory demo state'
    });
  }
}

export const settingsService = new SettingsService();
