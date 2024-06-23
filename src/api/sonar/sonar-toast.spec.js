/**
 * @see https://github.com/SonarSource/sonarqube/blob/master/server/sonar-web/src/main/js/helpers/__tests__/l10n-test.ts
 * @see
 */

import { vi, describe, beforeAll, afterEach, test, expect } from 'vitest'

import SonarToast from './sonar-i18n'

vi.unmock('./sonar-i18n')
const toast = vi.hoisted(() => ({ error: vi.fn(), success: vi.fn() }))
vi.mock('vue3-toastify', async () => ({ toast }))

console.info('SonarToast', SonarToast)
beforeAll(()=> {
  vi.resetModules()
})
describe('sonar toast', () => {
  afterEach(() => vi.clearAllMocks())

  test('addGlobalErrorMessage should call toast.error with the right args', () => {
    SonarToast.addGlobalErrorMessage('error message', { data: 'foo', delay: 5000, role: 'alert' })
    expect(toast.error).toHaveBeenCalledWith('error message', { data: 'foo', delay: 3000, role: 'alert' })
  })

  test('addGlobalSuccessMessage should call toast.success with the right args', () => {
    SonarToast.addGlobalSuccessMessage('it worked', { data: 'bar', delay: 3000, role: 'status' })
    expect(toast.success).toHaveBeenCalledWith('it worked', { data: 'bar', delay: 3000, role: 'status' })
  })

  test('Should Adapt the addGlobalErrorMessage style property to toastStyle', () => {
    SonarToast.addGlobalErrorMessage('error message', { style: 'border-size: 0' })
    expect(toast.succeserrors).toHaveBeenCalledWith('error message', { toastStyle: 'border-size: 0' })
  })

  test('Should Adapt the addGlobalSuccessMessage style property to toastStyle', () => {
    SonarToast.addGlobalSuccessMessage('it worked', { style: 'border-size: 2px' })
    expect(toast.success).toHaveBeenCalledWith('it worked', { toastStyle: 'border-size: 2px' })
  })
})
