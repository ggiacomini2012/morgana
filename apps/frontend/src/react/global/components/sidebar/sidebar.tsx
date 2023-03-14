import './css/portraitSidebar.css';
import './css/landscapeSidebar.css';
import './css/desktopSidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeLanguage, useLanguage } from '../../../state-manager/redux/slices/sliceLanguage';
import { useColorTheme } from '../../../state-manager/redux/slices/sliceColorTheme';
import functions from '../../functions';
import ColorTheme from './components/colorThemeButton/colorTheme';
import guilherme from '../../../../assets/morgana.svg';
import globalStrings from '../../constants/strings/globalStrings';

function Sidebar() {
  // const goTo = useNavigate();
  const dispatch = useDispatch();
  const [languageState] = useSelector(useLanguage);
  const [themeState] = useSelector(useColorTheme);

  const theme = functions.colorThemeSelector(themeState.colorTheme);
  // const translator = (text: any) => functions.languageSelector(languageState.toTranslate, text);

  return (
    <main id="sidebar" data-testid="sidebar" className={`sidebar${theme}`}>
      <section className={`figure-container${theme}`}>
        <figure
          data-testid="profile-picture-container"
          id="profile-picture-container"
          className={`profile-picture-container${theme}`}
        >
          <img src={guilherme} alt="guilherme profile" className={`profile-picture${theme}`} />
        </figure>
      </section>
      <ColorTheme />
      <select
        name="select"
        value={languageState.toTranslate}
        data-testid="select-language-button"
        className={`select-language${theme}`}
        onChange={(e) => dispatch(changeLanguage(e.target.value))}
      >
        <option value="english">english</option>
        <option value="português">português</option>
      </select>
    </main>
  );
}

export default Sidebar;
