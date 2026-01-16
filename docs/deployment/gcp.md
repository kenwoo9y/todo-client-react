# Google Cloud Deployment Guide

This document explains how to deploy a React application to Google Cloud.

## Table of Contents

1. [GitHub Secrets Configuration](#github-secrets-configuration)
2. [Deployment Steps](#deployment-steps)

## GitHub Secrets Configuration

To deploy to Google Cloud from GitHub Actions, you need to configure the following secrets.

### Required Secrets

Configure the following secrets for each environment (dev, stg, prod):

1. **`GCP_PROJECT_ID`**: Google Cloud Project ID
   - Obtain from Google Cloud Console → "IAM & Admin" → "Settings"
   - Example: `my-project-id`

2. **`GCS_BUCKET_NAME`**: Cloud Storage bucket name
   - Cloud Storage bucket name for static site hosting
   - Example: `todo-client-dev`, `todo-client-stg`, `todo-client-prod`

3. **`WIF_PROVIDER`**: Workload Identity Federation Provider
   - Format: `projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_NAME/providers/PROVIDER_NAME`
   - Obtain from Google Cloud Console → "IAM & Admin" → "Workload Identity Federation"

4. **`WIF_SERVICE_ACCOUNT`**: Workload Identity Federation Service Account
   - Format: `SERVICE_ACCOUNT_EMAIL@PROJECT_ID.iam.gserviceaccount.com`
   - Obtain from Google Cloud Console → "IAM & Admin" → "Service Accounts"

5. **`VITE_API_URL`**: Backend API URL (environment variable embedded at build time)
   - Backend API URL for each environment
   - Example: `https://todo-api-dev-xxxxx.run.app`, `https://todo-api-stg-xxxxx.run.app`, `https://todo-api-prod-xxxxx.run.app`

### How to Configure Secrets

1. Navigate to GitHub repository → "Settings" → "Secrets and variables" → "Actions"
2. Click "New repository secret"
3. Create the following secrets for each environment:
   - For `dev` environment: `GCP_PROJECT_ID`, `GCS_BUCKET_NAME`, `WIF_PROVIDER`, `WIF_SERVICE_ACCOUNT`, `VITE_API_URL`
   - For `stg` environment: Same secrets as dev (with appropriate values for staging)
   - For `prod` environment: Same secrets as dev (with appropriate values for production)

**Note**: Some secrets like `GCP_PROJECT_ID`, `WIF_PROVIDER`, and `WIF_SERVICE_ACCOUNT` may be shared across environments, while others like `GCS_BUCKET_NAME` and `VITE_API_URL` should be environment-specific.

## Deployment Steps

**Workflow File**: `.github/workflows/deploy-gcp.yml`

### Automatic Deployment via Branch Push

Pushing to the following branches will automatically trigger deployments:

- `dev` branch → deploys to dev environment
- `stg` branch → deploys to stg environment
- `main` branch → deploys to prod environment

The workflow is triggered by the `push` event on these branches.

### Manual Deployment (GitHub Actions)

1. Navigate to GitHub repository → "Actions" tab
2. Select the "Deploy to Google Cloud" workflow
3. Click "Run workflow"
4. Select the environment to deploy (dev, stg, prod)
5. Click "Run workflow" button

**Note**: The Cloud Storage bucket must be configured for static site hosting. If Cloud CDN is configured, the cache will be automatically invalidated after deployment.

---
このドキュメントでは、ReactアプリケーションをGoogle Cloudにデプロイする方法について説明する。

## 目次

1. [GitHub Secrets の設定](#github-secrets-の設定)
2. [デプロイメント手順](#デプロイメント手順)

## GitHub Secrets の設定

GitHub ActionsからGoogle Cloudにデプロイするには、以下のシークレットを設定する必要がある。

### 必要なシークレット

各環境（dev、stg、prod）に対して以下のシークレットを設定する：

1. **`GCP_PROJECT_ID`**: Google Cloud プロジェクトID
   - Google Cloud Console → 「IAM & Admin」→ 「設定」から取得
   - 例: `my-project-id`

2. **`GCS_BUCKET_NAME`**: Cloud Storage バケット名
   - 静的サイトホスティング用のCloud Storageバケット名
   - 例: `todo-client-dev`、`todo-client-stg`、`todo-client-prod`

3. **`WIF_PROVIDER`**: Workload Identity Federation プロバイダー
   - 形式: `projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_NAME/providers/PROVIDER_NAME`
   - Google Cloud Console → 「IAM & Admin」→ 「Workload Identity Federation」から取得

4. **`WIF_SERVICE_ACCOUNT`**: Workload Identity Federation サービスアカウント
   - 形式: `SERVICE_ACCOUNT_EMAIL@PROJECT_ID.iam.gserviceaccount.com`
   - Google Cloud Console → 「IAM & Admin」→ 「サービスアカウント」から取得

5. **`VITE_API_URL`**: バックエンドAPI URL（ビルド時に埋め込まれる環境変数）
   - 各環境のバックエンドAPI URL
   - 例: `https://todo-api-dev-xxxxx.run.app`、`https://todo-api-stg-xxxxx.run.app`、`https://todo-api-prod-xxxxx.run.app`

### シークレットの設定方法

1. GitHubリポジトリ → 「Settings」→ 「Secrets and variables」→ 「Actions」に移動
2. 「New repository secret」をクリック
3. 各環境に対して以下のシークレットを作成：
   - `dev`環境: `GCP_PROJECT_ID`、`GCS_BUCKET_NAME`、`WIF_PROVIDER`、`WIF_SERVICE_ACCOUNT`、`VITE_API_URL`
   - `stg`環境: devと同じシークレット（ステージング環境に適した値）
   - `prod`環境: devと同じシークレット（本番環境に適した値）

**注意**: `GCP_PROJECT_ID`、`WIF_PROVIDER`、`WIF_SERVICE_ACCOUNT`などの一部のシークレットは環境間で共有される場合があるが、`GCS_BUCKET_NAME`や`VITE_API_URL`などは環境ごとに異なる値を設定する必要がある。

## デプロイメント手順

**ワークフローファイル**: `.github/workflows/deploy-gcp.yml`

### ブランチプッシュによる自動デプロイメント

以下のブランチにプッシュすると、自動的にデプロイメントがトリガーされる：

- `dev`ブランチ → dev環境にデプロイ
- `stg`ブランチ → stg環境にデプロイ
- `main`ブランチ → prod環境にデプロイ

これらのブランチでの`push`イベントによってワークフローがトリガーされる。

### 手動デプロイメント（GitHub Actions）

1. GitHubリポジトリ → 「Actions」タブに移動
2. 「Deploy to Google Cloud」ワークフローを選択
3. 「Run workflow」をクリック
4. デプロイする環境（dev、stg、prod）を選択
5. 「Run workflow」ボタンをクリック

**注意**: Cloud Storageバケットは静的サイトホスティング用に設定されている必要がある。Cloud CDNが設定されている場合、デプロイメント後にキャッシュが自動的に無効化される。
