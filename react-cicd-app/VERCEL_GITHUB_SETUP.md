# Vercel & GitHub Secrets Setup Guide

## Quick Start (Only Token Required!)

**Only need VERCEL_TOKEN** - Vercel CLI reads project details from `.vercel/project.json`

1. **Link project locally:**
   ```bash
   cd react-cicd-app
   vercel link
   ```
   
2. **Get VERCEL_TOKEN:**
   - Go to [Vercel Account → Tokens](https://vercel.com/account)
   - Click **Create**
   - Copy token

3. **Commit `.vercel/project.json` to GitHub:**
   ```bash
   git add .vercel/project.json
   git commit -m "Link Vercel project"
   git push
   ```

4. **Add to GitHub Secrets:**
   - Settings → Secrets and variables → Actions
   - New secret: `VERCEL_TOKEN` = Your token

5. **Push to main** → Auto-deploys!

---

## Step 1: Get Vercel Tokens & IDs (Detailed)

### 1.1 Get VERCEL_TOKEN

1. Go to [Vercel Account Settings](https://vercel.com/account)
2. Click **Tokens** in the left sidebar
3. Click **Create** button
4. Give it a name: `github-actions`
5. Select scope as needed (recommend "Full Account")
6. Click **Create**
7. **Copy the token** (you won't see it again!)

```
VERCEL_TOKEN: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 1.2 Get VERCEL_ORG_ID

#### For Personal Account:

1. Go to [Vercel Account Settings](https://vercel.com/account)
2. Look for **ID** or **User ID** field
3. Copy your personal account ID

```
VERCEL_ORG_ID: xxxxxxxxxxxxxxxx (your personal account ID)
```

#### For Team/Organization Account:

1. Go to [Vercel Team Settings](https://vercel.com/account/team)
2. Find **Team ID**
3. Copy the ID

#### Best Method (Works for Both):

After linking project to Vercel, check `.vercel/project.json` file:
```json
{
  "orgId": "xxxxxxxxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxxxx"
}
```
- The `orgId` field is your **VERCEL_ORG_ID**

### 1.3 Get VERCEL_PROJECT_ID

1. Link your project to Vercel first:
   ```bash
   npm i -g vercel
   vercel link
   ```
2. After linking, check `.vercel/project.json`:
   ```json
   {
     "orgId": "xxxxxxxxxxxxxxxx",
     "projectId": "prj_xxxxxxxxxxxx"
   }
   ```
3. Copy the `projectId` value

```
VERCEL_PROJECT_ID: prj_xxxxxxxxxxxx
```

---

## Step 2: Add Secrets to GitHub

### 2.1 Go to Repository Settings

1. Go to your GitHub repository
2. Click **Settings** (top right)
3. In left sidebar, click **Secrets and variables** → **Actions**

### 2.2 Add VERCEL_TOKEN

1. Click **New repository secret**
2. **Name**: `VERCEL_TOKEN`
3. **Value**: Paste your Vercel token from Step 1.1
4. Click **Add secret**

### 2.3 Add VERCEL_ORG_ID

1. Click **New repository secret**
2. **Name**: `VERCEL_ORG_ID`
3. **Value**: Paste your Organization ID from Step 1.2
4. Click **Add secret**

### 2.4 Add VERCEL_PROJECT_ID

1. Click **New repository secret**
2. **Name**: `VERCEL_PROJECT_ID`
3. **Value**: Paste your Project ID from Step 1.3
4. Click **Add secret**

---

## Step 3: Verify Setup

### Check GitHub Secrets

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. You should see all 3 secrets:
   - ✅ VERCEL_TOKEN
   - ✅ VERCEL_ORG_ID
   - ✅ VERCEL_PROJECT_ID

### Test the Pipeline

1. Push code to `main` branch:
   ```bash
   git add .
   git commit -m "Setup Vercel deployment"
   git push origin main
   ```

2. Go to **Actions** tab in GitHub
3. Watch the workflow run:
   - ✅ Test stage
   - ✅ Build stage
   - ✅ Deploy stage (should deploy to Vercel)

4. Check Vercel dashboard to confirm deployment

---

## Troubleshooting

### Deployment fails with "Invalid token"
- ❌ VERCEL_TOKEN is incorrect or expired
- ✅ Solution: Regenerate token in Vercel and update GitHub secret

### Deployment fails with "Project not found"
- ❌ VERCEL_PROJECT_ID is incorrect
- ✅ Solution: Check `.vercel/project.json` or link project again with `vercel link`

### Deployment fails with "Invalid org ID"
- ❌ VERCEL_ORG_ID is incorrect
- ✅ Solution: Verify ID from Vercel team settings

### Deployment fails with "Permission denied"
- ❌ Token doesn't have deployment permissions
- ✅ Solution: Regenerate token with full account scope

---

## Quick Reference

| Secret Name | Where to Find | Format |
|---|---|---|
| `VERCEL_TOKEN` | Vercel Settings → Tokens | Long alphanumeric string |
| `VERCEL_ORG_ID` | `.vercel/project.json` or Team Settings | Alphanumeric (e.g., `team_xxx`) |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` | Starts with `prj_` |

---

## Important Notes

⚠️ **Never commit secrets to GitHub**
- Keep `.env.local` and `.env` files in `.gitignore`
- Always use GitHub Secrets for sensitive data

⚠️ **Token Security**
- Treat VERCEL_TOKEN like a password
- Don't share it or commit it
- Regenerate if compromised

⚠️ **After First Deploy**
- Vercel automatically generates `.vercel/project.json`
- Never commit this to public repos (contains sensitive info)
- Add to `.gitignore`: `.vercel/`
