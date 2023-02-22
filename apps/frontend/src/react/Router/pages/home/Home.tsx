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

  const theme = functions.colorThemeSelector(themeState.colorTheme);
  // const translator = (text: any) => functions.languageSelector(languageState.toTranslate, text);

  // homeVariables.translator = translator;

  useEffect(() => {
    functions.fadeIn('home');
  }, []);

  const createUser = async () => {
    try {
      const userBody = {
        "name": nameCreate,
        "email": emailCreate,
        "password": passwordCreate
      };
      const {data: postData} = await axios.post('http://localhost:8585/user', userBody);
      const {data: getData} = await axios.get('http://localhost:8585/user/name', {params: userBody});
      // const id = getData.id;
      const AgendaBody = {
        info: 'test',
        userId: getData.id,
      };
      await axios.post('http://localhost:8585/agenda', AgendaBody);
      const result = postData.message;
      return result;    
    } catch(error: any) { 
      return `${error.response.data.message}`;
    }
  };
  
  const getUser = async () => {
    try {
      let response;      
      if(userName === '') {
        const {data} = await axios.get('http://localhost:8585/user');
        response = data;
        let guy = '';
        response.map((element: AxiosResponse | any) => {
          guy += `name:${element.name}\nemail:${element.email}\n`;
        });
        setGetUserResponse(guy);
        setUserId('');
 
      }
      if(userName !== '') {  
        const bodyUser = {
          name: userName,
        };
        const {data: dataUser} = await axios.get(`http://localhost:8585/user/name`, {params: bodyUser});
        response = dataUser;
        const guy = `name:${response.name}\nemail:${response.email}`;
        setGetUserResponse(guy);
        setUserId(dataUser.id);
        const bodyAgenda = {
          userId: dataUser.id,
        };
        const {data: dataAgenda} = await axios.get(`http://localhost:8585/agenda/userid`, {params: bodyAgenda});
        console.log(dataAgenda);
        
        setAgendaInfo(dataAgenda.info);
        // return `name:${response.name}\nemail:${response.email}`;    
      }
    } catch(error: any) { 
      return `${error.response.data.message}`;
    }
  };  
  
  const updateUser = async () => {
    try {
      const body = {
        "email": emailToUpdate,
        "updatedName": nameUpdate,
        "updatedEmail": emailUpdate,
      };
      const {data} = await axios.put('http://localhost:8585/user', body);
      const result = data.message;
      return result;    
    } catch(error: any) { 
      return `${error.response.data.message}`;
    }
  };

  const deleteUser = async () => {
    try {
    const {data} = await axios.delete('http://localhost:8585/user');
    const result = data.message;
    return result;    
    } catch(error: any) { 
      return `${error.response.data.message}`;
    }
  };

  
  const savingAgenda = async (elementValue: string) => {
     setAgendaInfo(elementValue);
    if(userId) {
      try {
        const body = {
          userId: Number(userId),
          info: elementValue
        };
        await axios.put('http://localhost:8585/agenda', body);
      } catch(error: any) { 
        return `${error.response.data.message}`;
      }
    }
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
          <input placeholder='name' onChange={(e) => setNameCreate(e.target.value)} />
          <input type='email' placeholder='email' onChange={(e) => setEmailCreate(e.target.value)} />
          <input type='password' placeholder='password' onChange={(e) => setPasswordCreate(e.target.value)} />
          <button onClick={async () => setCreateUserResponse(await createUser())} >go</button>
          <div className={`result${theme}`}>{`${createUserResponse || 'resultado'}`}</div>
          </div>
        <div className={`user-read${theme}`}>
          read
          <input placeholder='get user by name' onChange={(e) => setUserName(e.target.value)} />
          <button onClick={async () => await getUser()} >go</button>
          <div className={`result${theme}`}>{`${getUserResponse || 'resultado'}`}</div>
          </div>
        <div className={`user-update${theme}`}>
          update
          <input placeholder='get user by email' onChange={(e) => setEmailToUpdate(e.target.value)} />
          <input placeholder='new name' onChange={(e) => setNameUpdate(e.target.value)} />
          <input placeholder='new email' onChange={(e) => setEmailUpdate(e.target.value)} />
          <button onClick={async () => setUpdateUserResponse(await updateUser())} >go</button>
          <div className={`result${theme}`}>{`${updateUserResponse || 'resultado'}`}</div>
          </div>
        <div className={`user-delete${theme}`}>
          delete
          <input/>
          <button onClick={async () => setDeleteUserResponse(await deleteUser())} >go</button>
          <div className={`result${theme}`}>{`${deleteUserResponse || 'resultado'}`}</div>
          </div>
        </section>
        <section className={`agenda${theme}`}>
          <textarea className={`info${theme}`} placeholder='Whats in your mind...' value={agendaInfo} onChange={(e) => savingAgenda(e.target.value)}/>
          <div className={`info-saving${theme}`}>saving...</div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;
