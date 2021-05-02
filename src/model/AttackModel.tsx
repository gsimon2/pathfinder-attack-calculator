export interface DamageDice {
   numberOfDie: number;
   DieSize: number;
   DamageType?: string;
   multipleOnCrit?: boolean;
   applyOnlyOnCrit?: boolean;
}

export interface Attack {
   attackBonus: number;
   damageBonus: number;
   damageDice: DamageDice[];
   critThreshold: number;
   critMultiplier: number;
}