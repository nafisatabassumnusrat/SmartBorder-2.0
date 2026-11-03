import { Device, DeviceStatus, DeviceType } from '../types';
import { storageEngine } from './storageEngine';
import { userService } from './userService';
import { auditService } from './auditService';

export interface DeviceFilter {
  type?: DeviceType;
  status?: DeviceStatus;
  sector?: string;
  query?: string;
}

export class DeviceService {
  public async getDevices(filter?: DeviceFilter): Promise<Device[]> {
    let devices = storageEngine.getDevices();

    if (filter) {
      if (filter.type) {
        devices = devices.filter((d) => d.type === filter.type);
      }
      if (filter.status) {
        devices = devices.filter((d) => d.status === filter.status);
      }
      if (filter.sector) {
        devices = devices.filter((d) => d.assignedSector.toLowerCase().includes(filter.sector!.toLowerCase()));
      }
      if (filter.query) {
        const q = filter.query.toLowerCase();
        devices = devices.filter((d) =>
          d.callsign.toLowerCase().includes(q) ||
          d.model.toLowerCase().includes(q) ||
          d.assignedSector.toLowerCase().includes(q)
        );
      }
    }

    return devices;
  }

  public async getDeviceById(id: string): Promise<Device | null> {
    const devices = storageEngine.getDevices();
    return devices.find((d) => d.id === id) || null;
  }

  public async updateDeviceStatus(id: string, newStatus: DeviceStatus): Promise<Device> {
    const user = await userService.getCurrentUser();
    userService.assertPermission(user.role, 'REGISTER_DEVICE');

    const devices = storageEngine.getDevices();
    const index = devices.findIndex((d) => d.id === id);
    if (index === -1) throw new Error(`Device not found: ${id}`);

    const updated = { ...devices[index], status: newStatus };
    devices[index] = updated;
    storageEngine.saveDevices(devices);

    await auditService.recordAction({
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: 'DEVICE_STATUS_CHANGED',
      entityType: 'DEVICE',
      entityId: id,
      details: `Updated device ${updated.callsign} status to ${newStatus}`
    });

    return updated;
  }

  public async runDiagnostics(id: string): Promise<{ success: boolean; report: string }> {
    const device = await this.getDeviceById(id);
    if (!device) throw new Error(`Device not found: ${id}`);

    const user = await userService.getCurrentUser();

    await auditService.recordAction({
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: 'DEVICE_DIAGNOSTIC_RUN',
      entityType: 'DEVICE',
      entityId: id,
      details: `Executed synthetic diagnostic BIT (Built-In-Test) on ${device.callsign}`
    });

    return {
      success: true,
      report: `Synthetic BIT Passed for ${device.callsign}. Optical alignment: OK. Thermal sensor calibration: Valid until ${device.calibrationExpires.slice(0, 10)}. Battery state of health: 98%. Telemetry link latency: 22ms.`
    };
  }
}

export const deviceService = new DeviceService();
