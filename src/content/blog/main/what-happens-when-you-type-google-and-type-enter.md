---
title: What happens when you type “google.com” in your browser and hit Enter?
description: Deep dive into the process of what happens when you type a URL in your browser and press Enter.
date: 2024-08-03
tags:
  - web
  - networking
  - protocols
duration: 10min
---

Long before I started learning more about the web and how things work, I imagined that the browser was the software that stored all the information and delivered it to me upon request. While this isn’t entirely wrong, it’s a far too simple explanation for the real process. Today, I’m going to discuss some aspects of this process in a straightforward way.

## Guidelines of the process

First of all, we have to understand some definitions to get through the process. In the web world, there are two end-to-end sides: the client side and the server side (there could be a hacker in the middle if you’re unfortunately using an insecure channel). You are the client, using your laptop or PC, and the server is the remote computer that hosts the website you want to access (e.g. `www.google.com`).

Devices, like humans, need rules to communicate, and that’s where network protocols come in. They enable computers to communicate and transfer data in an organized and standard manner. There are many protocols, the most renowned being HTTP, FTP, and others. You don’t have to worry about them; just consider them different ways to communicate and fulfill tasks.

The web works over many **layers**. These layers organize the transfer of data between clients and servers. They are often conceptualized with models like **OSI**. The standard model for communication using protocols is the OSI (Open Systems Interconnection) model. Other suites (like TCP/IP) build upon or map to it.

Let’s walk through what happens “under the hood” when you type `google.com` and press Enter.

## URL Query

When you type `https://www.google.com/home_page` in your browser (or a similar URL) and press Enter:

1. **Request protocol (HTTPS):** This is the secure version of HTTP, encrypting traffic via SSL/TLS.
2. **`://`** — just part of URL syntax.
3. **Domain name (`www.google.com`):** This is the human-readable name that maps to an IP via DNS.
   - The domain has parts:
     - `google` = main domain
     - `.com` = top-level domain (TLD)
     - `www` = a subdomain (often optional)
4. **Path (`/home_page`):** The resource on the server you want to reach once connected.

## DNS Lookup

The browser needs to translate that domain (`www.google.com`) into an IP address:

1. **Browser cache** — does it already know the IP?
2. **OS cache** — check system-level DNS cache.
3. **DNS resolver (ISP or configured resolver):** If no cache hit, ask the DNS resolver to find the domain.
4. **Root nameserver** → TLD nameserver → authoritative nameserver:
   - If the resolver doesn’t know, it goes to root nameservers, which delegate to `.com` TLD servers, which then point to the domain’s authoritative nameservers.
5. **Authoritative nameserver returns IP.**

Once the IP is known, the browser can begin a TCP/IP connection.

## TCP/IP & Connection Establishment

Once DNS gives the server IP, the browser and server begin communication via TCP/IP:

1. **Application layer (HTTP/HTTPS):** Browser sends HTTP(s) request to server.
2. **Transport layer (TCP):** Sets up a reliable connection, splitting data into packets, ordering, acknowledging, retrying lost ones.
3. **Internet / Network layer:** Routes packets across networks (using IP addresses).
4. **Link / Access / Network interface layer:** Handles local network links (Ethernet, WiFi, etc.).

During this, the transport and network layers make sure data gets to/from server reliably.

## Firewall

A **firewall** acts as a gatekeeper, filtering traffic to block malicious or disallowed access. It may block certain IPs, ports, or specific domains to protect systems.

## HTTPS / SSL / TLS

With HTTPS:

- The connection between client and server is encrypted.
- Client and server negotiate encryption parameters (which TLS/SSL version, cipher, keys).
- Only they know the symmetric keys used to encrypt/decrypt the session.
- This secures data in transit (login data, sensitive info, etc.).

## Load Balancer

Large sites like Google use **load balancers** to distribute incoming traffic across multiple servers:

- It ensures no single server gets overwhelmed.
- It can route requests based on load, health, geographical location, etc.

## Web Server vs Application Server

- **Web server:** Delivers static content (HTML, CSS, JS, images). Handles HTTP(s) requests directly.
- **Application server:** Executes logic, interacts with databases, builds dynamic responses.
- The web server may forward requests it cannot handle directly to the application server.

## Conclusion

We’ve followed the journey from when you type a URL to when your browser shows the page — through DNS, TCP/IP, HTTPS, routing, servers, and more. It’s complex under the hood, but every day we use it without thinking about it.
