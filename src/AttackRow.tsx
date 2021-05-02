import React from 'react';

import styled from 'styled-components';
import { DamageDice, Attack } from './model/AttackModel';

const AttackContainer = styled.div`
   display: flex;
   flex-direction: row;
   width: 100%;
   padding: 1rem 3rem;
   box-sizing: border-box;
   margin: 0 auto;
   max-width: 50rem;
`;

const StyledInput = styled.input`
   text-align: center;
   margin: 0.25rem 1rem;
`;

const AttackBonusInput = styled(StyledInput)`
   width: 8rem;
`;

const DamageDiceInput = styled(StyledInput)`
   font-size: x-small;
   width: 18rem;
`;

const ToHitInput = styled(StyledInput)<{rollResult: number, critThreshold: number}>`
   width: 8rem;
   background: ${props => (props.rollResult >= props.critThreshold && 'lightgreen')};
   background: ${props => (props.rollResult === 1 && 'lightpink')};
`;

const RolledDamageInput = styled(StyledInput)`
   font-size: x-small;
   width: 18rem;
`;

const RollButton = styled.button`
   width: 3.5rem;
   margin: 0 0.75rem;
`;

const ClearButton = styled.button`
   width: 3.5rem;
   margin: 0 0.75rem;
`;

const TextSpan = styled.span`
   font-size: small;
   align-self: center;
`;

const AttackNumberText = styled(TextSpan)`
   align-self: center;
`;

const ColumnContainer = styled.div`
   display: flex;
`;

const InputContainer = styled.div`
   display: flex;
   flex-direction: column;
`;


const RollSucka = (diceSides: number): number => {
   return Math.floor(Math.random() * diceSides + 1); 
}

const AttackRow: React.FC<IAttackRowProps> = ({attack, rowNumber}) => {
   let inputRef: React.RefObject<HTMLInputElement> = React.createRef();
   const [state, setState] = React.useState({
      toHitRollResult: 0,
      damageDiceResults: []
   } as IAttackRowState);

   const updateState = (updatedValues: Partial<IAttackRowState>): void => {
      setState(prevState => Object.assign({}, prevState, updatedValues));
   };

   const handleRollClick = (): void => {
      const toHitRoll = RollSucka(20);
      updateState({toHitRollResult: toHitRoll});
      rollDamage(toHitRoll >= attack.critThreshold);
   };

   const handleClearClick = (): void => {
      updateState({toHitRollResult: 0, damageDiceResults: []});
   };
   
   const rollDamage = (isCrit: boolean = false): void => {
      const rolledDamage: number[] = [];
      let rolledDamageTotal: number = 0;
      const damageByDieResults: IDamageByDice[] = [];

      attack.damageDice.forEach((dd: DamageDice, index: number) => {
         if (!dd.applyOnlyOnCrit || (isCrit)) {
            let numberOfRolls = (isCrit && dd.multipleOnCrit) ? dd.numberOfDie * attack.critMultiplier : dd.numberOfDie; 
            const results: number[] = [];
            for (let i = 0; i < numberOfRolls; i++) {
               let rollResult = RollSucka(dd.DieSize)
               rolledDamage.push(rollResult);
               results.push(rollResult);
               rolledDamageTotal += rolledDamage[rolledDamage.length-1];
            }

            let bonusDamage = (index === 0) ? (isCrit ? attack.damageBonus * attack.critMultiplier : attack.damageBonus) : 0;

            damageByDieResults.push({
               damageType: dd.DamageType ? dd.DamageType : '',
               damageRollResult: results,
               bonusDamage: bonusDamage,
               damageTotal: results.reduce((a,b) => a + b, 0) + bonusDamage
            })

         }
      });

      updateState({damageDiceResults: damageByDieResults});
   }

   const generateDamageDiceString = (damageDice: DamageDice[]): string => {
      let displayString = '';
      damageDice.forEach((dd, index) => {
         displayString += `${dd.numberOfDie}d${dd.DieSize} `
         displayString += index ? 
            `${dd.DamageType}` :
            `+ ${!index ? damageBonus: ''} ${dd.DamageType} `;
         if (dd.applyOnlyOnCrit) {
            displayString += ' (on crit) ';
         }
         if (index < damageDice.length - 1) {
            displayString += ' + ';
         }
      });

      return displayString;
   };

   const generateRolledDamageString = () => {
      let displayString = '';
      state.damageDiceResults.forEach((result, index) => {
         displayString += `[${result.damageRollResult.toString()}]`;
         displayString += result.bonusDamage ? ` + ${result.bonusDamage} ` : '';
         displayString += ` => ${result.damageTotal} ${result.damageType}`;
         displayString += (index !== state.damageDiceResults.length - 1) ? `,\t` : '';
      });
      return displayString;
   }

   const {attackBonus, damageDice, damageBonus, critThreshold, critMultiplier} = attack;

   const toHitString = `${state.toHitRollResult} + ${attackBonus} = ${state.toHitRollResult + attackBonus}`;
   const rolledDamageString = generateRolledDamageString();
   const attackBonusAndCrit = `${attackBonus} --- ` + (critThreshold === 20 ? `${critThreshold}` : `[${critThreshold}-20]`) + ` x${critMultiplier}`
   console.log(state.damageDiceResults);

   return (
      <AttackContainer>
         <ColumnContainer>
            <AttackNumberText>{rowNumber} -</AttackNumberText>
            <RollButton onClick={handleRollClick}>Roll!</RollButton>
            <ClearButton onClick={handleClearClick}>Clear</ClearButton>
         </ColumnContainer>
         <ColumnContainer>
            <TextSpan>Attack Bonus:</TextSpan>
            <InputContainer>
               <AttackBonusInput type="text" ref={inputRef}  value={attackBonusAndCrit} readOnly={true}/>
               <ToHitInput type="text" value={toHitString} readOnly={true} rollResult={state.toHitRollResult} critThreshold={attack.critThreshold}/>
            </InputContainer>
         </ColumnContainer>
         <ColumnContainer>
            <TextSpan>Dmg Dice:</TextSpan>
            <InputContainer>
               <DamageDiceInput value={generateDamageDiceString(damageDice)} readOnly={true}/>
               <RolledDamageInput type="text" value={rolledDamageString} readOnly={true}/>
            </InputContainer>
         </ColumnContainer>
      </AttackContainer>
   );
};

export default AttackRow;

interface IDamageByDice {
   damageType: String;
   damageRollResult: number[];
   bonusDamage: number;
   damageTotal: number;
}

interface IAttackRowState {
   toHitRollResult: number;
   damageDiceResults: IDamageByDice[];
}

export interface IAttackRowProps {
   attack: Attack;
   rowNumber: number;
}