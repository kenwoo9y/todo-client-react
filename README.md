# todo-client-react

## セットアップ
### 必要なツール
- Docker & Docker Compose
- Node.js v22
- `make` command

### 初期設定
1. リポジトリをクローンする。
    ```
    $ git clone https://github.com/kenwoo9y/todo-client-react.git
    $ cd todo-client-react
    ```

2. 必要なDockerイメージをビルドする。
    ```
    $ make build-local
    ```

3. コンテナを起動する。
    ```
    $ make up
    ```

## 使用方法
### コンテナ管理
- コンテナの状態確認:
    ```
    $ make ps
    ```
- コンテナログの確認:
    ```
    $ make logs
    ```
- コンテナ停止:
    ```
    $ make down
    ```

## 開発
### テストの実行
- テスト実行:
    ```
    $ make test
    ```
- テストカバレッジ:
    ```
    $ make test-coverage

### Storybook
- Storybookサーバーの起動:
    ```
    $ make storybook
    ```

### コード品質チェック
- Lintチェック:
    ```
    $ make lint-check
    ```
- Lint修正:
    ```
    $ make lint-fix
    ```
- フォーマットチェック:
    ```
    $ make format-check
    ```
- フォーマット修正:
    ```
    $ make format-fix
    ```

---
This is a ToDo Web Client built with React, offering a seamless and intuitive user experience.

## Setup
### Setup
- Docker & Docker Compose
- Node.js v22
- `make` command

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