import babel from 'rollup-plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import localResolve from 'rollup-plugin-local-resolve';
import replace from "rollup-plugin-replace";
import minify from 'rollup-plugin-babel-minify';

import pkg from './package.json';

const outputCommonConf = {
  sourcemap: true,
  globals: {
    react: 'React'
  }
};

const config = {
  input: 'src/index.js',
  output: [
    {
      file: pkg['umd:main'],
      format: 'umd',
      name: 'ReactScriptTag',
      ...outputCommonConf
    },
    {
      file: pkg.main,
      format: 'cjs',
      ...outputCommonConf
    },
    {
      file: pkg.module,
      format: 'es',
      ...outputCommonConf
    },
  ],
  plugins: [
    peerDepsExternal(),
    babel({ exclude: 'node_modules/**' }),
    localResolve(),
    resolve(),
    commonjs({
      include: /node_modules/
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    minify({ comments: false }),
    filesize(),
  ],
};

export default config;
