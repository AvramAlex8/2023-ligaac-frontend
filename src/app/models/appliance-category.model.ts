export interface ApplianceCategory {
  id: number;
  name: string;
  minConsumptionWh: number;
  maxConsumptionWh: number;
  iconName?: string;
  consumptionTip?: string;
}