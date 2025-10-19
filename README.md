# REACT-PRIORITY

Manually define the component rendering priority of your client side application.

```jsx
import { Priority, PriorityProvider, useFreePriority } from './src';

<PriorityProvider>
  <Priority level={0}> // will render immediately
    <ProductDetails />
  </Priority>
  <Priority level={1} fallback={<Loading />}> // will render after priority level 0 is freed
    <Recommendations />
  </Priority>
</PriorityProvider>

```

In the example above, the component `Recommendations` will be renderend only after the priority 0 is freed.

Call `useFreePriority` To move to the next priority level.
Important: If more there are than one Priority is declared with the same level, all instances of the component need to be freed before it moves to the next level.

```jsx
import { useFreePriority } from '../src';

export function ProductDetails() {
  const freePriority = useFreePriority();
  
  useEffect(() => {
    // in this example the priority will be freed after the timeout.
    setTimeout(() => freePriority(), 500);
  }, []);

  return ...;
}
```

Note that `freePriority` doesn't specify the priority level to be freed, it always frees the closest `Priority` level up in the tree.
