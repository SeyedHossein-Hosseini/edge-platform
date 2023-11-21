# Webpack + Typescript + SCSS + React
Front-end starter kit with tools for development:

- webpack as module bundler
- react library with typescript
- redux for managing application state
- sass as css preprocessor
- style components
- jest library as Test Library
- eslint as linter package
- spriteS-svg generator
- browserSync

## Setup

Clone the repository and apply these changes to the files listed below:

1. environments/environment.ts:  
Change  lines 3,4,5  
apiAddress: 'http://172.18.12.109:8000/',  
socketAddress: 'ws://172.18.12.109:8000/ws/',  
UploadsBasePath: 'http://172.18.12.109:8000',  
to  
apiAddress: 'http://[your_local_ip]:8000/',  
socketAddress: 'ws://[your_local_ip]:8000/ws/',  
UploadsBasePath: 'http://[your_local_ip]:8000',  

2. src/pages/dashboard/add-user/add-user-face-authorization.tsx:
Change line 218  
`window.open('http://172.18.12.109:8000' + item['face_image'], '_blank', 'noopener,noreferrer,');`  
to  
`window.open('http://[your_local_ip]:8000' + item['face_image'], '_blank', 'noopener,noreferrer,');`

3. src/pages/dashboard/add-user/add-user-face-authorization.tsx
Change line 264  
`}]) } src={'http://127.0.0.1:8000' + face['face_image']} alt={Image #${index+1}}`  
to  
`}]) } src={'http://[your_local_ip]:8000' + face['face_image']} alt={Image #${index+1}}`

4. src/pages/dashboard/entrance-history/entrance-history.tsx
Change line 227  
`avatar={'http://127.0.0.1:8000' + item['log']['employee']['avatar']}`  
to  
`avatar={'http://[your_local_ip]:8000' + item['log']['employee']['avatar']}`

5. src/pages/dashboard/entrance/entrance.tsx
Change line 227  
`avatarURL={'http://127.0.0.1:8000' + personnelObject[item]['avatarURL']}`  
to  
`avatarURL={'http://[your_local_ip]:8000' + personnelObject[item]['avatarURL']}`


## Usage
Minimum node version: 14

1. First clone the project:
```
git https://git.dibarayan.ir/ghadirrnd/biometric-authentication/sentelligence/edge-platform-cra.git
```
2. Install dependencies:
```
yarn
```
3. For development run development task:
```
yarn start
```
By default, some sample code is available in starter kit to demonstrate how things work. You need to remove them manually before starting your own project.

## Tasks
```
yarn run start => start webpack dev server for development
yarn run clean => clean previously generated 'build' folder
yarn run mono-icon => generate SpriteSvg File in public folder for mono icons
yarn run color-icon => generate SpriteSvg File in public folder for colorful icons
yarn run jest-test => run test task and generate coverage folder
yarn run jest-test:watch => run test task and watch all tests
yarn run lint => check eslint rules base on .eslintrc.js
```
## Build
Run `yarn run build` to build the project. The build artifacts will be stored in the `build/` directory.

## Running unit tests
Run `yarn run jest-test` to execute the unit tests via [Jest](https://jestjs.io/). \
and also Run `yarn run jest-test:watch` and check you test on development mode.

## Running Linter
Run `yarn run link` to check the linter rules via [esLint](https://eslint.org/).

## License
MIT, see [LICENSE.md](https://github.com/garousianstudio/starter-webpack-react-es6-sass/blob/master/LICENSE) for details.
