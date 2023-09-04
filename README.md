# CompleteAPI-TypeORM

## steps to initialize the project

---

:heavy_check_mark: create the package.json file with `pnpm init`  
:heavy_check_mark: proceed to install the modules with `pnpm add express cors jsonwebtoken bcryptjs zod`  
:heavy_check_mark: proceed to install the typescript dependencies with `pnpm add typescript ts-node-dev @types/express @types/cors @types/jsonwebtoken @types/bcryptjs -D`  
:heavy_check_mark: create the tsconfig with `npx --init`  
:heavy_check_mark: proceed to activate some tsconfig fields  
&nbsp;&nbsp;&nbsp;&nbsp;replace `rootDir:""` with `rootDir:"./src"`  
&nbsp;&nbsp;&nbsp;&nbsp;replace `outDir:""` with `outDir:"./dist"`  
&nbsp;&nbsp;&nbsp;&nbsp;enable `noFallthroughCasesInSwitch:true` prevents us from leaving a switch without return or break  
:heavy_check_mark: configure ts-node-dev in the package.json, for which we add `"dev":"ts-node-dev --respawn src/index.ts"`  
:heavy_check_mark: proceed to install the modules with `pnpm add typeorm reflect-metadata`  
:heavy_check_mark: proceed to install the typescript dependencies with `pnpm add @types/node -D`  
:heavy_check_mark: proceed to install the modules with `pnpm add typeorm reflect-metadata`  
:heavy_check_mark: proceed to install the database driver `pnpm add pg`  
:heavy_check_mark: proceed to enable new configurations in tsconfig as `"experimentalDecorators": true`, `"strictPropertyInitialization": false` and `"emitDecoratorMetadata": true`

[TypeORM](https://typeorm.io/ "TypeORM")  
readme created in: [Editor.md](https://pandao.github.io/editor.md/en.html "Editor.md")
