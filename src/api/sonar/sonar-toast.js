/**
 * Re-implementation of the Sonarqube `design-system` Toast API
 *
 * Provides a compatible API to be usable from external UIs (VScode, Confluence, ...)
 * In this context, a Sonar TOKEN is required for the Web API authentication
 *
 * @see https://github.com/SonarSource/sonarqube/blob/master/server/sonar-web/design-system/src/components/toast-message/toast-utils.tsx
 * @see https://github.com/SonarSource/sonarqube/blob/master/server/sonar-web/src/main/js/app/components/extensions/exposeLibraries.ts
 *
 * @see https://vue3-toastify.js-bridge.com/api/toast.html
 * @see https://fkhadra.github.io/react-toastify/api/toast
 **/

import { toast } from 'vue3-toastify'

/**
 * @typedef {Object} ToastOptions
 * @property {string} role ARIA Role ('alert', 'status', 'log')
 * @property {number} delay Let you delay the toast appearance. Pass a value in ms
 * @property {number} delay Let you delay the toast appearance. Pass a value in ms
 * @property {number} delay Let you delay the toast appearance. Pass a value in ms
 */

const mapper = {
  style: 'toastStyle'
}

function transform(overrides) {
  Object.entries(mapper).forEach(([key, value]) => {
    if (key in overrides) {
      overrides[value] = overrides[key]
    }
  })
}

/**
 * @param {string} message
 * @param {ToastOptions} overrides
 * @warning ReactToastify and Vue3Toast do not support the same options
 * @returns
 */
function addGlobalErrorMessage(message, overrides) {
  return toast.error(message, transform(overrides))
}

/**
 * @param {string} message
 * @param {ToastOptions} overrides
 * @warning ReactToastify and Vue3Toast do not support the same options
 * @returns
 */
function addGlobalSuccessMessage(message, overrides) {
  return toast.success(message, transform(overrides))
}

const SonarToast = { addGlobalErrorMessage, addGlobalSuccessMessage }

export default SonarToast
