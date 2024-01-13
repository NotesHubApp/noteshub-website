---
description: The tutorial on how to self-host your notes in Git and access them from the internet with NotesHub
postedOn: 01/22/2024
published: true
image: .attachments/selfhosting-hero.webp
---

In this tutorial we will learn how to self-host your notes in Git on home server and access them with [NotesHub](/) from the internet completely for free!

I would like to start with answering question why you may want this.

As a home server we'll be using [Orange Pi](http://www.orangepi.org) with Ubuntu installed, but any single board computer ([Raspberry Pi](https://www.raspberrypi.com), etc) or Debian-based Linux server should work. Depending on your specific setup some commands may very.

## Setup Git server
In our setup we will use [Gitea](https://about.gitea.com) as it's very popular open-source solution for self-hosting a Git server and it will be very familiar for GitHub users.

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

```sql
\password gitea
```
You will be asked to enter a password. Keep it for future reference.

Create a new database for Gitea:

```sql
CREATE DATABASE gitea OWNER gitea;
```

Exit the PostgreSQL terminal: `\q`

### Install Git

Check that Git is installed on the server. If it is not, install it first. Gitea requires Git version >= 2.0.

```sh
sudo apt install git
```

### Install Gitea

First we start by creating a new user under which we will run the Gitea service. Use `–disabled-login` as we don't want to use it for login into our server. Use `–gecos` to allow us to set a name for the user, _git_.

```sh
sudo adduser --disabled-login --gecos 'Git Version Control' git
```

Switch to the newly created user:

```sh
sudo su git
```

Change to the home directory of user _git_ and create a new directory where we will store the Gitea binaries. We also switch to the new directory.

```sh
cd ~
mkdir gitea
cd gitea
```

Now we need to download the correct Gitea binaries. First go to https://dl.gitea.io/gitea/ and pick the latest version, than find the file with the `-linux-arm64` ending, since our home server is Linux-based with the processor on ARM architecture. Copy the link of the actual file, and in the command below replace `GITEA_BINARY_URL` with that url.

```sh
wget GITEA_BINARY_URL -O gitea
```

To be able to run it as a service, we first need to give execution rights to the file for the user _gitea_.
Finally we exit from user _gitea_

```sh
chmod +x gitea
exit
```

Now we need to make sure that Gitea will be automatically launched at startup and we can also easily stop and start the service.
Let's create a service file with the following command:

```sh
sudo nano /etc/systemd/system/gitea.service
```

Copy the following content to the file:

```ini
[Unit]
Description=Gitea (Git with a cup of tea)
After=syslog.target
After=network.target

[Service]
# Modify these two values ​​and uncomment them if you have
# repos with lots of files and get to HTTP error 500 because of that
###
# LimitMEMLOCK=infinity
# LimitNOFILE=65535
RestartSec=2s
Type=simple
User=git
Group=git
WorkingDirectory=/home/git/gitea
ExecStart=/home/git/gitea/gitea web
Restart=always
Environment=USER=git
HOME=/home/git

[Install]
WantedBy=multi-user.target
```

Save the file with `Ctrl+X` followed by y and then enter.

If everything is correct we should now be able to enable and finally start our service:

```sh
sudo systemctl enable gitea.service
sudo systemctl start gitea.service
```

### Configure Gitea

Now that we have installed Gitea we can proceed with the configuration part.
Navigate in the browser to the following URL `http://localhost:3000` from our home server and you should be greeted with the Gitea _Initial Configuration_ screen.

## Expose Git server to the Internet

### IP reservation & port forwarding
The local IP address changes automatically by router when we connect/disconnect from the network and in some other circumstances.
That is way it's important to make sure that our home server will keep his local IP address.

### DDNS

### Reverse proxy & SSL certificate

## Access notes with NotesHub
