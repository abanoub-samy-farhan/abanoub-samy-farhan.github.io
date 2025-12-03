---
title: Why I don't save passwords on browsers anymore
description: A personal account of my decision to stop using browser-based password managers and build my own password manager.
date: 2025-08-01
tags:
  - security
  - tools
  - password-manager
duration: 5 min
---
Since a while ago I saw a lot of problems with the browsers' system of saving passwords for you; undeniably, it's a no-brainer action for a lot of people to save their passwords directly on the browsers because it is easy to access and it's taking away much more time and effort of managing and remembering which password is used for what. However, it comes with a lot of problems because passwords on browsers can be easily misused if anyone could access your sessions or physically have access to your laptop.

That's why I made this article to talk about a tool that I have made using Go and Redis for managing passwords for you locally, easily and most importantly, in a very secure way. *(it's not marketing for my product; it's really good actually.)*

## The Idea Behind `safe-pass`

I have read some articles about cryptography and encryption schemes and I got interested in the idea of implementing something to use these algorithms, and that's how the idea **safe-pass** emerged.

`safe-pass` is a CLI tool that does all the basic CRUD operations for storing the passwords (adding, deleting, editing, and copying), all with secure tunnels of encryption using **AES symmetric encryption** for doing this task (The algorithm of AES is fascinating if you want to take a shot; listen to a video as a starter). Examples and cases are all well-documented in the `README.md` file.

## Master Key

All the system is locked using a **Master Key** which is the only password you have to remember (hopefully you are not saving this in the browser). However, if you forget the password for any reason, you only have to run the command in the root mode for a reset and you will be fine.

## Backup & Restore

`safe-pass` has a command for backing the system to take snapshots, as simple as this:

```bash
$ safe-pass backup
Backup is created at: /home/abanoub-aziz/.config/safe-pass/safe-pass-2025-08-21:16:52:12.bin
```

All the passwords/tokens/keys are backed up in a JSON format, encrypted in a snapshot file, and then compressed using Gzip.
This gives you a solid file you can store anywhere without worrying about data exposure.

Restoring a snapshot is also simple:

```bash
$ safe-pass restore
Enter your Master passkey:
Search: █
? Select a backup file to restore: :
    .env
  ▸ safe-pass-2025-08-21:16:19:01.bin.gz
    safe-pass-2025-08-21:16:52:12.bin.gz
```

For each duplicate entry, the system asks you whether to overwrite or not.

## Compared to Browsers

Some people might find this not useful because it takes time to back things up and get your data back, compared to browser saving in one click.

Undeniably browser saving is faster, but I find this more convenient and actually pretty fast too — because when you need a password, you only have to do simple steps and get the data directly copied to your clipboard without exposing it directly in the terminal:

```bash
$ safe-pass show
Enter your Master passkey:
✔ passwords
✔ passwords-default:default
Data is copied to your clipboard
```

It's just a couple of lists and you choose what you want — no sensitive data is printed to the terminal.

## Security Considerations

If you got really unlucky and someone got your PC or laptop, they couldn't access the data in this system without the **Master Key**. Even if they accessed the Redis database directly, they would only see encrypted values:

```bash
$ redis-cli
127.0.0.1:6379> KEYS *
1) "passwords-default:default"
2) "passwords-google:personal"
3) "tokens-default:default"

127.0.0.1:6379> GET passwords-default:default
"204b146702d33dd4e53cdc384ff11bc2e30de555ec3312a384106c4ca1c9afa849a8e73068eb505f484ebdd42836"
```

Of course, if they are aware enough, they might search for the `.env` file that contains the key and attempt to decrypt it — but it would take too long, and you'd probably notice before they succeed.

## Conclusion

The point is: it's **local, safe, and easy to access**.
I've worked a lot to make it convenient and easy to use by providing a very detailed `README.md` file.

It's a simple, but genuinely great, project I have worked on and I hope you enjoy it (especially Linux nerds and terminal lovers). Thanks and Enjoy! 😉

[Check it out on GitHub](https://github.com/abanoub-samy-farhan/safe-pass)
