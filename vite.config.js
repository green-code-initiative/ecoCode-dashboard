import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import createExternal from 'vite-plugin-external';

// used to get absolute path
import * as path from 'path';
// see https://webpack.js.org/plugins/css-minimizer-webpack-plugin/
import { optimizeCssModules } from 'vite-plugin-optimize-css-modules';
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const devMode = process.env.NODE_ENV !== 'production';
// https://vitejs.dev/config/
export default defineConfig({
  mode: devMode ? 'development' : 'production',

  
  // Define the entry points here. They MUST have the same name as the page_id
  // defined in src/main/java/org/sonarsource/plugins/web/MyPluginPageDefinition.java
  entry: {
    // tell webpack that view.js in bundle correspond to index.jsx on disk
    view: './src/js/index.js',
  },

  output: {
    // The entry point files MUST be shipped inside the final JAR's static/ directory.
    // aka, set where webpack should export compiled files
    path: path.join(__dirname, 'target/classes/static'),
    filename: '[name].js',

    // tell dev-server where to serve all files
    // output files will be available on localhost:8080/static/greensight/
    // The 'auto' value performs caller script detection and resolves path relative to injected entrypoint path;
    publicPath: 'auto',

    // clear output.path before building
    clean: true,
  },

  plugins: [
    vue(),
    VueDevTools(),
    optimizeCssModules(),
    createExternal({
      externals: {
        // Register the Sonar* globals as packages, to simplify importing.
        // See src/main/js/common/api.js for more information on what is exposed
        // in SonarRequest.
        'sonar-request': 'SonarRequest',
  
        // TODO: provide an example
        'sonar-measures': 'SonarMeasures',
      }
    })
  ],

  // optimization: {
  //   // minimizing will only happend on production build
  //   minimizer: [
  //     // extend webpack minimizer with our own
  //     '...',
  //     new CssMinimizerPlugin({
  //       // should make Minimizing a bit faster
  //       parallel: true,
  //     }),
  //   ],

  //   // the two lines below should make js code a bit smaller
  //   mangleExports: 'size',
  //   mangleWasmImports: true,
  // },

  resolve: {
    // alias ready to be used
    alias: {
      Icons: path.resolve(__dirname, 'src/assets/icons'),
      Images: path.resolve(__dirname, 'src/assets/images'),
    },
    extensions: ['.js', '.jsx', '...'],
  },

  devServer: {
    client: {
      logging: 'verbose',
    },
    proxy: {
      '/api': {
        context: ['**', '!/webpack-dev-server/**', '!/static/greensight/**'],
        target: 'https://localhost:9000',
        changeOrigin: true,
      //  secure: false,      
      //  ws: true,
       },  
    },
    // this will tell devServer to open the webpage with /projects happened at the end
    open: ['/projects'],
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        // see babel.config.js for babel config
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        // match css, sass and scss files
        test: /\.(c|(s[ac]))ss$/,
        use: [
          // if in dev, style loader will be used, css will be injected in inline
          // if in prod, css will be in a separated file and inserted MANUALLY on loading
          // see index.js
          devMode
            ? { loader: 'style-loader' }
            : { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              // 1 because we have postcss
              importLoaders: 1,

              // disable sourcemap in prod, this will have a huge impact
              // on outputted css file size
              sourceMap: devMode,
            },
          },
          {
            // see postcss.config.js
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: devMode,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)$/,

        // see https://webpack.js.org/guides/asset-management/#loading-images
        type: 'asset/resource',
      },
    ],
  },
})
