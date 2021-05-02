import React from 'react';
import './App.css';
import styled from 'styled-components';
import pathfinderLogo from './static/pathfinder-logo-png-2.png'
import AttackCalculatorDisplay from './AttackCalculorDisplay';

const AppContainer = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 4.5rem;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  box-sizing: border-box;

  span {
    align-self: center;
  }
`;

const Logo = styled.img`
  height: 4.5rem;
`;

const MainContentContainer = styled.div`
  width: 100%;
  height: calc(100vh - 4.5rem);
  justify-content: center;
  align-items: center;
  display: flex;
  overflow: auto;
`;


const App: React.FC = () => {

  const header: JSX.Element = (
    <HeaderContainer>
      <Logo src={pathfinderLogo}/>
      <span>
        Pathfinder Attack Calculator
      </span>
      <span>
        V0.1 - By: Glen Simon
      </span>
    </HeaderContainer>
  );

  const mainContent: JSX.Element = (
    <MainContentContainer>
      <AttackCalculatorDisplay/>
    </MainContentContainer>
  );

  return (
    <AppContainer>
      {header}
      {mainContent}
    </AppContainer>
  );
};

export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
