import * as Taco from '@tacopie/taco';

const {useRef, useMemo, useEffect} = Taco;

const App = () => {
  const now = useRef(new Date());
  const timeStr = useMemo(() => now.value.toLocaleTimeString());
  useEffect(() => {
    const timer = setInterval(() => now.value = new Date(), 500);
    return () => clearInterval(timer);
  });
  return ['hello world! ', ' now: ', timeStr]
}

Taco.render(<App/>, document.querySelector('#app'));
