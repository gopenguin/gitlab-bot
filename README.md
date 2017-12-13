Gitlab Bot
==========

Der Gitlab Bot soll triviale Aufgaben, die bei der Projektverwaltung in Gitlab anfallen, automatisieren. Als Vorbild soll an dieser Stelle [ProBot](https://github.com/probot/probot) dienen, der ein modulares System bereitstellt, mit dem Plugins zur automatisierung von Aufgaben auf Github entwickelt werden können.

Implementierung
---------------

[x] vorbereiten der Infrastruktur: Eintragen des Servers für Events im Gitlab; minimaler Webserver zum Testen, ob die Requests ankommen

[x] Parsen der Events und definieren der Eventschnittstelle; erstes kleines, noch nicht ausgelagertes Plugin

[ ] Umsetzen der Pluginstruktur ähnlich wie in Probot

[ ] Umwandeln des ersten "Plugins" in ein "richtiges" Plugin
