# completeAPI-TypeORM

## steps to initialize the project

---

:fa-chevron-circle-right: create the package.json file with `pnpm init`
:fa-chevron-circle-right: proceed to install the modules with `pnpm add express cors jsonwebtoken bcryptjs zod`
:fa-chevron-circle-right: proceed to install the typescript dependencies with `pnpm add typescript ts-node-dev @types/express @types/cors @types/jsonwebtoken @types/bcryptjs -D`
:fa-chevron-circle-right: create the tsconfig with `npx --init`
:fa-chevron-circle-right: proceed to activate some tsconfig fields
&nbsp;&nbsp;&nbsp;&nbsp;replace `rootDir:""` with `rootDir:"./src"`
&nbsp;&nbsp;&nbsp;&nbsp;replace `outDir:""` with `outDir:"./dist"`
&nbsp;&nbsp;&nbsp;&nbsp;enable `noFallthroughCasesInSwitch:true` prevents us from leaving a switch without return or break
:fa-chevron-circle-right: configure ts-node-dev in the package.json, for which we add `"dev":"ts-node-dev --respawn src/index.ts"`
:fa-chevron-circle-right: proceed to install the modules with `pnpm add typeorm reflect-metadata`
:fa-chevron-circle-right: proceed to install the typescript dependencies with `pnpm add @types/node -D`
:fa-chevron-circle-right: proceed to install the modules with `pnpm add typeorm reflect-metadata`
:fa-chevron-circle-right: proceed to install the database driver `pnpm add pg`
:fa-chevron-circle-right: proceed to enable new configurations in tsconfig as `"experimentalDecorators": true`, `"strictPropertyInitialization": false` and `"emitDecoratorMetadata": true`

[TypeORM](https://typeorm.io/ "TypeORM")
readme created in: [Editor.md](https://pandao.github.io/editor.md/en.html "Editor.md")
