# Back-Office

### Installation

In order to intall the application, Node at least v16.17.1 is required to be able to run the `npm install` and in order start the application `npm start`

---

### Libreries

- **[Axios]([https://axios-http.com/docs/intro](https://axios-http.com/docs/intro "https://axios-http.com/docs/intro")**
- **[i18n]([https://www.i18next.com/](https://www.i18next.com/ "https://www.i18next.com/")**
- **[material-ui]([https://mui.com/material-ui/getting-started/overview/](https://mui.com/material-ui/getting-started/overview/ "https://mui.com/material-ui/getting-started/overview/")**
- **[react-color-picker](https://github.com/hello-pangea/color-picker)**
- **[react-redux]([https://redux.js.org/](https://redux.js.org/ "https://redux.js.org/")**
- **[react-router-dom]([https://reactrouter.com/en/main](https://reactrouter.com/en/main "https://reactrouter.com/en/main")**
- **[dayJs](https://day.js.org/)**
- **[sass]([https://sass-lang.com/](https://sass-lang.com/ "https://sass-lang.com/")**
- **[typescript]([https://www.typescriptlang.org/](https://www.typescriptlang.org/ "https://www.typescriptlang.org/")**

---

### Styles

A common.module.scss file can be found in `src/assets/style`, equipped with the common classes utilised and imported as `common` in all components.
Each component has been styled with his `.modules.scss`, and some `sx{{}}` objects for more complex custom components.

---

### Media

The media is almost all server based and can be accessed via API request. All local files can be found in `src/assets/media`.

---

### Localization

The localization is available in Italian and English, it is handled by the [i18n](https://www.i18next.com/) library. The i18n file can be found in `src/asets/lang` and the localization files are in the `public/locals` directory.

---

### Components

Components are divided in functional and hooks, and are each in the `src/components/functional` and `src/components/hooks` directories. Each component has his own folder with his `.tsx` file and his `.module/sccs` file

---

### Storage

The storage of the loginToken and refreshToken is handled by the `localStorage` and is set in the `src/pages/login.tsx` and is read in the `../genericServices.js` for the API handling.
The storage of the session of an loggedIn user is handled by `sessionStorage` and is also set in the `src/pages/login.tsx` and then sent to Redux storage.
Redux handles the session of the legedIn user. `src/redux/ducks/loginDuck.js` handles the state manipolation in order for app the reload with the newly logedin user, `src/redux/ducks/userDuck.js` handles the logedin user's information and is provided in all App.tsx, and can be accessed by the `useSelector` hook.
All the storage is cleaned and the Redux reseted to initial value in the `useLogut.tsx` custom hook.

---

### Custom Hooks

---

### Utils

---

### tsConfig.json

---
