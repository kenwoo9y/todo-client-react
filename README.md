# todo-client-react

This is a ToDo Web Client built with React, offering a seamless and intuitive user experience.

## Tech Stack
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![React Table](https://img.shields.io/badge/React%20Table-FF4154.svg?style=for-the-badge&logo=React-Table&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4.svg?style=for-the-badge&logo=Axios&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide-F56565.svg?style=for-the-badge&logo=Lucide&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Storybook](https://img.shields.io/badge/-Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Vitest](https://img.shields.io/badge/-Vitest-252529?style=for-the-badge&logo=vitest&logoColor=FCC72B)
![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

### Programming Languages
- [TypeScript](https://www.typescriptlang.org/) - Primary development language

### Frontend
- [React](https://react.dev/) v18.3.1 - JavaScript library for building user interfaces
- [React Router](https://reactrouter.com/) v6.24.1 - Declarative routing for React
- [TanStack Query](https://tanstack.com/query/latest) v5.64.1 - Powerful asynchronous state management
- [TanStack Table](https://tanstack.com/table/latest) v8.20.6 - Headless UI for building tables
- [Axios](https://axios-http.com/) v1.7.2 - Promise based HTTP client
- [Tailwind CSS](https://tailwindcss.com/) v3.4.4 - Utility-first CSS framework
- [React Modal](https://reactcommunity.org/react-modal/) v3.16.1 - Accessible modal dialog component
- [React Burger Menu](https://negomi.github.io/react-burger-menu/) v3.1.0 - Off-canvas sidebar component
- [Lucide React](https://lucide.dev/) v0.400.0 - Beautiful & consistent icon toolkit

### Development Environment
- [Node.js](https://nodejs.org/) v22 - JavaScript runtime environment
- [Yarn](https://yarnpkg.com/) - Node.js package manager
- [Vite](https://vitejs.dev/) v5.3.1 - Next generation frontend build tool
- [Storybook](https://storybook.js.org/) v8.4.7 - Frontend workshop for UI development
- [Docker](https://www.docker.com/) with Compose - Containerization platform for building and managing applications

### Testing & Quality Assurance
- [Vitest](https://vitest.dev/) v2.1.8 - Vite-native unit testing framework
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/) v16.2.0 - Testing utilities for React
- [ESLint](https://eslint.org/) v9.17.0 - JavaScript/TypeScript code quality and style checker
- [Prettier](https://prettier.io/) v3.3.2 - Code formatter
- [TypeScript ESLint](https://typescript-eslint.io/) v7.13.1 - TypeScript specific linting rules

### CI/CD
- GitHub Actions - Continuous Integration and Deployment

## Setup
### Initial Setup
1. Clone this repository:
    ```
    $ git clone https://github.com/kenwoo9y/todo-client-react.git
    $ cd todo-client-react
    ```

2. Build the required Docker images:
    ```
    $ make build-local
    ```

3. Start the containers:
    ```
    $ make up
    ```

## Usage
### Container Management
- Check container status:
    ```
    $ make ps
    ```
- View container logs:
    ```
    $ make logs
    ```
- Stop containers:
    ```
    $ make down
    ```

## Development
### Running Tests
- Run tests:
    ```
    $ make test
    ```
- Run tests with coverage:
    ```
    $ make test-coverage
    ```

### Storybook
- Start the Storybook server:
    ```
    $ make storybook
    ```

### Code Quality Checks
- Lint check:
    ```
    $ make lint-check
    ```
- Apply lint fixes:
    ```
    $ make lint-fix
    ```
- Check code formatting:
    ```
    $ make format-check
    ```
- Apply code formatting:
    ```
    $ make format-fix
    ```

---
## セットアップ
### 初期セットアップ
1. リポジトリをクローン:
    ```
    $ git clone https://github.com/kenwoo9y/todo-client-react.git
    $ cd todo-client-react
    ```

2. 必要なDockerイメージをビルド:
    ```
    $ make build-local
    ```

3. コンテナを起動:
    ```
    $ make up
    ```

## 使用方法
### コンテナ管理
- コンテナの状態を確認:
    ```
    $ make ps
    ```
- コンテナのログを表示:
    ```
    $ make logs
    ```
- コンテナを停止:
    ```
    $ make down
    ```

## 開発
### テストの実行
- テストを実行:
    ```
    $ make test
    ```
- カバレッジ付きでテストを実行:
    ```
    $ make test-coverage
    ```

### Storybook
- Storybookサーバーを起動:
    ```
    $ make storybook
    ```

### コード品質チェック
- リントチェック:
    ```
    $ make lint-check
    ```
- リント修正を適用:
    ```
    $ make lint-fix
    ```
- コードフォーマットをチェック:
    ```
    $ make format-check
    ```
- コードフォーマットを適用:
    ```
    $ make format-fix
    ```
