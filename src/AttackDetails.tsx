import React from 'react';
import styled from 'styled-components';
import Switch from 'react-switch';
import {IAttackGroupingState} from './AttackGrouping';
import {DamageDice} from './model/AttackModel';

const AttackDetailsContainer = styled.div`
   display: flex;
   margin: 1rem;
   max-width: 75rem;
   margin: 0 auto;
   border-bottom: gray solid 1px;
   flex-direction: column;
`;

const Container = styled.div`
   display: flex;
   margin: 0.5rem 0.5rem;
   justify-content: space-evenly;

   * {
      margin: 0;
   }
`;

const ColumContainer =  styled(Container)`
   justify-content: space-between;

   div {
      margin: 0.25rem;
   }
`;

const RowContainer = styled(Container)`
   flex-direction: column;
   justify-content: flex-start;
`;

const TextSpan = styled.span`
   font-size: small;
   text-align: center;
`;

const StyledInput = styled.input`
   text-align: center;
   margin: 0.125rem 0.5rem;
   height: 1rem;
`;

const SmallInput = styled(StyledInput)`
   width: 2rem;
`;

const MediumInput = styled(StyledInput)`
   width: 4rem;
`;

const AttackDetails: React.FC<IAttackDetailsProps> = ({state, updateState}) => {
   const {bonuses, damageBonus, critMultiplier, critThreshold, damageDie} = state;
   const [isDeadlyAim, setIsDeadlyAim] = React.useState(false);
   const [deadlyAimMod, setDeadlAimMod] = React.useState(4);
   const [attackBonusString, setAttackBonusString] = React.useState(bonuses.toString());

   const handleAttackBonusChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      isDeadlyAim && toggleDeadlyAim();
      let newBonuses: number[];
      const input: string = e.target.value;
      try {
         newBonuses = input.split(',').filter(value => value.length).map(value => parseInt(value));
         updateState({bonuses: newBonuses});
         setAttackBonusString(input);
      } catch (error) {
         console.error(error);
      }
   };

   const handleDamageBonusChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      isDeadlyAim && toggleDeadlyAim();
      try {
         let newValue = parseInt(e.target.value);
         updateState({damageBonus: newValue ? newValue : 0});
      } catch (error) {
         console.error(error);
      }
   };

   const handleDDNumChange = (e: React.ChangeEvent<HTMLInputElement>, DDIndex: number) => {
      const newDD: DamageDice[] = damageDie;
      try {
         let newValue = parseInt(e.target.value);
         newDD[DDIndex].numberOfDie = newValue ? newValue : 0;
         updateState({damageDie: newDD});
      } catch(error) {
         console.error(error);
      }
   };

   const handleDDSizeChange = (e: React.ChangeEvent<HTMLInputElement>, DDIndex: number) => {
      const newDD: DamageDice[] = damageDie;
      try {
         let newValue = parseInt(e.target.value);
         newDD[DDIndex].DieSize = newValue ? newValue : 0;
         updateState({damageDie: newDD});
      } catch(error) {
         console.error(error);
      }
   };

   const handleDDTypeChange = (e: React.ChangeEvent<HTMLInputElement>, DDIndex: number) => {
      const newDD: DamageDice[] = damageDie;
      try {
         let newValue = e.target.value;
         newDD[DDIndex].DamageType = newValue ? newValue : '';
         updateState({damageDie: newDD});
      } catch(error) {
         console.error(error);
      }
   };

   const handleDDMultOnCritChange = (DDIndex: number) => {
      const newDD: DamageDice[] = damageDie;
      try {
         newDD[DDIndex].multipleOnCrit = !newDD[DDIndex].multipleOnCrit;
         updateState({damageDie: newDD});
      } catch(error) {
         console.error(error);
      }
   };

   const handleDDApplyOnlyOnCritChange = (DDIndex: number) => {
      const newDD: DamageDice[] = damageDie;
      try {
         newDD[DDIndex].applyOnlyOnCrit = !newDD[DDIndex].applyOnlyOnCrit;
         updateState({damageDie: newDD});
      } catch(error) {
         console.error(error);
      }
   };

   const toggleDeadlyAim = (): void => {
      const newDeadlyAim = !isDeadlyAim;
      const newBonuses = newDeadlyAim ?
         bonuses.map(bonus => bonus - deadlyAimMod) :
         bonuses.map(bonus => bonus + deadlyAimMod);
      const newDamageBonus = newDeadlyAim ?
         damageBonus + (2 * deadlyAimMod) :
         damageBonus - (2 * deadlyAimMod)
         
      updateState({bonuses: newBonuses, damageBonus: newDamageBonus});
      setIsDeadlyAim(newDeadlyAim);
      setAttackBonusString(newBonuses.toString());
   };

   const handleDeadlyAimModChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      isDeadlyAim && toggleDeadlyAim();
      try {
         let newValue = parseInt(e.target.value);
         newValue ? setDeadlAimMod(newValue) : setDeadlAimMod(0);
      } catch(error) {
         console.error(error);
      }
   };

   const handleCritThresholdChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      try {
         let newValue = parseInt(e.target.value);
         updateState({critThreshold: newValue ? newValue : 0})
      } catch(error) {
         console.error(error);
      }
   };

   const handleCritMultiplierChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      try {
         let newValue = parseInt(e.target.value);
         updateState({critMultiplier: newValue ? newValue : 0})
      } catch(error) {
         console.error(error);
      }
   };

   return (
      <AttackDetailsContainer>
         <Container>
            <RowContainer>
               <ColumContainer>
                  <TextSpan>Attack Bonuses:</TextSpan>
                  <StyledInput value={attackBonusString} onChange={e => handleAttackBonusChange(e)}/>
               </ColumContainer>
               <ColumContainer>
                  <TextSpan>Damage Bonus</TextSpan>
                  <StyledInput value={damageBonus} onChange={e => handleDamageBonusChange(e)}/>
               </ColumContainer>
            </RowContainer>
            <RowContainer>
               <ColumContainer>
                  <TextSpan>Crit Threshold</TextSpan>
                  <SmallInput value={critThreshold ? critThreshold : ''} onChange={e => handleCritThresholdChange(e)}/>
               </ColumContainer>
               <ColumContainer>
                  <TextSpan>Crit Multiplier</TextSpan>
                  <SmallInput value={critMultiplier ? critMultiplier : ''} onChange={e => handleCritMultiplierChange(e)}/>
               </ColumContainer>
            </RowContainer>
            <RowContainer>
               <ColumContainer>
                  <TextSpan>Deadly Aim</TextSpan>
                  <StyledInput type="checkbox" checked={isDeadlyAim} onChange={toggleDeadlyAim}/>
               </ColumContainer>
               <ColumContainer>
                  <TextSpan>Dealy Aim Mod</TextSpan>
                  <SmallInput value={deadlyAimMod ? deadlyAimMod : ''} onChange={e => handleDeadlyAimModChange(e)}/>
               </ColumContainer>
            </RowContainer>
         </Container>
         <Container>
            <RowContainer>
               <ColumContainer>
                  <TextSpan style={{width: '100%'}}>Damage Dice Primary</TextSpan>
               </ColumContainer>
               <ColumContainer>
                  <TextSpan># Die</TextSpan>
                  <SmallInput value={damageDie[0].numberOfDie ? damageDie[0].numberOfDie : ''} onChange={event => handleDDNumChange(event, 0)}/>
               </ColumContainer>
               <ColumContainer>
                  <TextSpan>Die Size</TextSpan>
                  <SmallInput value={damageDie[0].DieSize ? damageDie[0].DieSize : ''} onChange={event => handleDDSizeChange(event, 0)}/>
               </ColumContainer>
               <ColumContainer>
                  <TextSpan>Damage Type</TextSpan>
                  <MediumInput value={damageDie[0].DamageType} onChange={event => handleDDTypeChange(event, 0)}/>
               </ColumContainer>
               <ColumContainer>
                     <TextSpan>Mult on Crit</TextSpan>
                     <Switch checked={damageDie[0].multipleOnCrit as boolean} onChange={() => handleDDMultOnCritChange(0)}/>
                  </ColumContainer>
                  <ColumContainer>
                     <TextSpan>Apply only on Crit</TextSpan>
                     <Switch checked={damageDie[0].applyOnlyOnCrit as boolean} onChange={() => handleDDApplyOnlyOnCritChange(0)}/>
                  </ColumContainer>
            </RowContainer>
            {damageDie[1] &&
               <RowContainer>
                  <ColumContainer>
                     <TextSpan style={{width: '100%'}}>Damage Dice Secondary</TextSpan>
                  </ColumContainer>
                  <ColumContainer>
                     <TextSpan># Die</TextSpan>
                     <SmallInput value={damageDie[1].numberOfDie ? damageDie[1].numberOfDie : ''} onChange={event => handleDDNumChange(event, 1)}/>
                  </ColumContainer>
                  <ColumContainer>
                     <TextSpan>Die Size</TextSpan>
                     <SmallInput value={damageDie[1].DieSize ? damageDie[1].DieSize : ''} onChange={event => handleDDSizeChange(event, 1)}/>
                  </ColumContainer>
                  <ColumContainer>
                     <TextSpan>Damage Type</TextSpan>
                     <MediumInput value={damageDie[1].DamageType} onChange={event => handleDDTypeChange(event, 1)}/>
                  </ColumContainer>
                  <ColumContainer>
                     <TextSpan>Mult on Crit</TextSpan>
                     <Switch checked={damageDie[1].multipleOnCrit as boolean} onChange={() => handleDDMultOnCritChange(1)}/>
                  </ColumContainer>
                  <ColumContainer>
                     <TextSpan>Apply only on Crit</TextSpan>
                     <Switch checked={damageDie[1].applyOnlyOnCrit as boolean} onChange={() => handleDDApplyOnlyOnCritChange(1)}/>
                  </ColumContainer>
               </RowContainer>
            }
            {damageDie[2] &&
               <RowContainer>
                  <ColumContainer>
                     <TextSpan style={{width: '100%'}}>Damage Dice Tertiary</TextSpan>
                  </ColumContainer>
                  <ColumContainer>
                     <TextSpan># Die</TextSpan>
                     <SmallInput value={damageDie[2].numberOfDie ? damageDie[2].numberOfDie : ''} onChange={event => handleDDNumChange(event, 2)}/>
                  </ColumContainer>
                  <ColumContainer>
                     <TextSpan>Die Size</TextSpan>
                     <SmallInput value={damageDie[2].DieSize ? damageDie[2].DieSize : ''} onChange={event => handleDDSizeChange(event, 2)}/>
                  </ColumContainer>
                  <ColumContainer>
                     <TextSpan>Damage Type</TextSpan>
                     <MediumInput value={damageDie[2].DamageType} onChange={event => handleDDTypeChange(event, 2)}/>
                  </ColumContainer>
                  <ColumContainer>
                     <TextSpan>Mult on Crit</TextSpan>
                     <Switch checked={damageDie[2].multipleOnCrit as boolean} onChange={() => handleDDMultOnCritChange(2)}/>
                  </ColumContainer>
                  <ColumContainer>
                     <TextSpan>Apply only on Crit</TextSpan>
                     <Switch checked={damageDie[2].applyOnlyOnCrit as boolean} onChange={() => handleDDApplyOnlyOnCritChange(2)}/>
                  </ColumContainer>
               </RowContainer>
            }
         </Container>
      </AttackDetailsContainer>
   );
};

export default AttackDetails;

export interface IAttackDetailsProps {
   state: IAttackGroupingState
   updateState(newState: Partial<IAttackGroupingState>): void;
}


