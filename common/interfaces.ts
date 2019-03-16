export type DeviceType = 'workstation' | 'server' | 'mobile';
export type DeviceStatus = 'active' | 'inactive';

export interface IBaseDevice {
    name: string;
}

export interface IDevice extends IBaseDevice {
    ipAddress: string;
    type: DeviceType;
    status: DeviceStatus;
    events?: IEventLogEntry[];
}

export type GetDevicesResponse = IBaseDevice[];
export type AddDeviceResponse = IDevice;

export interface INewDeviceParams {
    name: string;
    ip: string;
}

export type EventLogEntryType = 'security' | 'log';
export type EventLogEntrySeverity = 'high' | 'medium' | 'low';

export interface IEventLogEntry {
    type: EventLogEntryType;
    description: string;
    severity: EventLogEntrySeverity;
}
