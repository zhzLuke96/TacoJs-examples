import * as Taco from '@tacopie/taco';
import {useRef, useMemo, useEffect, useWatch, unref, Mptr} from '@tacopie/taco';
import marked from 'marked';

import './index.less';

const demoMdText = {
  quickref: '//marked.js.org/demo/quickref.md',
};

const RawHTML = ({
  html = '',
  ref = null,
  ...rest
}: {
  html: Mptr<string>;
  ref?: any;
  [k: string]: any;
}) => {
  const elem = useRef(null as null | HTMLElement);
  useWatch(
    () => [elem.value, unref(html)] as const,
    ([el, text]) => {
      if (!el) {
        return;
      }
      el.innerHTML = text;
    }
  );
  return (
    <div
      ref={(el) => {
        elem.value = el;
        ref && (typeof ref === 'function' ? ref(el) : (ref.value = el));
      }}
      {...rest}
    />
  );
};

const App = () => {
  const text = useRef('# Loading');
  useEffect(() => {
    fetch(demoMdText.quickref)
      .then((resp) => resp.text())
      .then((txt) => (text.value = txt));
  });
  const markedHTML = useMemo(() => marked(text.value));

  const sourceArea = useRef(null);
  const overSourceArea = useRef(false);
  const outputArea = useRef(null);
  const overOutputArea = useRef(false);
  return (
    <div className="container">
      <div className="source-area">
        <textarea
          ref={sourceArea}
          value={text}
          onMouseOver={() => (overSourceArea.value = true)}
          onMouseOut={() => (overSourceArea.value = false)}
          onInput={(ev) => (text.value = ev.target.value)}
          onScroll={(ev) =>
            overSourceArea.value &&
            outputArea.value &&
            (outputArea.value.scrollTop =
              (ev.target.scrollTop / ev.target.scrollHeight) *
              outputArea.value.scrollHeight)
          }
        />
      </div>
      <div
        className="output-area"
        ref={outputArea}
        onMouseOver={() => (overOutputArea.value = true)}
        onMouseOut={() => (overOutputArea.value = false)}
        onScroll={(ev) =>
          overOutputArea.value &&
          sourceArea.value &&
          (sourceArea.value.scrollTop =
            (ev.target.scrollTop / ev.target.scrollHeight) *
            sourceArea.value.scrollHeight)
        }
      >
        <RawHTML html={markedHTML} className="markdown-body" />
      </div>
    </div>
  );
};

Taco.render(<App />, document.querySelector('#app'));
