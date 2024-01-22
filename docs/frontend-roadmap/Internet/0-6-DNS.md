---
title: "DNS"
sidebar_position: 6
---
域名系统 (DNS) 是互联网的电话簿。人们通过例如 nytimes.com 或 espn.com 等[域名](https://www.cloudflare.com/learning/dns/glossary/what-is-a-domain-name/)在线访问信息。Web 浏览器通过 [互联网协议](https://www.cloudflare.com/learning/network-layer/internet-protocol/) （IP） 地址进行交互。DNS 将域名转换为 [IP 地址](https://www.cloudflare.com/learning/dns/glossary/what-is-my-ip-address/)，以便浏览器能够加载互联网资源。

## 记录类型

DNS系统中，常见的资源记录类型有：

* 主机记录（A记录）：[RFC 1035](https://tools.ietf.org/html/rfc1035)定义，A记录是用于名称解析的重要记录，它将特定的主机名映射到对应主机的IP地址上。
* 别名记录（CNAME记录）: [RFC 1035](https://tools.ietf.org/html/rfc1035)定义，CNAME记录用于将某个别名指向到某个A记录上，这样就不需要再为某个新名字另外创建一条新的A记录。
* IPv6主机记录（AAAA记录）: [RFC 3596](https://tools.ietf.org/html/rfc3596)定义，与A记录对应，用于将特定的主机名映射到一个主机的[IPv6](https://zh.wikipedia.org/wiki/IPv6 "IPv6")地址。
* 服务位置记录（SRV记录）: [RFC 2782](https://tools.ietf.org/html/rfc2782)定义，用于定义提供特定服务的服务器的位置，如主机（hostname），端口（port number）等。
* 域名服务器记录（NS记录） ：用来指定该域名由哪个DNS服务器来进行解析。 您注册域名时，总有默认的DNS服务器，每个注册的域名都是由一个DNS域名服务器来进行解析的，DNS服务器NS记录地址一般以以下的形式出现： ns1.domain.com、ns2.domain.com等。 简单的说，NS记录是指定由哪个DNS服务器解析你的域名。
* NAPTR记录：[RFC 3403](https://tools.ietf.org/html/rfc3403)定义，它提供了[正则表达式](https://zh.wikipedia.org/wiki/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F "正则表达式")方式去映射一个域名。NAPTR记录非常著名的一个应用是用于[ENUM](https://zh.wikipedia.org/w/index.php?title=ENUM&action=edit&redlink=1 "ENUM（页面不存在）")查询。

## 4个DNS服务器

* **DNS 解析器(**[DNS recursor](https://www.cloudflare.com/learning/dns/dns-server-types/)) - 该解析器可被视为被要求去图书馆的某个地方查找特定图书的图书馆员。DNS 解析器是一种服务器，旨在通过 Web 浏览器等应用程序接收客户端计算机的查询。然后，解析器一般负责发出其他请求，以便满足客户端的 DNS 查询。
* **根域名服务器(**Root nameserver**)** - [根域名服务器](https://www.cloudflare.com/learning/dns/glossary/dns-root-server/)是将人类可读的主机名转换（解析）为 IP 地址的第一步。可将其视为指向不同书架的图书馆中的索引 - 一般其作为对其他更具体位置的引用。根DNS服务器位于DNS层次结构的最顶层。当进行域名解析时，如果地区性或本地的DNS服务器没有相应的信息，它们会向根DNS服务器查询。根DNS服务器管理顶级域名（TLDs），如.com、.net、.org 以及国家代码顶级域名（ccTLDs），如.uk、.cn。它们负责将这些顶级域名解析请求指向正确的顶级域名服务器。
* **TLD 名称服务器(**[TLD nameserver](https://www.cloudflare.com/learning/dns/dns-server-types/)) —— 顶级域名服务器（[TLD](https://www.cloudflare.com/learning/dns/top-level-domain/)）可看做是图书馆中一个特殊的书架。这个域名服务器是搜索特定 IP 地址的下一步，其上托管了主机名的最后一部分（例如，在 example.com 中，TLD 服务器为 “com”）。
* 权威性域名服务器(**[Authoritative nameserver](https://www.cloudflare.com/learning/dns/dns-server-types/)**) - 可将这个最终域名服务器视为书架上的字典，其中特定名称可被转换成其定义。权威性域名服务器是域名服务器查询中的最后一站。如果权威性域名服务器能够访问请求的记录，则其会将已请求主机名的 IP 地址返回到发出初始请求的 DNS 解析器（图书管理员）。

## DNS的3种查询方式

1. **递归查询** - 在递归查询中，DNS 客户端要求 DNS 服务器（一般为 DNS 递归解析器）将使用所请求的资源记录响应客户端，或者如果解析器无法找到该记录，则返回错误消息。
2. **迭代查询** - 在这种情况下，DNS 客户端将允许 DNS 服务器返回其能够给出的最佳应答。如果所查询的 DNS 服务器与查询名称不匹配，则其将返回对较低级别域名空间具有权威性的 DNS 服务器的引用。然后，DNS 客户端将对引用地址进行查询。此过程继续使用查询链中的其他 DNS 服务器，直至发生错误或超时为止。
3. **非递归查询** - 当 DNS 解析器客户端查询 DNS 服务器以获取其有权访问的记录时通常会进行此查询，因为其对该记录具有权威性，或者该记录存在于其缓存内。DNS 服务器通常会缓存 DNS 记录，以防止更多带宽消耗和上游服务器上的负载。

**DNS客户端**设置使用的DNS服务器一般都是**递归**服务器，它负责全权处理客户端的DNS查询请求，直到返回最终结果。而**DNS服务器之间**一般采用**迭代**查询方式。

## 浏览器DNS缓存

现代 Web 浏览器设计为默认将 DNS 记录缓存一段时间。目的很明显；越靠近 Web 浏览器进行 DNS 缓存，为检查缓存并向 IP 地址发出正确请求而必须采取的处理步骤就越少。发出对 DNS 记录的请求时，浏览器缓存是针对所请求的记录而检查的第一个位置。

在 Chrome 浏览器中，您可以转到 chrome://net-internals/#dns 查看 DNS 缓存的状态。

[chrome://net-internals/#dns – How to Clear DNS Cache Chrome](https://www.wpoven.com/blog/chrome-net-internals-dns/#DNS-Lookup) 是一篇介绍谷歌 dns 工具的文章。

## 操作系统 (OS) 级DNS 缓存

操作系统级 DNS 解析器是 DNS 查询离开您计算机前的第二站，也是本地最后一站。操作系统内旨在处理此查询的过程通常称为“存根解析器”或 DNS 客户端。当存根解析器获取来自某个应用程序的请求时，其首先检查自己的缓存，以便查看是否有此记录。如果没有，则将本地网络外部的 DNS 查询（设置了递归标记）发送到 Internet 服务提供商（ISP）内部的 DNS 递归解析器。

与先前所有步骤一样，当 ISP 内的递归解析器收到 DNS 查询时，其还将查看所请求的主机到 IP 地址转换是否已经存储在其本地持久性层中。

根据其缓存中具有的记录类型，递归解析器还具有其他功能：

1. 如果解析器没有 [A 记录](https://www.cloudflare.com/learning/dns/dns-records/dns-a-record/)，但确实有针对权威性域名服务器的 [NS 记录](https://www.cloudflare.com/learning/dns/dns-records/dns-ns-record/)，则其将直接查询这些域名服务器，从而绕过 DNS 查询中的几个步骤。此快捷方式可防止从根和 .com 域名服务器（在我们对 example.com 的搜索中）进行查找，并且有助于更快地解析 DNS 查询。
2. 如果解析器没有 NS 记录，它会向 TLD 服务器（本例中为 .com）发送查询，从而跳过根服务器。
3. 万一解析器没有指向 TLD 服务器的记录，其将查询根服务器。这种情况通常在清除了 DNS 高速缓存后发生。

## 修改电脑的DNS服务器地址

通常情况下，需要更改DNS地址的原因和情况包括：

1. **提高速度和性能** ：如果默认的ISP（互联网服务提供商）DNS服务器响应慢或不稳定，更换到一个更快的DNS服务，如Google DNS或Cloudflare DNS，可能提高浏览速度。
2. **提高安全性和隐私** ：一些第三方DNS服务提供了额外的安全和隐私保护措施，比如阻止访问已知的恶意网站或加强数据加密。
3. **绕过地理限制** ：更改DNS设置有时可以帮助绕过某些类型的地理限制，因为某些服务根据DNS请求的来源地来决定内容的可访问性。
4. **父母控制或内容过滤** ：某些DNS服务提供了父母控制功能，允许屏蔽成人内容、赌博网站等不适宜的内容。
5. **解决DNS污染或劫持问题** ：在某些情况下，本地ISP的DNS服务器可能受到DNS污染或劫持，导致无法访问某些网站。更换DNS服务可以帮助解决这个问题。
6. **技术和研究目的** ：网络管理员或技术专家可能因为测试、研究或诊断网络问题的目的而更改DNS设置。
7. **提供特定服务的访问** ：某些特定服务可能需要使用特定的DNS服务器来访问或运行。

在更改DNS设置时，重要的是要确保所选的DNS服务是可靠和信誉良好的，以保证网络的稳定性和安全性。同时，更改DNS设置可能会影响到网络的访问性和行为，因此在进行更改之前，了解可能的影响是很重要的。


### Windows系统：

1. 打开“控制面板”。
2. 选择“网络和共享中心”。
3. 点击你的网络连接（例如 Wi-Fi 或有线连接）。
4. 在弹出的窗口中，选择“属性”。
5. 选择“Internet协议版本4 (TCP/IPv4)”或“Internet协议版本6 (TCP/IPv6)”。
6. 选择“使用下面的DNS服务器地址”。
7. 输入DNS的IPv4地址，或对应的IPv6地址。
8. 点击“确定”保存更改。

### macOS系统：

1. 打开“系统偏好设置”。
2. 点击“网络”。
3. 选择你的网络服务（Wi-Fi 或以太网）。
4. 点击“高级”按钮。
5. 切换到“DNS”标签页。
6. 点击“+”添加Cloudflare的DNS地址。
7. 输入DNS的IPv4地址，或对应的IPv6地址。

## DNS实践

https://messwithdns.net/ 是一个DNS的实践网站，通过设置不同类型和TTL的DNS记录，体会DNS记录可能产生的影响。
