export interface ApplianceConsumption {
    id: number;
    applianceId: number;
    startDate: Date;
    endDate: Date;
    consumptionWh: number;
}