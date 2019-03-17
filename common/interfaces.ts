export interface IBaseDevice {
    name: string;
    ipAddress: string;
}

// Type guards for the IDevice interface
export type DeviceType = 'workstation' | 'server' | 'mobile';
export type DeviceStatus = 'active' | 'inactive';
export interface IDevice extends IBaseDevice {
    ipAddress: string;
    type: DeviceType;
    status: DeviceStatus;
    events?: IEventLogEntry[];
}

// Declaring types for the responses make it easier to maintain.
export type GetDevicesResponse = IBaseDevice[];
export type AddDeviceResponse = IDevice;

// Type guards for the IEventLogEntry interface
export type EventLogEntryType = 'security' | 'log';
export type EventLogEntrySeverity = 'high' | 'medium' | 'low';
export interface IEventLogEntry {
    type: EventLogEntryType;
    description: string;
    severity: EventLogEntrySeverity;
}
