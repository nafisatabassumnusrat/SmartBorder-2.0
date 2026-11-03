import { User, UserRole } from '../types';
import { storageEngine } from './storageEngine';

export class UserService {
  public async getCurrentUser(): Promise<User> {
    const activeId = storageEngine.getActiveUserId();
    const users = storageEngine.getUsers();
    const found = users.find((u) => u.id === activeId);
    return found || users[0];
  }

  public async setCurrentUser(userId: string): Promise<User> {
    const users = storageEngine.getUsers();
    const found = users.find((u) => u.id === userId);
    if (!found) {
      throw new Error(`Demo user not found: ${userId}`);
    }
    storageEngine.setActiveUserId(userId);
    return found;
  }

  public async getAllUsers(): Promise<User[]> {
    return storageEngine.getUsers();
  }

  public async updateUserStatus(userId: string, status: 'ACTIVE' | 'OFFLINE'): Promise<User> {
    const currentUser = await this.getCurrentUser();
    this.assertPermission(currentUser.role, 'MANAGE_USERS');

    const users = storageEngine.getUsers();
    const updated = users.map((u) => (u.id === userId ? { ...u, status } : u));
    storageEngine.saveUsers(updated);
    return updated.find((u) => u.id === userId)!;
  }

  public checkPermission(role: UserRole, action: string): boolean {
    if (role === 'Admin') return true;

    switch (action) {
      case 'VIEW':
      case 'EXPORT_REPORT':
        return true; // All roles can view and export reports

      case 'CREATE_OBSERVATION':
      case 'TRIGGER_AI_SCAN':
      case 'EDIT_MODEL_CONFIG':
        return role === 'Analyst';

      case 'TRIAGE_ALERT':
      case 'VERIFY_INCIDENT':
      case 'REJECT_INCIDENT':
      case 'REQUEST_INFO':
      case 'ADD_REVIEWER_NOTE':
        return role === 'Reviewer' || role === 'Analyst';

      case 'MANAGE_USERS':
      case 'EDIT_SETTINGS':
      case 'RESET_DEMO_DATA':
      case 'REGISTER_DEVICE':
        return false; // Admin only

      default:
        return false;
    }
  }

  public assertPermission(role: UserRole, action: string): void {
    if (!this.checkPermission(role, action)) {
      throw new Error(`Permission Denied: Role '${role}' is not authorized to perform action '${action}'.`);
    }
  }
}

export const userService = new UserService();
