---
description: The tutorial on how to self-host your notes in Git and access them from the internet with NotesHub
postedOn: 01/22/2024
published: true
image: .attachments/selfhosting-hero.webp
---

In this tutorial we will learn how to self-host your notes in Git on home server and access them with **NotesHub** from the internet.
As a home server we'll be using [Orange Pi](http://www.orangepi.org) with Ubuntu installed, but any single board computer or Debian-based Linux server should work.

## Setup Git server
[Gitea](https://about.gitea.com) is very popular open-source solution for self-hosting a Git server.

### Install a database

You need a database to use Gitea. Gitea supports PostgreSQL (>= 12), MySQL (>= 8.0), MariaDB (>= 10.4), SQLite (builtin), and MSSQL (>= 2012 SP4). For this installation we will use PostgreSQL.

Install PostgreSQL by using the following command:

```sh
sudo apt install postgresql
```

Open PostgreSQL terminal to create a user for Gitea.

```sh
sudo -u postgres psql -d template1
```

```sql
CREATE USER gitea CREATEDB;
```

To set the password for user _gitea_, type:

```sh
\password gitea
```
You will be asked to enter a password. Keep it for future reference.

Create a new database for Gitea:

```sql
CREATE DATABASE gitea OWNER gitea;
```

Exit the PostgreSQL terminal: `\q`


### Install Gitea

## Setup acccess from the internet

## Connect notes to NotesHub
