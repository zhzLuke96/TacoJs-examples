import * as Taco from '@tacopie/taco';
import {useRef, useMemo, useEffect} from '@tacopie/taco';
import {FluentDesign, MaterialIcon} from '@tacopie/ui';

import './index.css';

// TODO: 类型问题
const {DesignSystemProvider, Card, Switch} = FluentDesign as any;

const App = () => {
  const now = useRef(new Date());
  const timeStr = useMemo(() => now.value.toLocaleTimeString());
  useEffect(() => {
    const timer = setInterval(() => (now.value = new Date()), 500);
    return () => clearInterval(timer);
  });
  const checked = useRef(true);
  const fontWeight = useMemo(() => {
    if (!checked.value) return 'lighter';
    return 'bolder';
  });
  return (
    <DesignSystemProvider use-defaults>
      <Card style={{'font-weight': fontWeight}} className="center-card">
        <h1>Hello TacoJs🌮!</h1>
        <br />
        <div className="row">
          <MaterialIcon name="query_builder" theme="outlined" />
          Now Time:
        </div>
        <br />
        {timeStr}
        <br />
        <Switch
          checked={checked}
          className="footer-switch"
          onChange={(ev) => (checked.value = ev.srcElement.checked)}
        />
      </Card>
    </DesignSystemProvider>
  );
};

Taco.render(<App />, document.querySelector('#app'));
