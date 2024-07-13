
const coverageConfig = {
  istanbul: {
    include: ['**/*.stories.js'],
  },
};

/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-coverage',
      options: coverageConfig,
    },
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  }
}
export default config
