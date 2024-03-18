import {defineConfig} from "vite"

export default defineConfig(() => {
  return {
    root: "./src",
    build: {
      lib :{
        entry: {
          'react-jwt': './src/index.ts'
        },
        name: "react-jwt",
      },
      rollupOptions: {
        input: {
          "react-jwt": "./src/index.ts"
        }
      }
    }
  }
})