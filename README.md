# Repository

This repository is maintained by [vcudalb](cudalb.vasile@gmail.com) and licensed under the [MIT License](LICENSE.txt).

# Gaffer Discord Bot

Gaffer is a versatile Discord bot designed to enhance your server's experience through a range of features. 
From interactive music playback to comprehensive game statistics, Gaffer brings utility and entertainment to your Discord community.

## Getting Started

To invite Gaffer to your server, click [here](#).

## Commands

Gaffer supports the following slash commands:

- `/masya`: Displays the time remaining until 23:00, helping users to manage their schedules.
- `/weather`: Provides weather stats for a specific location.
- `/cs-lifetime`: Fetches CS2 lifetime stats for the provided user.
- `/cs-lifetime-map`: Fetches CS2 lifetime stats for the provided user and the specific map.

## Build and Tests

To run Gaffer locally:

1. Clone this repository.
2. Install Node.js and npm if not already installed.
3. In the project folder, run `npm install` to install dependencies.
4. Create a Discord bot in the [Discord Developer Portal](https://discord.com/developers/applications) and retrieve your bot token.
5. Create the `.env` file and add the following key `CLIENT_TOKEN=YOUR_TOKEN_KEY`. 
6. Execute `ts-node src/index.ts` to start the bot.

> [!IMPORTANT]
> Please update the `YOUR_TOKEN_KEY` with corresponding token value from discord developer portal.

## Contribute

Contributions to Gaffer are welcome! If you'd like to contribute:

1. Fork this repository.
2. Create a new branch for your feature: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m "Add some feature"`.
4. Push your changes to your fork: `git push origin feature-name`.
5. Open a pull request to this repository.

Please ensure that your contributions follow the [code of conduct](CODE_OF_CONDUCT.md) and [contribution guidelines](CONTRIBUTING.md).

## Disclaimer
Gaffer discord bot is a third-party application and not affiliated with FACEIT.