import {
    AddDeviceResponse, DeviceType, GetDevicesResponse, IDevice, IEventLogEntry,
    INewDeviceParams
} from "../common/interfaces";
import {DeviceStatuses, DeviceTypes, EventLogEntrySeverities, EventLogEntryTypes} from "../common/consts";

const DeviceBrandsByType = {
    [DeviceTypes.mobile]: {
        Samsung: 0,
        HTC: 0,
        Apple: 0,
        LG: 0,
    },
    [DeviceTypes.server]: {
        HP: 0,
        Dell: 0,
        IBM: 0,
        Cisco: 0,
        Lenovo: 0,
    },
    [DeviceTypes.workstation]: {
        HP: 0,
        Dell: 0,
        Lenovo: 0,
        Apple: 0,
        Samsung: 0,
        Asus: 0,
    }
};

const descriptions = [
    'something bad happend',
    'user had logged in',
    'user\'s password is weak',
    'user had logged out',
    'application had crashed for unknown reason',
];

export class Devices {
    private devices: IDevice[] = this.devicesGenerator();

    constructor() { }

    public getDevices(): GetDevicesResponse {
        if (!this.devices) {
            this.devices = this.devicesGenerator();
        }

        return this.devices;
    }

    public addDevice(params: INewDeviceParams): AddDeviceResponse {
        const newDevice = this.generateDevice(params);
        this.devices.unshift(newDevice);

        return newDevice;
    }

    private devicesGenerator(count: number = 10): IDevice[] {
        const devices = [];

        for (let i = 0; i < count; i++) {
            devices.push(this.generateDevice());
        }

        return devices;
    }

    private generateDevice(params?: INewDeviceParams): IDevice {
        params = params || {} as INewDeviceParams;

        const deviceType = this.getRandomValue(DeviceTypes);

        const newDevice: IDevice = {
            name: params.name || this.generateName(deviceType),
            ipAddress: params.ip || this.generateIP(),
            type: deviceType,
            status: this.getRandomValue(DeviceStatuses),
            events: this.generateEvents(),
        };

        return newDevice;
    }

    private generateIP(): string {
        const ip = [];
        for (let i = 0; i < 4; i++) {
            ip.push(Math.floor(127 * Math.random()));
        }
        return ip.join('.');
    }

    private generateName(ofType: DeviceType) {
        const deviceBrands = DeviceBrandsByType[ofType];
        const deviceBrand = this.getRandomValue(deviceBrands, true);
        const deviceBrandCounter = ++deviceBrands[deviceBrand];

        const devicePostfix =
            ofType === DeviceTypes.mobile && 'device' ||
            ofType === DeviceTypes.server && 'machine' || '';
        const deviceDescription = [ofType, devicePostfix].join(' ');
        const name = `${deviceBrand} ${deviceDescription} #${deviceBrandCounter}`;

        return name;
    }


    generateEvents(tail: number = 5): IEventLogEntry[] {
        const events = [];

        for (let i = 0; i < tail; i++) {
            events.push(this.generateEvent());
        }

        return events;
    }

    private generateEvent(): IEventLogEntry {

        const severity = this.getRandomValue(EventLogEntrySeverities);
        const type = this.getRandomValue(EventLogEntryTypes);
        const description = this.getRandomValue(descriptions);

        const event = {
            type,
            severity,
            description,
        };

        return event;
    }

    private getRandomValue(ofObject: object, returnKey: boolean = false) {
        const objectKeys = Object.keys(ofObject);
        const randomKeyIndex = Math.floor(objectKeys.length * Math.random());

        const randomKey = objectKeys[randomKeyIndex];
        if (returnKey) {
            return randomKey;
        }

        const randomValue = ofObject[randomKey];
        return randomValue;
    }
}