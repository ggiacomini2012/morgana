import React, { useEffect, useState } from 'react';
import './css/portraitHome.css';
import './css/landscapeHome.css';
import './css/desktopHome.css';
import { useSelector } from 'react-redux';
import guilherme from '../../../../assets/morgana.svg';
import Footer from '../../../global/components/footer/footer';
// import globalStrings from '../../../global/constants/strings/globalStrings';
import functions from '../../../global/functions';
// import { useLanguage } from '../../../state-manager/redux/slices/sliceLanguage';
import Header from '../../../global/components/header/header';
import { useColorTheme } from '../../../state-manager/redux/slices/sliceColorTheme';
// import ProjectsDisplay from './components/projectsDisplay/ProjectsDisplay';
import axios, { AxiosResponse } from 'axios';

// const homeVariables = {
//   translator: (text: any) => text,
// };

function Home() {
  // const [languageState] = useSelector(useLanguage);
  const [themeState] = useSelector(useColorTheme);
  const [getUserResponse, setGetUserResponse] = useState('');
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [createUserResponse, setCreateUserResponse] = useState<AxiosResponse>();
  const [deleteUserResponse, setDeleteUserResponse] = useState<AxiosResponse>();
  const [emailCreate, setEmailCreate] = useState('');
  const [nameCreate, setNameCreate] = useState('');
  const [passwordCreate, setPasswordCreate] = useState('');
  const [emailToUpdate, setEmailToUpdate] = useState('');
  const [emailUpdate, setEmailUpdate] = useState('');
  const [nameUpdate, setNameUpdate] = useState('');
  const [updateUserResponse, setUpdateUserResponse] = useState<AxiosResponse>();
  const [agendaInfo, setAgendaInfo] = useState('');
  const [resetSetTimeoutSaving, setResetSetTimeoutSaving] = useState(0);
  const [resetSetTimeoutRemoveClass, setResetSetTimeoutRemoveClass] = useState(0);
  const [resetSetTimeoutAgendaInfo, setResetSetTimeoutAgendaInfo] = useState(0);

  const theme = functions.colorThemeSelector(themeState.colorTheme);
  // const translator = (text: any) => functions.languageSelector(languageState.toTranslate, text);

  // homeVariables.translator = translator;

  const apiUrl = import.meta.env.VITE_APP_API_URL || 'http://localhost:8585';

  useEffect(() => {
    functions.fadeIn('home');
  }, []);

  const createUser = async () => {
    try {
      const userBody = {
        name: nameCreate,
        email: emailCreate,
        password: passwordCreate,
      };
      const { data: postData } = await axios.post(`${apiUrl}/user`, userBody);
      const { data: getData } = await axios.get(`${apiUrl}/user/name`, { params: userBody });
      // const id = getData.id;
      const AgendaBody = {
        info: 'test',
        userId: getData.id,
      };
      await axios.post(`${apiUrl}/agenda`, AgendaBody);
      const result = postData.message;
      return result;
    } catch (error: any) {
      return `${error.response.data.message}`;
    }
  };

  const getUser = async () => {
    try {
      let response;
      if (userName === '') {
        const { data } = await axios.get(`${apiUrl}/user`);
        response = data;
        let guy = '';
        response.map((element: AxiosResponse | any) => {
          guy += `name:${element.name}\nemail:${element.email}\n`;
        });
        setGetUserResponse(guy);
        setUserId('');
      }
      if (userName !== '') {
        const bodyUser = {
          name: userName,
        };
        const { data: dataUser } = await axios.get(`${apiUrl}/user/name`, {
          params: bodyUser,
        });
        response = dataUser;
        const guy = `name:${response.name}\nemail:${response.email}`;
        setGetUserResponse(guy);
        setUserId(dataUser.id);
        const bodyAgenda = {
          userId: dataUser.id,
        };
        const { data: dataAgenda } = await axios.get(`${apiUrl}/agenda/userid`, {
          params: bodyAgenda,
        });
        console.log(dataAgenda);
        clearTimeout(resetSetTimeoutAgendaInfo);
        const refreshInfo = setInterval(async () => {
          const bodyAgendaInterval = {
            userId: dataUser.id,
          };
          const { data: dataAgendaInterval } = await axios.get(`${apiUrl}/agenda/userid`, {
            params: bodyAgendaInterval,
          });
          setAgendaInfo(dataAgendaInterval.info);
          console.log('listenning logging');
        }, 4000);
        setResetSetTimeoutAgendaInfo(Number(refreshInfo));
        setAgendaInfo(dataAgenda.info);
        // return `name:${response.name}\nemail:${response.email}`;
      }
    } catch (error: any) {
      return `${error.response.data.message}`;
    }
  };

  const updateUser = async () => {
    try {
      const body = {
        email: emailToUpdate,
        updatedName: nameUpdate,
        updatedEmail: emailUpdate,
      };
      const { data } = await axios.put(`${apiUrl}/user`, body);
      const result = data.message;
      return result;
    } catch (error: any) {
      return `${error.response.data.message}`;
    }
  };

  const deleteUser = async () => {
    try {
      const { data } = await axios.delete(`${apiUrl}/user`);
      const result = data.message;
      return result;
    } catch (error: any) {
      return `${error.response.data.message}`;
    }
  };

  const savingAgenda = async (elementValue: string) => {
    setAgendaInfo(elementValue);
    clearTimeout(resetSetTimeoutSaving);
    clearTimeout(resetSetTimeoutRemoveClass);
    clearTimeout(resetSetTimeoutAgendaInfo);
    document
      .getElementById('info-saving')
      ?.classList.remove('info-saving-appear-dark', 'info-saving-appear-light');
    const saveAfterTyping = setTimeout(async () => {
      if (userId) {
        try {
          document
            .getElementById('info-saving')
            ?.classList.add('info-saving-appear-dark', 'info-saving-appear-light');
          const body = {
            userId: Number(userId),
            info: elementValue,
          };
          await axios.put(`${apiUrl}/agenda`, body);
        } catch (error: any) {
          return `${error.response.data.message}`;
        }
      }
    }, 2000);
    const removeClass = setTimeout(() => {
      document
        .getElementById('info-saving')
        ?.classList.remove('info-saving-appear-dark', 'info-saving-appear-light');
    }, 5000);
    const refreshInfo = setInterval(async () => {
      const bodyAgendaInterval = {
        userId,
      };
      const { data: dataAgendaInterval } = await axios.get(`${apiUrl}/agenda/userid`, {
        params: bodyAgendaInterval,
      });
      console.log('listenning after typing');
      
      setAgendaInfo(dataAgendaInterval.info);
    }, 4000);
    setResetSetTimeoutAgendaInfo(Number(refreshInfo));
    setResetSetTimeoutSaving(Number(saveAfterTyping));
    setResetSetTimeoutRemoveClass(Number(removeClass));
  };

  return (
    <>
      <Header />
      <main id="home" data-testid="home" className={`home${theme} fade-in`}>
        <section className={`figure-container${theme}`}>
          <figure
            data-testid="profile-picture-container"
            id="profile-picture-container"
            className={`profile-picture-container${theme}`}
          >
            <img src={guilherme} alt="guilherme profile" className={`profile-picture${theme}`} />
          </figure>
        </section>
        <section className={`api${theme}`}>
          <div className={`user-create${theme}`}>
            create
            <input placeholder="name" onChange={(e) => setNameCreate(e.target.value)} />
            <input
              type="email"
              placeholder="email"
              onChange={(e) => setEmailCreate(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPasswordCreate(e.target.value)}
            />
            <button onClick={async () => setCreateUserResponse(await createUser())}>go</button>
            <div className={`result${theme}`}>{`${createUserResponse || 'resultado'}`}</div>
          </div>
          <div className={`user-read${theme}`}>
            read
            <input placeholder="get user by name" onChange={(e) => setUserName(e.target.value)} />
            <button onClick={async () => await getUser()}>go</button>
            <div className={`result${theme}`}>{`${getUserResponse || 'resultado'}`}</div>
          </div>
          <div className={`user-update${theme}`}>
            update
            <input
              placeholder="get user by email"
              onChange={(e) => setEmailToUpdate(e.target.value)}
            />
            <input placeholder="new name" onChange={(e) => setNameUpdate(e.target.value)} />
            <input placeholder="new email" onChange={(e) => setEmailUpdate(e.target.value)} />
            <button onClick={async () => setUpdateUserResponse(await updateUser())}>go</button>
            <div className={`result${theme}`}>{`${updateUserResponse || 'resultado'}`}</div>
          </div>
          <div className={`user-delete${theme}`}>
            delete
            <input />
            <button onClick={async () => setDeleteUserResponse(await deleteUser())}>go</button>
            <div className={`result${theme}`}>{`${deleteUserResponse || 'resultado'}`}</div>
          </div>
        </section>
        <section className={`agenda${theme}`}>
          <textarea
            className={`info${theme}`}
            placeholder="Whats in your mind..."
            value={agendaInfo}
            onChange={(e) => savingAgenda(e.target.value)}
          />
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
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
