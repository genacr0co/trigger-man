# TRIGGER-MAN (⌐▀͡ ̯ʖ▀)=/̵͇̿̿/'̿'̿̿̿ ̿ ̿̿

## Documentation.

This is Trigger-man React/TypeScript Library.
 It is needed for generating events to invoke functions or transmit data between components that aren't directly linked without using props.

### 1. Create Trigger Function

+ Function Body
  
  ```ts
  export function createTrigger<T = any>(
    type: string, 
    detail?: T, 
    target_element?: RefObject<any>
  ) {
      if (target_element) {
          target_element.current.dispatchEvent(new CustomEvent(type, {detail}));
      } else {
          if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent(type, {detail}));
          }
      }
  }
  ```

+ Using
    
  ```ts
  //             event,   data which will be send with event
  createTrigger('alert', {message: 'Hello world'})
  ```

### 2. useTrigger hook

+ Function Body

  ```tsx
  export const useTrigger = <T = any>(
    type: string,
    listener: (event: CustomEvent<T>) => void,
    element?: RefObject<any>,
    options?: boolean | AddEventListenerOptions | undefined,
  ) => {
      useEffect(() => {
          let target = element?.current || window;
          target.addEventListener(type, listener, options)
  
          return () => {
              target.removeEventListener(type, listener, options)
          }
      }, [type, listener, options])
  }
  ```

+ Using

  ```ts
  //          event,   function that get createTrigger data
  useTrigger('alert', (event) => {
    console.log(event.detail.message)
  });
  ```

### 3. Examples

+ 3.1 Change Avatar



```tsx
// ChangeAvatarButton.tsx

import React from 'react';
import {createTrigger} from "trigger-man";
import newImage from './img2.png';

export const ChangeAvatarButton = () => {

  function handleClick() {
    createTrigger("changeAvatar", { img: newImage });
  }

  return <div>
    <button onClick={handleClick}>change avatar</button>
  </div>;
};
```

```tsx
// Header.tsx

import React, {useState} from 'react';
import {useTrigger} from "trigger-man";
import oldImage from './img1.png';

export const Header = () => {

  const [img, setImg] = useState(oldImage);

  useTrigger('changeAvatar', (event) => {
    setImg(event.detail.img)
  })

  return <div>
    <img width={'200px'} src={img.src} alt={'image'}/>
  </div>
}
```

Result

![2023-06-19 18-58-47](https://github.com/genacr0co/trigger-man/assets/83674229/5b72b243-1aa8-449d-8d88-984d5060393f)



+ 3.2 Global Values

```tsx
export const Component1 = () => {

  function handleClick() {
    createTrigger('global', {value: 1})
  }

  return <div>
    <button onClick={handleClick}>Set Value 1</button>
  </div>
}
```

```tsx
export const Component2 = () => {

  function handleClick() {
    createTrigger("global", { value: 2 });
  }

  return <div>
    <button onClick={handleClick}>Set Value 2</button>
  </div>;
};
```

```tsx
export const Component3 = () => {

  function handleClick() {
    createTrigger("global", { value: 3 });
  }

  return <div>
    <button onClick={handleClick}>Set Value 3</button>
  </div>;
};
```
```tsx
export const ValueView1 = () => {

  const [value, setValue] = useState(0);

  useTrigger('global', (event) => {
    setValue(event.detail.value)
  })

  return <div>
    <h1>ValueView1: {value} </h1>
  </div>
}
```
```tsx
export const ValueView2 = () => {

  const [value, setValue] = useState(0);

  useTrigger('global', (event) => {
    setValue(event.detail.value)
  })

  return <div>
    <h1>ValueView2: {value} </h1>
  </div>
}
```
```tsx
export const ValueView3 = () => {

  const [value, setValue] = useState(0);

  useTrigger("global", (event) => {
    setValue(event.detail.value);
  });

  return <div>
    <h1>ValueView3: {value} </h1>
  </div>;
};
```

```tsx
export const App = () => {

  return (
    <div style={{ padding: 100 }}>
      <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
        <Component1 />
        <Component2 />
        <Component3 />
      </div>


      <ValueView1 />
      <ValueView2 />
      <ValueView3 />
    </div>
  );
};
```

Result

![2023-06-19 19-17-14](https://github.com/genacr0co/trigger-man/assets/83674229/aa4d1824-d6b1-4a32-980f-adf8a2abd7fe)
