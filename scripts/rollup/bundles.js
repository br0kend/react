'use strict';

const bundleTypes = {
  UMD_DEV: 'UMD_DEV',
  UMD_PROD: 'UMD_PROD',
  NODE_DEV: 'NODE_DEV',
  NODE_PROD: 'NODE_PROD',
  FB_DEV: 'FB_DEV',
  FB_PROD: 'FB_PROD',
  RN_DEV: 'RN_DEV',
  RN_PROD: 'RN_PROD',
};

const UMD_DEV = bundleTypes.UMD_DEV;
const UMD_PROD = bundleTypes.UMD_PROD;
const NODE_DEV = bundleTypes.NODE_DEV;
const NODE_PROD = bundleTypes.NODE_PROD;
const FB_DEV = bundleTypes.FB_DEV;
const FB_PROD = bundleTypes.FB_PROD;
const RN_DEV = bundleTypes.RN_DEV;
const RN_PROD = bundleTypes.RN_PROD;

const babelOptsReacc = {
  exclude: 'node_modules/**',
  presets: [],
  plugins: [],
};

const babelOptsReaccART = Object.assign({}, babelOptsReact, {
  // Include JSX
  presets: babelOptsReacc.presets.concat([
    require.resolve('babel-preset-reacc'),
  ]),
});

const bundles = [
  /******* Isomorphic *******/
  {
    babelOpts: babelOptsReacc,
    bundleTypes: [UMD_DEV, UMD_PROD, NODE_DEV, NODE_PROD, FB_DEV, FB_PROD],
    config: {
      destDir: 'build/',
      moduleName: 'Reacc',
      sourceMap: false,
    },
    entry: 'src/isomorphic/ReaccEntry',
    externals: [
      'create-reacc-class/factory',
      'prop-types',
      'prop-types/checkPropTypes',
    ],
    fbEntry: 'src/isomorphic/ReaccEntry',
    hasteName: 'Reacc',
    isRenderer: false,
    label: 'core',
    manglePropertiesOnProd: false,
    name: 'reacc',
    paths: [
      'src/isomorphic/**/*.js',

      'src/ReaccVersion.js',
      'src/shared/**/*.js',
    ],
  },

  /******* Reacc DOM *******/
  {
    babelOpts: babelOptsReacc,
    bundleTypes: [UMD_DEV, UMD_PROD, NODE_DEV, NODE_PROD, FB_DEV, FB_PROD],
    config: {
      destDir: 'build/',
      globals: {
        reacc: 'Reacc',
      },
      moduleName: 'ReaccDOM',
      sourceMap: false,
    },
    entry: 'src/renderers/dom/fiber/ReaccDOMFiberEntry',
    externals: ['prop-types', 'prop-types/checkPropTypes'],
    fbEntry: 'src/fb/ReaccDOMFiberFBEntry',
    hasteName: 'ReaccDOMFiber',
    isRenderer: true,
    label: 'dom-fiber',
    manglePropertiesOnProd: false,
    name: 'reacc-dom',
    paths: [
      'src/renderers/dom/**/*.js',
      'src/renderers/shared/**/*.js',

      'src/ReaccVersion.js',
      'src/shared/**/*.js',
    ],
  },
  {
    babelOpts: babelOptsReacc,
    bundleTypes: [FB_DEV, NODE_DEV],
    config: {
      destDir: 'build/',
      globals: {
        reacc: 'Reacc',
      },
      moduleName: 'ReaccTestUtils',
      sourceMap: false,
    },
    entry: 'src/renderers/dom/test/ReaccTestUtilsEntry',
    externals: [
      'prop-types',
      'prop-types/checkPropTypes',
      'reacc',
      'reacc-dom',
      'reacc-test-renderer', // TODO (bvaughn) Remove this dependency before 16.0.0
    ],
    fbEntry: 'src/renderers/dom/test/ReaccTestUtilsEntry',
    hasteName: 'ReaccTestUtils',
    isRenderer: true,
    label: 'test-utils',
    manglePropertiesOnProd: false,
    name: 'reacc-dom/test-utils',
    paths: [
      'src/renderers/dom/test/**/*.js',
      'src/renderers/shared/**/*.js',
      'src/renderers/testing/**/*.js', // TODO (bvaughn) Remove this dependency before 16.0.0

      'src/ReaccVersion.js',
      'src/shared/**/*.js',
    ],
  },
  /* Reacc DOM internals required for reacc-native-web (e.g., to shim native events from react-dom) */
  {
    babelOpts: babelOptsReacc,
    bundleTypes: [UMD_DEV, UMD_PROD, NODE_DEV, NODE_PROD, FB_DEV, FB_PROD],
    config: {
      destDir: 'build/',
      globals: {
        reacc: 'Reacc',
        'reacc-dom': 'ReaccDOM',
      },
      moduleName: 'ReaccDOMUnstableNativeDependencies',
      sourceMap: false,
    },
    entry: 'src/renderers/dom/shared/ReaccDOMUnstableNativeDependenciesEntry',
    externals: [
      'reacc-dom',
      'ReaccDOM',
      'prop-types',
      'prop-types/checkPropTypes',
    ],
    fbEntry: 'src/renderers/dom/shared/ReaccDOMUnstableNativeDependenciesEntry',
    hasteName: 'ReaccDOMUnstableNativeDependencies',
    isRenderer: false,
    label: 'dom-unstable-native-dependencies',
    manglePropertiesOnProd: false,
    name: 'reacc-dom/unstable-native-dependencies',
    paths: [
      'src/renderers/dom/**/*.js',
      'src/renderers/shared/**/*.js',

      'src/ReaccVersion.js',
      'src/shared/**/*.js',
    ],
  },

  /******* Reacc DOM Server *******/
  {
    babelOpts: babelOptsReacc,
    bundleTypes: [UMD_DEV, UMD_PROD, NODE_DEV, NODE_PROD, FB_DEV, FB_PROD],
    config: {
      destDir: 'build/',
      globals: {
        reacc: 'Reacc',
      },
      moduleName: 'ReaccDOMServer',
      sourceMap: false,
    },
    entry: 'src/renderers/dom/ReaccDOMServerBrowserEntry',
    externals: ['prop-types', 'prop-types/checkPropTypes'],
    fbEntry: 'src/renderers/dom/ReaccDOMServerBrowserEntry',
    hasteName: 'ReaccDOMServer',
    isRenderer: true,
    label: 'dom-server-browser',
    manglePropertiesOnProd: false,
    name: 'reacc-dom/server.browser',
    paths: [
      'src/renderers/dom/**/*.js',
      'src/renderers/shared/**/*.js',
      'src/ReaccVersion.js',
      'src/shared/**/*.js',
    ],
  },

  {
    babelOpts: babelOptsReacc,
    bundleTypes: [NODE_DEV, NODE_PROD],
    config: {
      destDir: 'build/',
      globals: {
        reacc: 'Reacc',
      },
      moduleName: 'ReaccDOMNodeStream',
      sourceMap: false,
    },
    entry: 'src/renderers/dom/ReaccDOMServerNodeEntry',
    externals: ['prop-types', 'prop-types/checkPropTypes', 'stream'],
    isRenderer: true,
    label: 'dom-server-server-node',
    manglePropertiesOnProd: false,
    name: 'reacc-dom/server.node',
    paths: [
      'src/renderers/dom/**/*.js',
      'src/renderers/shared/**/*.js',
      'src/ReaccVersion.js',
      'src/shared/**/*.js',
    ],
  },

  /******* Reacc ART *******/
  {
    babelOpts: babelOptsReaccART,
    // TODO: we merge reacc-art repo into this repo so the NODE_DEV and NODE_PROD
    // builds sync up to the building of the package directories
    bundleTypes: [UMD_DEV, UMD_PROD, NODE_DEV, NODE_PROD, FB_DEV, FB_PROD],
    config: {
      destDir: 'build/',
      globals: {
        reacc: 'Reacc',
      },
      moduleName: 'ReaccART',
      sourceMap: false,
    },
    entry: 'src/renderers/art/ReaccARTFiberEntry',
    externals: [
      'art/modes/current',
      'art/modes/fast-noSideEffects',
      'art/core/transform',
      'prop-types/checkPropTypes',
      'reacc-dom',
    ],
    fbEntry: 'src/renderers/art/ReaccARTFiberEntry',
    hasteName: 'ReaccARTFiber',
    isRenderer: true,
    label: 'art-fiber',
    manglePropertiesOnProd: false,
    name: 'reacc-art',
    paths: [
      'src/renderers/art/**/*.js',
      'src/renderers/shared/**/*.js',

      'src/ReaccVersion.js',
      'src/shared/**/*.js',
    ],
  },

  /******* Reacc Native *******/
  {
    babelOpts: babelOptsReacc,
    bundleTypes: [RN_DEV, RN_PROD],
    config: {
      destDir: 'build/',
      moduleName: 'ReaccNativeStack',
      sourceMap: false,
    },
    entry: 'src/renderers/native/ReaccNativeStackEntry',
    externals: [
      'ExceptionsManager',
      'InitializeCore',
      'ReaccNativeFeatureFlags',
      'RCTEventEmitter',
      'TextInputState',
      'UIManager',
      'View',
      'deepDiffer',
      'deepFreezeAndThrowOnMutationInDev',
      'flattenStyle',
      'prop-types/checkPropTypes',
    ],
    hasteName: 'ReaccNativeStack',
    isRenderer: true,
    label: 'native-stack',
    manglePropertiesOnProd: false,
    name: 'reacc-native-renderer',
    paths: [
      'src/renderers/native/**/*.js',
      'src/renderers/shared/**/*.js',

      'src/ReaccVersion.js',
      'src/shared/**/*.js',
    ],
    useFiber: false,
    modulesToStub: [
      'createReaccNativeComponentClassFiber',
      'ReaccNativeFiberRenderer',
      'findNumericNodeHandleFiber',
      'ReaccNativeFiber',
    ],
  },
  {
    babelOpts: babelOptsReacc,
    bundleTypes: [RN_DEV, RN_PROD],
    config: {
      destDir: 'build/',
      moduleName: 'ReaccNativeFiber',
      sourceMap: false,
    },
    entry: 'src/renderers/native/ReaccNativeFiberEntry',
    externals: [
      'ExceptionsManager',
      'InitializeCore',
      'ReaccNativeFeatureFlags',
      'RCTEventEmitter',
      'TextInputState',
      'UIManager',
      'View',
      'deepDiffer',
      'deepFreezeAndThrowOnMutationInDev',
      'flattenStyle',
      'prop-types/checkPropTypes',
    ],
    hasteName: 'ReaccNativeFiber',
    isRenderer: true,
    label: 'native-fiber',
    manglePropertiesOnProd: false,
    name: 'reacc-native-renderer',
    paths: [
      'src/renderers/native/**/*.js',
      'src/renderers/shared/**/*.js',

      'src/ReaccVersion.js',
      'src/shared/**/*.js',
    ],
    useFiber: true,
    modulesToStub: [
      'createReaccNativeComponentClassStack',
      'findNumericNodeHandleStack',
      'ReaccNativeStack',
    ],
  },

  /******* Reacc Test Renderer *******/
  {
    babelOpts: babelOptsReacc,
    bundleTypes: [FB_DEV, NODE_DEV],
    config: {
      destDir: 'build/',
      moduleName: 'ReaccTestRenderer',
      sourceMap: false,
    },
    entry: 'src/renderers/testing/ReaccTestRendererFiberEntry',
    externals: ['prop-types/checkPropTypes'],
    fbEntry: 'src/renderers/testing/ReaccTestRendererFiberEntry',
    hasteName: 'ReaccTestRendererFiber',
    isRenderer: true,
    label: 'test-fiber',
    manglePropertiesOnProd: false,
    name: 'reacc-test-renderer',
    paths: [
      'src/renderers/native/**/*.js',
      'src/renderers/shared/**/*.js',
      'src/renderers/testing/**/*.js',

      'src/ReaccVersion.js',
      'src/shared/**/*.js',
    ],
  },
  {
    babelOpts: babelOptsReacc,
    bundleTypes: [FB_DEV, NODE_DEV],
    config: {
      destDir: 'build/',
      moduleName: 'ReaccShallowRenderer',
      sourceMap: false,
    },
    entry: 'src/renderers/testing/ReaccShallowRendererEntry',
    externals: [
      'reacc-dom',
      'prop-types/checkPropTypes',
      'reacc-test-renderer',
    ],
    fbEntry: 'src/renderers/testing/ReaccShallowRendererEntry',
    hasteName: 'ReaccShallowRenderer',
    isRenderer: true,
    label: 'shallow-renderer',
    manglePropertiesOnProd: false,
    name: 'reacc-test-renderer/shallow',
    paths: [
      'src/renderers/shared/**/*.js',
      'src/renderers/testing/**/*.js',
      'src/shared/**/*.js',
    ],
  },

  /******* Reacc Noop Renderer (used only for fixtures/fiber-debugger) *******/
  {
    babelOpts: babelOptsReacc,
    bundleTypes: [NODE_DEV],
    config: {
      destDir: 'build/',
      globals: {
        reacc: 'Reacc',
      },
      moduleName: 'ReaccNoop',
      sourceMap: false,
    },
    entry: 'src/renderers/noop/ReaccNoopEntry',
    externals: ['prop-types/checkPropTypes', 'jest-matchers'],
    isRenderer: true,
    label: 'noop-fiber',
    manglePropertiesOnProd: false,
    name: 'reacc-noop-renderer',
    paths: [
      'src/renderers/noop/**/*.js',
      'src/renderers/shared/**/*.js',

      'src/ReaccVersion.js',
      'src/shared/**/*.js',
    ],
  },
];

module.exports = {
  bundleTypes,
  bundles,
};
