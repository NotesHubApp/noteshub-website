---
description: The tutorial on how to self-host your notes in Git on a home server and access them from the internet
postedOn: 01/22/2024
published: true
image: .attachments/selfhosting-hero.webp
---

In this tutorial we will learn how to self-host your notes in Git on home server and access them with **NotesHub** from the internet.
For home server setup I'll be using Orange Pi with Ubuntu installed, but any single board computer or Linux (Debian-based) server should work.

## Setup Git server
[Gitea](https://about.gitea.com) is very popular open-source solution for self-hosting a Git server.

### Install a database

You need a database to use Gitea. Gitea supports:
- PostgreSQL (>= 12)
- MySQL (>= 8.0)
- MariaDB (>= 10.4)
- SQLite (builtin)
- MSSQL (>= 2012 SP4).

For this installation we will use PostgreSQL.

Install PostgreSQL by using the following command:

```sh
sudo apt install postgresql
```

### Install Gitea

## Setup acccess from the internet

## Connect notes to NotesHub
