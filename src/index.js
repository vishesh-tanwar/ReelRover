import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
// import Counter from './components/counter';
// import Todo from './components/todo' ;
// import StopWatch from "./components/stopwatch"

import ImdbApp from './components/ImdbApp';


// const Heading = () =>{
//   return(
//     <h1>
//     This is Heading 
//   </h1> 
//   )
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <>
    {/* <Counter label="A" theme='red-theme' /> 
    <Counter label="B" theme='blue-theme' /> 
    <Counter label="C" theme='violet-theme' />  */}

    {/* <Todo /> */}
    {/* <StopWatch/>*/}

    <ImdbApp/>

    {/* <Heading /> */}
    {/* <App /> */}
    </>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
