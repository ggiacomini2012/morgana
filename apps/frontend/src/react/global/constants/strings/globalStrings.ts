import * as Interface from './strings.interface';

const globalStrings: Interface.IAllStrings = {
  text: {
    intro: 'intro',
    by: 'by',
    home: 'home',
    about: 'about',
    aboutDescription: 'aboutDescription',
    contact: 'contact',
    contactDescription: 'contactDescription',
    portfolio: 'portfolio',
    notFound: 'notFound',
  },
  randomAnswer:
    'The language selected is nether english nor portuguese. A língua selecionada não é português nem inglês',
  developerName: 'Guilherme Giacomini Teixeira.',
  english: {
    intro: "Hi, I'm Guilherme Giacomini Teixeira, full stack web developer.",
    by: 'by',
    home: 'home',
    about: 'about',
    aboutDescription:
      "",
    contact: 'contact',
    contactDescription: 'If you like what you see get in touch with me at:',
    portfolio: 'PORTFOLIO',
    notFound: 'Url not found',
  },
  português: {
    intro: 'Olá, Guilherme Giacomini Teixeira, desenvolvedor web full stack.',
    by: 'por',
    home: 'início',
    about: 'sobre',
    aboutDescription:
      '',
    contact: 'contacto',
    contactDescription:
      'Se você gostou do meu trabalho me contacte através de algum destes canais:',
    portfolio: 'PORTFÓLIO',
    notFound: 'Url não encontrada',
  },
  colorTheme: {
    darkMode: '-dark',
    lightMode: '-light',
  },
};

export default globalStrings;
