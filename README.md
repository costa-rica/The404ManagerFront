# NavBAr at the top

## Description

- The key his is that we are using a <TemplateView> that will hold the header/navbar at the top of the screen and everything else in a <main>.
- All other pages/ components will have a <div> that might function like a <main>
- This does not have media query to account for screen size.

### Hamburger menu

- Install npm
  `npm install --save @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/fontawesome-svg-core`

- Install yarn

```
yarn add @fortawesome/fontawesome-svg-core
yarn add @fortawesome/react-fontawesome
yarn add @fortawesome/free-solid-svg-icons
```

-import

```js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
```
