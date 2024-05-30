import { createApp } from 'vue';
import { Quasar } from 'quasar';
import 'quasar/src/css/index.sass';
import GreensightApp from './GreensightApp.vue';

const injectedCssLinks = [];
// You can access it at /project/extension/greensight/project
window.registerExtension('greensight/view', (options) => {
  let css;
  // inject css in head only in production build
  if (process.env.NODE_ENV === 'production') {
    css = document.createElement('link');
    css.setAttribute('rel', 'stylesheet');
    css.setAttribute('type', 'text/css');
    // window.baseUrl is a global property that is set by SonarQube and contains the base URL of your SonarQube instance
    css.setAttribute('href', `${window.baseUrl}/static/greensight/view.css`);

    document.head.appendChild(css);
    injectedCssLinks.push(css); // Store the injected CSS link
  }

  // options.el: Element DOM dans le quel vue.js doit injecter son contenu
  createApp(GreensightApp, options)
    .use(Quasar, {
      config: {
        brand: {
          primary: '#FF0000',
        },
      },
      plugins: {},
    })
    .mount(options.el);

  return function () {
    // any cleaning should happend here
    injectedCssLinks.forEach((css) => {
      if (css.parentNode) {
        document.head.removeChild(css);
      }
    });
  };
});
