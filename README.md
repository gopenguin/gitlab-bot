# Gitlab Bot

Der Gitlab Bot soll triviale Aufgaben, die bei der Projektverwaltung in Gitlab anfallen, automatisieren. Als Vorbild
soll an dieser Stelle [ProBot](https://github.com/probot/probot) dienen, der ein modulares System bereitstellt, mit dem
Plugins zur automatisierung von Aufgaben auf Github entwickelt werden können.

## Install

```
$ npm install --save gitlab-bot my-awesome-gitlab-bot-plugin and-another-one
```

## Usage

```json
{
	"name": "my-gitlab-bot-project",
	"version": "1.0.0",
	"gitlab-bot": {
		"plugins": [
		    "my-awesome-gitlab-bot-plugin",
		    "and-another-one"
		]
	}
}
```

## Implementierung

[x] vorbereiten der Infrastruktur: Eintragen des Servers für Events im Gitlab; minimaler Webserver zum Testen, ob die Requests ankommen

[x] Parsen der Events und definieren der Eventschnittstelle; erstes kleines, noch nicht ausgelagertes Plugin

[x] Umsetzen der Pluginstruktur ähnlich wie in Probot

[ ] Umwandeln des ersten "Plugins" in ein "richtiges" Plugin
