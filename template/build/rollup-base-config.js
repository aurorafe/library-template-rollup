// Config file for running Rollup in "normal" mode (non-watch)
const babel = require('rollup-plugin-babel'); // ES2015 tran
const json = require('rollup-plugin-json');
const cjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
{{#lint}}
const eslintConfig = require('../.eslintrc');
const eslint = require('rollup-plugin-eslint');
const friendlyFormatter = require('eslint-friendly-formatter');
{{/lint}}
{{#scss}}
const copy = require('rollup-plugin-copied');
{{/scss}}
const _package = require('../package.json');
const { handleMinEsm, resolve } = require('./helper');
const time = new Date();
const year = time.getFullYear();
const banner = `/*!\n * author: ${_package.author} 
 * ${_package.name} v${_package.version}
 * build-time: ${year}-${time.getMonth() + 1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}
 * LICENSE: ${_package.license}
 * (c) 2018-${year} ${_package.homepage}\n */`;
const genConfig = (opts) => {
  const config = {
    input: {
      input: resolve('src/index.js'),
      plugins: [
        json({
          include: resolve('package.json'),
          indent: ' '
        }),
        {{#lint}}
        eslint(Object.assign({}, eslintConfig, {
          formatter: friendlyFormatter,
          exclude: [
            resolve('package.json'),
            resolve('node_modules/**')
          ]
        })),
        {{/lint}}
        babel({
          exclude: [
            resolve('package.json'),
            resolve('node_modules/**')
          ] // only transpile our source code
        }),
        nodeResolve({
          jsnext: true,
          main: true,
          browser: true
        }),
        cjs(),
        {{#scss}}
        copy({
          from: resolve('src/assets/images'),
          to: resolve('dist/images'),
          emitFiles: true // defaults to true
        })
        {{/scss}}
      ]
    },
    output: {
      file: opts.file,
      format: opts.format,
      banner,
      name: _package.namespace,
      extend: true
    }
  }
  if (opts.env) {
    config.input.plugins.unshift(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))
  }
  return config
};
module.exports = [
  {
    file: resolve(_package.unpkg),
    format: 'umd',
    env: 'development'
  },
  {
    file: resolve(handleMinEsm(_package.unpkg)),
    format: 'umd',
    env: 'production'
  },
  {
    file: resolve(_package.main),
    format: 'cjs'
  },
  {
    file: resolve(_package.module),
    format: 'es'
  }
].map(genConfig)
