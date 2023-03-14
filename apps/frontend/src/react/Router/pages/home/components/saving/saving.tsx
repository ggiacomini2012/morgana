/* eslint-disable no-restricted-syntax */
import './css/portraitSaving.css';
import './css/landscapeSaving.css';
import './css/desktopSaving.css';
import functions from '../../../../../global/functions';
import { useSelector } from 'react-redux';
import { useColorTheme } from '../../../../../state-manager/redux/slices/sliceColorTheme';

function Saving() {
  const [themeState] = useSelector(useColorTheme);

  const theme = functions.colorThemeSelector(themeState.colorTheme);
  return (
    <div id="info-saving" className={`info-saving${theme}`}>
      <span>s</span>
      <span>a</span>
      <span>v</span>
      <span>i</span>
      <span>n</span>
      <span>g</span>
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  );
}

export default Saving;
