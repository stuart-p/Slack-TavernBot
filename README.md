<h1 align="center">Welcome to Slack-Tavern-Bot 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://slack.dev/bolt-js/concepts" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  <a href="https://twitter.com/StuartDPalmer" target="_blank">
    <img alt="Twitter: StuartDPalmer" src="https://badgen.net/badge/icon/twitter?icon=twitter&label" />
  </a>
</p>

> A Slack Bot for suggesting pubs to visit.
> Built with Slack's Bolt Javascript SDK, deployed to AWS Lambda & S3, written in Typescript.

## Install

### 0. Create A Slack App

- Go to https://api.slack.com/apps
- Click **Create App**
- Choose a workspace
- Enter App Manifest using contents of `manifest.yaml`
- Click **Create**

Once the app is created click **Install to Workspace**
Then scroll down in Basic Info and click **Generate Token and Scopes** with both scopes

### 1. Set up environment variables

create a `.env` file in the root directory, and add the following variables:

```zsh
SLACK_BOT_TOKEN=<your-bot-token> # from the OAuth section
SLACK_USER_TOKEN=<your-user-token> # from OAuth section
APP_TOKEN=<your-app-level-token> # from the Basic Info App Token Section
BUCKET_NAME=<your-aws-s3-bucket-name> # choose a uniquely-named storage bucket
```

### 2. Install dependencies

```sh
npm install
```

## Deployment

This project is designed to be deployed to AWS using **Serverless Framework**. For testing it can also be run locally using the _serverless offline_ package

```sh
serverless deploy # Assuming Serverless Framework globally installed, otherwise first run npm -g serverless
```

For offline testing:

```sh
serverless offline
ngrok http 3000 # Assuming ngrok globally installed, otherwise first run npm -g ngrok
```

The Slack app details previously created must then be updated with the deployed endpoint address. Copy the address from the API Gateway address in AWS or the ngrok terminal if deployed locally. Add this address to **Interactivity & Shortcuts** and **Event Subscription** sections within Slack.

## Test

Go to the installed workspace and type **tavern bot** in a DM to your new bot.

## Author

👤 **Stuart Palmer**

- Twitter: [@StuartDPalmer](https://twitter.com/StuartDPalmer)
- Github: [@stuart-p](https://github.com/stuart-p)
- LinkedIn: [@https:\/\/www.linkedin.com\/in\/stuart-palmer-a0686139\/](https://linkedin.com/in/stuart-palmer-a0686139/)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
