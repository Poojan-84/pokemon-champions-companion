# Development Setup Guide (Windows)

This guide assumes zero prior experience. Follow it in order — don't skip steps.

## Status
- [x] Code editor (VS Code) — already installed
- [ ] Git
- [ ] Node.js
- [ ] GitHub account
- [ ] Project scaffolded
- [ ] Vercel account + first deploy

## Step 1: Install Git
Git tracks every change we make to the project so nothing is ever lost, and lets us deploy automatically.

Open **PowerShell** (search "PowerShell" in the Start menu) and run:
```
winget install --id Git.Git -e --source winget
```
Close and reopen PowerShell after it finishes, then verify:
```
git --version
```
You should see something like `git version 2.4x.x`.

## Step 2: Install Node.js
Node.js runs JavaScript outside the browser — it's what powers our build tools and local development server.

In PowerShell:
```
winget install OpenJS.NodeJS.LTS
```
Close and reopen PowerShell, then verify:
```
node --version
npm --version
```

## Step 3: Create a GitHub account
GitHub stores our code online and connects to our hosting provider (Vercel) for automatic deployments.
Go to https://github.com and sign up (free plan is fine).

## Step 4: Configure Git with your identity
In PowerShell:
```
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```
Use the same email as your GitHub account.

## Step 5: VS Code extensions
Open VS Code and install these extensions (Extensions icon in the left sidebar, search by name):
- **ESLint** — catches code mistakes automatically
- **Tailwind CSS IntelliSense** — autocomplete for our styling system
- **GitLens** — makes Git history easier to read (optional but helpful)

## What's next
Once Steps 1–5 are done and verified, tell me and we'll move to Step 6: scaffolding the actual Next.js project and getting a "hello world" version live on the internet.

## Later steps (documented here as we reach them)
- Vercel account + connecting the GitHub repo
- Domain purchase + DNS setup
- Environment variables
- Analytics setup
