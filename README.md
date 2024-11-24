# The 404 Server Manager

## .env

```
NEXT_PUBLIC_API_BASE_URL=http://0.0.0.0:3000
```

## getting Input without missing the last character

```js
  const getPassword = (enteredText) => {
    setPassword(enteredText.target.value);
    props.sendPasswordBackToParent(enteredText.target.value);
  };

    return (
    <div>
      <input
        onChange={getPassword}
      />
      <div>
    )
```

## Font

1. next newsest `yarn add next@latest react@latest react-dom@latest`
2. install `npm i @next/font`
3. pages/app.js `import {Roboto} from '@next/font/google'`
