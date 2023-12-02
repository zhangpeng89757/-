
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from "path";
import copyPlugin from 'rollup-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    copyPlugin({
      targets: [{ src: 'static',dest: 'dist/static' }], // 将文件复制到 dist/healthcheck, vite会自动复制到dist目录
    }),
  ],
  
  // ↓解析配置
  resolve: {

    // ↓路径别名
    alias: {
      "@": resolve(__dirname, "./src")
    },
    extensions:['.mjs','.js','.ts','.jsx','.tsx','.json'] 
  },
  css: {
    preprocessorOptions: {
      less: {
        math: "always", // 括号内才使用数学计算
        globalVars: {
          // 全局变量
          mainColor: "red",
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
  }
})