import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

// MOCK
if (process.env.NODE_ENV === 'development') {
  const { worker } = await import('./mocks/browser')
  worker.start()
}

// See https://docs.sonarsource.com/sonarqube/latest/extension-guide/developing-a-plugin/adding-pages-to-the-webapp/#create-a-javascript-file-per-page
// extension key from ecoCode-dashboard/sonar-plugin/src/main/java/io/ecocode/plugin/web/EcocodeDashboardPageDefinition.java
window.registerExtension(
  'ecocode/view',
  function (options) {
    const app = createApp(App)
    app.mount(options.el)
    // Whenever the user leaves the page, cleanly shut everything down
    // (i.e., remove event listeners, stop running timers, etc).
    return function () {
      app.unmount()
    }
  },
  true
)
