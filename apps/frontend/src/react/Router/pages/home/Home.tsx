import React, { useEffect, useState } from 'react';
import './css/portraitHome.css';
import './css/landscapeHome.css';
import './css/desktopHome.css';
import { useSelector } from 'react-redux';
import Footer from '../../../global/components/footer/footer';
// import globalStrings from '../../../global/constants/strings/globalStrings';
import functions from '../../../global/functions';
// import { useLanguage } from '../../../state-manager/redux/slices/sliceLanguage';
import Sidebar from '../../../global/components/sidebar/sidebar';
import { useColorTheme } from '../../../state-manager/redux/slices/sliceColorTheme';
// import axios, { AxiosResponse } from 'axios';

// const homeVariables = {
//   translator: (text: any) => text,
// };

function Home() {
  const [info, setInfo] = useState('.23-04-2003');
  // const [languageState] = useSelector(useLanguage);
  const [themeState] = useSelector(useColorTheme);

  const theme = functions.colorThemeSelector(themeState.colorTheme);
  // const translator = (text: any) => functions.languageSelector(languageState.toTranslate, text);

  const regexDate = /^\.[0-9]{2}-[0-9]{2}-[0-9]{4}$/;

  function countingSignal() {
    // (document.getElementById('textarea') as HTMLInputElement).value = info;
    const textareaValue = (document.getElementById('textarea') as HTMLInputElement)?.value || '';
    // console.log(textareaValue.split('').filter(e => e === '.'));
    
    return textareaValue.split(/\s/).filter(e => regexDate.test(e)) || 'nada';
  }
  
  const date = new Date(2023, 3, 14);

  // Get the week of the year
  const week = date.getMonth();
  
  // Print the week of the year
  console.log(week);

  useEffect(() => {
    // console.log(countingSignal());
    
    functions.fadeIn('home');
  }, []);
  useEffect(() => {
    
    // ['.23-04-2003'].filter(e => console.log(e, regexDate.test(e)));
    
    console.log((document.getElementById('textarea') as HTMLInputElement).value);
    console.log(countingSignal());
  }, [info]);

  return (
    <>
      <Sidebar />
      <main id="home" data-testid="home" className={`home${theme} fade-in`}>
        <textarea id="textarea" data-testid="textarea" className={`textarea${theme}`} value={info} onChange={(e) => setInfo(e.target.value)}/>
        <section id="graph-container" data-testid="graph-container" className={`graph-container${theme} graph-container`}>
          <div id="graph-container-title" data-testid="graph-container-title" className={`graph-container-title${theme}`}>Graphs</div>
          { info && countingSignal()?.map(e => (
          <div key={`${e+1}`} id="graph-unit" data-testid="graph-unit" className={`graph-unit${theme} graph-unit`}>
            <div id="graph-date" data-testid="graph-date" className={`graph-date${theme} graph-date`}>
              {e}
              </div>
              <div id="graph" data-testid="graph" className={`graph${theme} graph`}>
                <div id="graph-each-day" data-testid="graph-each-day" className={`graph-each-day${theme} graph-each-day`}></div>
                <div id="graph-each-day" data-testid="graph-each-day" className={`graph-each-day${theme} graph-each-day`}></div>
                <div id="graph-each-day" data-testid="graph-each-day" className={`graph-each-day${theme} graph-each-day`}></div>
                <div id="graph-each-day" data-testid="graph-each-day" className={`graph-each-day${theme} graph-each-day`}></div>
                <div id="graph-each-day" data-testid="graph-each-day" className={`graph-each-day${theme} graph-each-day`}></div>
                <div id="graph-each-day" data-testid="graph-each-day" className={`graph-each-day${theme} graph-each-day`}></div>
                <div id="graph-each-day" data-testid="graph-each-day" className={`graph-each-day${theme} graph-each-day`}></div>
              </div>
            </div>)
            )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
