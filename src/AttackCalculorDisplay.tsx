import React from 'react';
import styled from 'styled-components';
import AttackGrouping from './AttackGrouping';

const AttackGroupsContainer = styled.div`
   display: flex;
   height: 100%;
   flex-direction: column;
   width: 100%;
`;

const getInitialState = {
   attackGroupings: [{attackGroupingName: 'Furry of Blows 1'}]
};


const AttackCalculatorDisplay: React.FC = () => {
   const [state, setState] = React.useState(getInitialState);

   const generateAttackGroupings = () => {
      state.attackGroupings.forEach(grouping => {
         return <AttackGrouping/>;
      });
   };

   return (
      <AttackGroupsContainer>
         <AttackGrouping/>
      </AttackGroupsContainer>
   );
};

export default AttackCalculatorDisplay;

interface attackGrouping {
   attackGroupingName: string;
}

export interface IAttackCalculatorDisplayState {
   attackGroupings: attackGrouping[]
}