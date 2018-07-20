import babel from 'rollup-plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import localResolve from 'rollup-plugin-local-resolve';
import replace from "rollup-plugin-replace";

import pkg from './package.json';

const config = {
  input: 'src/index.js',
  output: [
    {
      file: pkg['umd:main'],
      format: 'umd',
      name: 'ReactScriptTag',
      globals: {
        react: 'React'
      }
    },
    {
      file: pkg.main,
      format: 'cjs',
      name: 'ReactScriptTag',
      globals: {
        react: 'React'
      }
    },
    {
      file: pkg.module,
      format: 'es',
      globals: {
        react: 'React'
      }
    },
  ],
  external: [
    'react',
    'react-dom',
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
    filesize(),
  ],
};

export default config;
