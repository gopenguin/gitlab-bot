# Gitlab Bot

The purpose of the gitlab bot is to automate trivial tasks in project management using gitlab. This project is heavily inspired by [ProBot](https://github.com/probot/probot).

At the hart of this bot is a plugin system. This can be used to register actions which should be triggered by certain events e.g. creating an issue.

## Install

```
$ npm install --save gitlab-bot my-awesome-gitlab-bot-plugin and-another-one
```

## Usage

After installing the plugins and gitlab bot itself, you need to tell the bot which plugins to load via the package.json.

```json
{
	"name": "my-gitlab-bot-project",
	"version": "1.0.0",
	...
	"gitlab-bot": {
		"plugins": [
		    "my-awesome-gitlab-bot-plugin",
		    "and-another-one"
		]
	}
}
```

## Development

For a development evnironment see [SETUP.md](SETUP.md).

## Implementierung --- Just some notes of the developers

[x] vorbereiten der Infrastruktur: Eintragen des Servers für Events im Gitlab; minimaler Webserver zum Testen, ob die Requests ankommen

[x] Parsen der Events und definieren der Eventschnittstelle; erstes kleines, noch nicht ausgelagertes Plugin

[x] Umsetzen der Pluginstruktur ähnlich wie in Probot

[ ] Umwandeln des ersten "Plugins" in ein "richtiges" Plugin
