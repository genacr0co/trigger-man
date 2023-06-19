# TRIGGER-MAN (⌐▀͡ ̯ʖ▀)=/̵͇̿̿/'̿'̿̿̿ ̿ ̿̿

## Documentation.

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
              window.dispatchEvent(new CustomEvent('alert', {detail}));
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


![2023-06-19 19-17-14](https://github.com/genacr0co/trigger-man/assets/83674229/aa4d1824-d6b1-4a32-980f-adf8a2abd7fe)
