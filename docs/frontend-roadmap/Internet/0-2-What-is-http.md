---
title: "HTTP简介"
sidebar_position: 2
---
HTTP是基于TCP/IP的应用层通信协议，它规范了客户端和服务器之间的通信方式。HTTP遵循经典的“客户端-服务器模型”，其中客户端发起连接请求，然后等待接收响应。HTTP是一个无状态协议，这意味着服务器在两个请求之间不保存任何数据（状态）。

HTTP本身依赖于TCP/IP，在客户端和服务器之间获取请求和响应。默认情况下，使用TCP端口80，但也可以使用其他端口。HTTPS使用端口443。

## 三次握手

三次握手在其最简单的形式中是指，所有TCP连接都以三次握手开始，即在客户端和服务器开始共享应用程序数据之前，它们共享一系列数据包。

1. **SYN -** 客户端选择一个随机数，假设为x，并将其发送到服务器。
2. **SYN ACK -** 服务器通过向客户端发送一个由服务器选择的随机数y和数字x+1（其中x是客户端发送的数字）组成的ACK数据包来确认请求。
3. **ACK -** 客户端递增从服务器接收到的数字y，并带着数字y+1发送一个ACK数据包。

一旦完成了这个三次握手，客户端和服务器之间的数据共享就可以开始了。值得注意的是，客户端可以在发送最后一个ACK数据包后立即开始发送应用程序数据，但服务器仍然必须等待接收到ACK数据包以满足请求。

客户端与服务端之间通过交换一个个独立的消息（而非数据流）进行通信。由客户端——通常是个浏览器——发出的消息被称作 *请求* （request），由服务端发出的应答消息被称作 *响应* （response）。

## 四次挥手

四次挥手是指在TCP连接的断开过程中，需要进行四个步骤来完成连接的释放。这是为了确保双方都能够安全地关闭连接，防止出现数据的丢失或不完整。四次挥手的过程如下：

1. **第一次挥手（FIN）：**

   - 客户端向服务器发送一个TCP报文，标志位设置为FIN（Finish）。
   - 客户端告诉服务器，它已经完成了数据的发送。
2. **第二次挥手（ACK）：**

   - 服务器收到客户端的FIN后，发送一个确认ACK（Acknowledgment）给客户端。
   - 服务器告诉客户端，它已经知道客户端没有数据需要发送了。
3. **第三次挥手（FIN）：**

   - 服务器发送一个FIN给客户端。
   - 服务器告诉客户端，它也完成了数据的发送。
4. **第四次挥手（ACK）：**

   - 客户端收到服务器的FIN后，发送一个确认ACK给服务器。
   - 客户端告诉服务器，它知道服务器已经完成了数据的发送。

在这个过程中，每个节点都发送了一个FIN，表示它不再发送数据。而收到对方的FIN后，仍可以发送和接收最后的数据，然后再发送一个FIN。这是因为连接的一方可能有未发送完的数据，通过这样的方式，双方确保对方已经完成数据的发送，然后安全地关闭连接。

四次挥手的机制确保了数据的完整性和连接的可靠性，尤其是在存在网络延迟的情况下。

## 一个HTTP请求中包含什么

HTTP请求包含一系列组件，它们是互联网通信平台（如Web浏览器）请求加载网站所需信息的方式。

在互联网上进行的每个HTTP请求都携带一系列编码数据，其中包含不同类型的信息。典型的HTTP请求包括：

**HTTP协议版本类型：**

表示正在使用的HTTP协议版本。常见的示例包括HTTP/1.0、HTTP/1.1和HTTP/2。

**URL（统一资源定位符）：**

指定标识被请求资源的统一资源标识符（URI）。它包括协议（例如，“http://”或“https://”）、域名和服务器上特定资源的路径。

**HTTP方法：**

定义客户端要在指定资源上执行的操作。常见的HTTP方法包括：

- **GET：** 期望返回信息（通常以网站的形式）。
- **POST：** 表示客户端正在向Web服务器提交信息（例如表单信息，例如提交的用户名和密码）。

**HTTP请求头：**

HTTP头包含以键值对形式存储的文本信息，并且它们包含在每个HTTP请求（以及后续的响应中，稍后会详细说明）中。这些头传达核心信息，例如客户端使用的浏览器是什么，以及正在请求什么数据。

**可选的HTTP正文：**

请求的主体部分包含请求正在传输的信息的“主体”。HTTP请求的主体包含提交到Web服务器的任何信息，例如用户名和密码，或者输入到表单中的任何其他数据。

## 一个HTTP响应中包含什么

HTTP响应是Web客户端（通常是浏览器）对HTTP请求的回应，它从Internet服务器接收到。这些响应根据HTTP请求中的请求内容传达有价值的信息。

一个典型的HTTP响应包含：

**HTTP状态码:**

什么是HTTP状态码？
HTTP状态码是一个由3个数字组成的代码，通常用于指示HTTP请求是否成功完成。状态码被分为以下5个块：

1xx 信息性状态码
2xx 成功状态码
3xx 重定向状态码
4xx 客户端错误状态码
5xx 服务器错误状态码

“xx”指的是介于00和99之间的不同数字。

以数字“2”开头的状态码表示成功。例如，在客户端请求网页后，最常见的响应之一是状态码为“200 OK”，表示请求已成功完成。

如果响应以“4”或“5”开头，这意味着发生了错误，网页将无法显示。以“4”开头的状态码表示客户端错误（在URL中拼写错误时，经常会遇到“404 NOT FOUND”状态码）。以“5”开头的状态码表示服务器端发生了错误。状态码还可以以“1”或“3”开头，分别表示信息性响应和重定向。

**HTTP响应头**

类似于HTTP请求，HTTP响应也带有头部，传达了一些重要的信息，例如响应主体中发送的数据的语言和格式，DNS 解析时的原始域名。

**可选的HTTP主体**

成功的HTTP响应通常包含一个主体，其中包含请求的信息。在大多数Web请求中，这是HTML数据，Web浏览器会将其转换为网页。

## DDoS 攻击是否可以通过 HTTP 进行？

请注意，HTTP 是一种“无状态”协议，这意味着每个命令都是独立运行的，与其他任何命令无关。在最初的规范中，HTTP 请求创建并关闭一个 TCP 连接。在更新的 HTTP 协议版本（HTTP 1.1 及以上）中，持久连接允许多个 HTTP 请求通过一个持久的 TCP 连接传递，改善资源消耗。在 DoS 或 DDoS 攻击的背景下，大量的 HTTP 请求可以被用来对目标设备发动攻击，并被视为应用层攻击或第7层攻击的一部分。

## 为什么要使用HTTPS

* 隐私性

HTTPS使用加密协议（通常是TLS或SSL）对数据进行加密，确保在用户和网站之间传输的信息是加密的。这种加密保护了用户敏感信息，如登录凭据、个人资料和信用卡数据，防止这些信息在传输过程中被窃取或窥视。

* 完整性

HTTPS通过加密和认证来确保数据的完整性。数据在传输过程中不仅是加密的，还受到数字签名的保护，这可以防止数据在传输过程中被篡改或损坏。这确保用户接收到的数据与发送方所发送的数据完全一致。

* 身份识别

HTTPS提供了一种验证服务器身份的机制，通过使用SSL/TLS证书。这确保用户连接的是预期的服务器，防止中间人攻击。用户可以通过查看网站的证书信息来确认连接的安全性。
