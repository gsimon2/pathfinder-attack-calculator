import React from 'react';
import {Attack, DamageDice} from './model/AttackModel';
import AttackRow from './AttackRow';
import styled from 'styled-components';
import AttackDetails from './AttackDetails';

const AttacksContainer = styled.div`
   display: flex;
   height: 100%;
   flex-direction: column;
   width: 100%;
`;

const getInitialState = (): IAttackGroupingState => {
   const bonuses = [28,28,23,23,18,18,13];
   const damageBonus: number = 13;
   const critThreshold: number = 19;
   const critMultiplier: number = 3;

   const damageDie: DamageDice = {
      numberOfDie: 1,
      DieSize: 8,
      DamageType: 'P',
      multipleOnCrit: true,
      applyOnlyOnCrit: false
   }
   const bonusDie: DamageDice = {
      numberOfDie: 1,
      DieSize: 6,
      DamageType: 'fire',
      multipleOnCrit: false,
      applyOnlyOnCrit: false
   }
   const bonusDie2: DamageDice = {
      numberOfDie: 2,
      DieSize: 6,
      DamageType: 'bleed',
      multipleOnCrit: false,
      applyOnlyOnCrit: true
   }

   return {
      bonuses: bonuses,
      damageBonus: damageBonus,
      critThreshold: critThreshold,
      critMultiplier: critMultiplier,
      damageDie: [damageDie, bonusDie, bonusDie2]
   } as IAttackGroupingState;
};

const AttackGrouping: React.FC<IAttackGroupingProps> = ({}) => {
   const items: JSX.Element[] = [];
   const [state, setState] = React.useState(getInitialState() as IAttackGroupingState);

   const updateState = (updatedValues: Partial<IAttackGroupingState>): void => {
      setState(prevState => Object.assign({}, prevState, updatedValues));
   };

   const getAttacks = (): Attack[] => {
      const {bonuses, damageBonus, critMultiplier, critThreshold, damageDie} = state;
      let attacks: Attack[] = [];
   
      bonuses.forEach(bonus => {
         attacks.push({attackBonus: bonus, damageBonus: damageBonus, damageDice: damageDie, critThreshold: critThreshold, critMultiplier: critMultiplier} as Attack)
      })
   
      return attacks;
   }


   getAttacks().forEach((attack: Attack, index: number) => {
      items.push(<AttackRow rowNumber={index+1} attack={attack} key={index}/>)
   });

   return (
      <AttacksContainer>
         <AttackDetails state={state} updateState={updateState}/>
         {items}
      </AttacksContainer>

   );
}

export default AttackGrouping;

export interface IAttackGroupingState {
   bonuses: number[];
   damageBonus: number;
   critThreshold: number;
   critMultiplier: number;
   damageDie: DamageDice[];
}

export interface IAttackGroupingProps {
}