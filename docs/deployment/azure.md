# Microsoft Azure Deployment Guide

This document explains how to deploy a React application to Microsoft Azure.

## Table of Contents

1. [GitHub Secrets Configuration](#github-secrets-configuration)
2. [Deployment Steps](#deployment-steps)

## GitHub Secrets Configuration

To deploy to Microsoft Azure from GitHub Actions, you need to configure the following secrets.

### Required Secrets

Configure the following secrets for each environment (dev, stg, prod):

1. **`AZURE_CLIENT_ID`**: Azure Service Principal Client ID
   - Obtain from Azure Portal → "Azure Active Directory" → "App registrations" → Select your app → "Overview"
   - Example: `12345678-1234-1234-1234-123456789abc`

2. **`AZURE_TENANT_ID`**: Azure Active Directory Tenant ID
   - Obtain from Azure Portal → "Azure Active Directory" → "Overview"
   - Example: `87654321-4321-4321-4321-cba987654321`

3. **`AZURE_SUBSCRIPTION_ID`**: Azure Subscription ID
   - Obtain from Azure Portal → "Subscriptions" → Select your subscription → "Overview"
   - Example: `abcdef12-3456-7890-abcd-ef1234567890`

4. **`AZURE_STORAGE_ACCOUNT_NAME`**: Azure Storage Account name
   - Storage account name for static site hosting
   - Example: `todoclientdev`, `todoclientstg`, `todoclientprod`
   - Must be globally unique and lowercase alphanumeric characters only

5. **`AZURE_STORAGE_CONTAINER_NAME`**: Azure Storage Container name
   - Container name within the storage account (typically `$web` for static website hosting)
   - Example: `$web`

6. **`VITE_API_URL`**: Backend API URL (environment variable embedded at build time)
   - Backend API URL for each environment
   - Example: `https://todo-api-dev.{region}.azurecontainerapps.io`, `https://todo-api-stg.{region}.azurecontainerapps.io`, `https://todo-api-prod.{region}.azurecontainerapps.io`

### How to Configure Secrets

1. Navigate to GitHub repository → "Settings" → "Secrets and variables" → "Actions"
2. Click "New repository secret"
3. Create the following secrets for each environment:
   - For `dev` environment: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`, `AZURE_STORAGE_ACCOUNT_NAME`, `AZURE_STORAGE_CONTAINER_NAME`, `VITE_API_URL`
   - For `stg` environment: Same secrets as dev (with appropriate values for staging)
   - For `prod` environment: Same secrets as dev (with appropriate values for production)

**Note**: Some secrets like `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_SUBSCRIPTION_ID` may be shared across environments, while others like `AZURE_STORAGE_ACCOUNT_NAME` and `VITE_API_URL` should be environment-specific.

## Deployment Steps

**Workflow File**: `.github/workflows/deploy-azure.yml`

### Automatic Deployment via Branch Push

Pushing to the following branches will automatically trigger deployments:

- `dev` branch → deploys to dev environment
- `stg` branch → deploys to stg environment
- `main` branch → deploys to prod environment

The workflow is triggered by the `push` event on these branches.

### Manual Deployment (GitHub Actions)

1. Navigate to GitHub repository → "Actions" tab
2. Select the "Deploy to Microsoft Azure" workflow
3. Click "Run workflow"
4. Select the environment to deploy (dev, stg, prod)
5. Click "Run workflow" button

**Note**: The Azure Storage account must be configured for static website hosting. After deployment, your application will be accessible via the static website endpoint URL (e.g., `https://{STORAGE_ACCOUNT_NAME}.z13.web.core.windows.net`).

---
このドキュメントでは、ReactアプリケーションをMicrosoft Azureにデプロイする方法について説明する。

## 目次

1. [GitHub Secrets の設定](#github-secrets-の設定)
2. [デプロイメント手順](#デプロイメント手順)

## GitHub Secrets の設定

GitHub ActionsからMicrosoft Azureにデプロイするには、以下のシークレットを設定する必要がある。

### 必要なシークレット

各環境（dev、stg、prod）に対して以下のシークレットを設定する：

1. **`AZURE_CLIENT_ID`**: Azure Service Principal クライアントID
   - Azure Portal → 「Azure Active Directory」→ 「アプリの登録」→ アプリを選択 → 「概要」から取得
   - 例: `12345678-1234-1234-1234-123456789abc`

2. **`AZURE_TENANT_ID`**: Azure Active Directory テナントID
   - Azure Portal → 「Azure Active Directory」→ 「概要」から取得
   - 例: `87654321-4321-4321-4321-cba987654321`

3. **`AZURE_SUBSCRIPTION_ID`**: Azure サブスクリプションID
   - Azure Portal → 「サブスクリプション」→ サブスクリプションを選択 → 「概要」から取得
   - 例: `abcdef12-3456-7890-abcd-ef1234567890`

4. **`AZURE_STORAGE_ACCOUNT_NAME`**: Azure Storage アカウント名
   - 静的サイトホスティング用のストレージアカウント名
   - 例: `todoclientdev`、`todoclientstg`、`todoclientprod`
   - グローバルに一意で、小文字の英数字のみである必要があります

5. **`AZURE_STORAGE_CONTAINER_NAME`**: Azure Storage コンテナ名
   - ストレージアカウント内のコンテナ名（静的ウェブサイトホスティングの場合は通常 `$web`）
   - 例: `$web`

6. **`VITE_API_URL`**: バックエンドAPI URL（ビルド時に埋め込まれる環境変数）
   - 各環境のバックエンドAPI URL
   - 例: `https://todo-api-dev.{region}.azurecontainerapps.io`、`https://todo-api-stg.{region}.azurecontainerapps.io`、`https://todo-api-prod.{region}.azurecontainerapps.io`

### シークレットの設定方法

1. GitHubリポジトリ → 「Settings」→ 「Secrets and variables」→ 「Actions」に移動
2. 「New repository secret」をクリック
3. 各環境に対して以下のシークレットを作成：
   - `dev`環境: `AZURE_CLIENT_ID`、`AZURE_TENANT_ID`、`AZURE_SUBSCRIPTION_ID`、`AZURE_STORAGE_ACCOUNT_NAME`、`AZURE_STORAGE_CONTAINER_NAME`、`VITE_API_URL`
   - `stg`環境: devと同じシークレット（ステージング環境に適した値）
   - `prod`環境: devと同じシークレット（本番環境に適した値）

**注意**: `AZURE_CLIENT_ID`、`AZURE_TENANT_ID`、`AZURE_SUBSCRIPTION_ID`などの一部のシークレットは環境間で共有される場合があるが、`AZURE_STORAGE_ACCOUNT_NAME`や`VITE_API_URL`などは環境ごとに異なる値を設定する必要がある。

## デプロイメント手順

**ワークフローファイル**: `.github/workflows/deploy-azure.yml`

### ブランチプッシュによる自動デプロイメント

以下のブランチにプッシュすると、自動的にデプロイメントがトリガーされる：

- `dev`ブランチ → dev環境にデプロイ
- `stg`ブランチ → stg環境にデプロイ
- `main`ブランチ → prod環境にデプロイ

これらのブランチでの`push`イベントによってワークフローがトリガーされる。

### 手動デプロイメント（GitHub Actions）

1. GitHubリポジトリ → 「Actions」タブに移動
2. 「Deploy to Microsoft Azure」ワークフローを選択
3. 「Run workflow」をクリック
4. デプロイする環境（dev、stg、prod）を選択
5. 「Run workflow」ボタンをクリック

**注意**: Azure Storageアカウントは静的ウェブサイトホスティング用に設定されている必要がある。デプロイメント後、アプリケーションは静的ウェブサイトエンドポイントURL（例: `https://{STORAGE_ACCOUNT_NAME}.z13.web.core.windows.net`）からアクセス可能になる。
