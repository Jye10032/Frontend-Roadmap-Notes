---
title: "为什么需要HTTP/3"
sidebar_position: 3
---
# HTTP/3历史和核心概念

## 为什么我们需要HTTP3？

**底层传输协议（TCP）没有考虑到效率问题。**

* TCP需要“[握手](https://developer.mozilla.org/en-US/docs/Glossary/TCP_handshake)”来建立新连接。这样做是为了确保客户端和服务器都存在，并且它们愿意并且能够交换数据。然而，在连接上执行任何其他操作之前，也需要完成 **完整的网络往返。** 如果客户端和服务器地理位置相距较远，则每次往返时间 (RTT) 可能会超过 100 毫秒，从而导致明显的延迟。
* TCP 将其传输的所有数据视为 **单个“文件”或字节流** ，即使我们实际上使用它同时传输多个文件（例如，当下载由以下内容组成的网页时）很多资源）。实际上，这意味着如果包含单个文件数据的 TCP 数据包丢失，那么所有其他文件也将被延迟，直到这些数据包恢复为止。

因此新的传输协议 QUIC 出现了，QUIC 建立在UDP（User Datagram Protocol）之上，而不是 TCP。这使得 QUIC 可以更灵活地处理数据包的发送和接收。因此HTTP 升级为可以兼容该协议的 HTTP/3。

QUIC 的使用意味着 HTTP/3 依赖于用户数据报协议 ([UDP](https://www.cloudflare.com/learning/ddos/glossary/user-datagram-protocol-udp/))，而不是传输控制协议 ([TCP](https://www.cloudflare.com/learning/ddos/glossary/tcp-ip/))。切换到 UDP 将使在线浏览时的连接速度和用户体验更快。

## 什么是QUIC

**QUIC 是一种通用传输协议** ，与 TCP 非常相似，除了 HTTP 和网页加载之外，还可以并且将会用于许多用例。例如，DNS、SSH、SMB、RTP 等都可以在 QUIC 上运行。

* **连接建立**：许多消息来源声称，出于性能考虑，HTTP/3 是构建在 UDP 之上的。他们说 HTTP/3 更快，因为就像 UDP 一样，它不建立连接，也不等待数据包重新传输。**这些说法都是错误的。**
* **数据传输**：**QUIC 本质上重新实现了使 TCP 成为如此强大且流行（但速度稍慢）协议的几乎所有功能** 。QUIC 绝对可靠，使用[接收数据包的确认](https://www.rfc-editor.org/rfc/rfc9000.html#name-generating-acknowledgments)和[重传来](https://www.rfc-editor.org/rfc/rfc9000.html#name-retransmission-of-informati)确保丢失的数据包仍然到达。QUIC 仍然建立连接并进行[高度复杂的握手](https://www.rfc-editor.org/rfc/rfc9000.html#name-cryptographic-and-transport)。
* **流量控制**：QUIC 还使用所谓的[流量控制](https://www.rfc-editor.org/rfc/rfc9000.html#name-flow-control)和[拥塞控制](https://www.rfc-editor.org/rfc/rfc9002.html)机制，防止发送方使网络或接收方过载，但这也会使 TCP 比使用原始 UDP 慢。关键是 QUIC 以比 TCP 更智能、更高效的方式实现这些功能。它将数十年的部署经验和 TCP 最佳实践与一些核心新功能相结合。

那么，QUIC 到底是如何改进 TCP 的呢？有什么不同呢？QUIC 中有几个新的具体功能和机会（0-RTT 数据、连接迁移、对数据包丢失和慢速网络的更强恢复能力），我们将在本系列的下一部分中详细讨论。然而，所有这些新事物基本上可以归结为四个主要变化：

### QUIC 与 TLS 深度集成

TLS（[传输层安全协议](https://www.cloudflare.com/en-gb/learning/ssl/transport-layer-security-tls/)）负责保护和加密通过 Internet 发送的数据。当您使用 HTTPS 时，您的明文 HTTP 数据首先通过 TLS 加密，然后再通过 TCP 传输。

在互联网的早期，加密流量的处理成本相当高。此外，它也不被认为对于所有用例都是必要的。因此，从历史上看，TLS 一直是一个完全独立的协议，可以*选择*在 TCP 之上使用。这就是为什么我们要区分 HTTP（不带 TLS）和 HTTPS（带 TLS）。

随着时间的推移，我们对互联网安全的态度当然已经转变为“[默认安全](https://blog.chromium.org/2021/03/a-safer-default-for-navigation-https.html)”。因此，虽然理论上 HTTP/2 可以在没有 TLS 的情况下直接在 TCP 上运行（这甚至在 RFC 规范中定义为[明文 HTTP/2](https://tools.ietf.org/html/rfc7540#section-3.1)），但没有（流行的）Web 浏览器实际上支持这种模式。在某种程度上，浏览器供应商有意识地以牺牲性能为代价换取更高的安全性。

> 对于大多数未指定协议的类型导航，Chrome 现在将默认使用 HTTPS  。HTTPS 是Chrome 在所有主要平台上更安全且[使用最广泛的方案。](https://transparencyreport.google.com/https/overview?hl=en)除了明显的安全和隐私改进之外，此更改还提高了支持 HTTPS 的网站的初始加载速度，因为 Chrome 将直接连接到 HTTPS 端点，而无需从 *http://* 重定向到 *https://* 。对于尚不支持 HTTPS 的网站，当 HTTPS 尝试失败时（包括出现证书错误，例如名称不匹配或不受信任的自签名证书，或连接错误，例如 DNS 解析失败），Chrome 将回退到 HTTP 。此更改首先在 Chrome 桌面版和 Android 版 Chrome 90 版本中推出，随后不久又发布 iOS 版 Chrome。

鉴于向永远在线的 TLS（尤其是网络流量）的明显演变，QUIC 的设计者决定将这一趋势提升到一个新的水平也就不足为奇了。他们没有简单地不为 HTTP/3 定义明文模式，而是选择将加密深深地融入 QUIC 本身。虽然 QUIC 的第一个 Google 特定版本为此使用了自定义设置，但标准化 QUIC 直接使用现有的 TLS 1.3 本身。

为此，它打破了 **协议栈中协议之间典型的清晰分离**。虽然 TLS 1.3 仍然可以在 TCP 之上独立运行，但 QUIC 相反封装了 TLS 1.3。换句话说，没有 TLS 就无法使用 QUIC；QUIC（以及 HTTP/3）始终是完全加密的。此外，QUIC 还加密了几乎所有的数据包头字段；QUIC 中的中介机构不再能够读取传输层信息（例如数据包编号，对于 TCP 来说从未加密）（甚至某些数据包标头标志也已加密）。

为此，QUIC 首先或多或少地使用 TLS 1.3 握手来建立数学加密参数，就像使用 TCP 一样。然而，在此之后，QUIC 接管并自行加密数据包，而对于 TLS-over-TCP，TLS 会自行加密。这种看似微小的差异代表了对始终在线加密的根本性概念变化，这种加密在更低的协议层上强制执行。

这种方法为 QUIC 提供了几个好处：

1. **QUIC 对于用户来说更安全。**
   无法运行明文 QUIC，因此攻击者和窃听者监听的选项也较少。（最近的研究表明[HTTP/2 的明文选项有多么危险](https://labs.bishopfox.com/tech-blog/h2c-smuggling-request-smuggling-via-http/2-cleartext-h2c)。）
2. **QUIC 的连接设置速度更快。**
   对于 TLS-over-TCP，两种协议都需要各自单独的握手，而 QUIC 将传输和加密握手合二为一，从而节省了往返时间。[我们将在第 2 部分](https://www.smashingmagazine.com/2021/08/http3-performance-improvements-part2/)中更详细地讨论这一点。
3. **QUIC 可以更容易地发展。**
   由于它是完全加密的，网络中的中间件无法再像 TCP 那样观察和解释其内部工作原理。因此，它们也不会再因为更新失败而在新版本的 QUIC 中（意外地）中断。如果我们将来想向 QUIC 添加新功能，我们“只需”更新终端设备，而不是所有中间盒。

然而，除了这些好处之外，广泛加密还存在一些潜在的缺点：

1. **许多网络对于是否允许 QUIC 会犹豫不决。**
   公司可能希望在防火墙上阻止它，因为检测不需要的流量变得更加困难。ISP 和中间网络可能会阻止它，因为平均延迟和数据包丢失百分比等指标不再容易获得，从而使检测和诊断问题变得更加困难。这一切都意味着 QUIC 可能永远不会普遍可用，我们将在[第 3 部分](https://www.smashingmagazine.com/2021/09/http3-practical-deployment-options-part3/)中对此进行更多讨论。
2. **QUIC 的加密开销较高。**
   QUIC 使用 TLS 加密每个单独的数据包，而 TLS-over-TCP 可以同时加密多个数据包。这可能会使 QUIC 在高吞吐量场景中速度变慢（正如我们将在[第 2 部分](https://www.smashingmagazine.com/2021/08/http3-performance-improvements-part2/)中看到的）。
3. **QUIC 使网络更加中心化。**
   我经常遇到的抱怨是这样的：“Google 正在推动 QUIC，因为它使他们能够完全访问数据，同时不与其他人共享任何数据”。我大多不同意这一点。首先，与 TLS-over-TCP 相比，QUIC 不会向外部观察者隐藏更多（或更少！）的用户级信息（例如，您正在访问哪些 URL）（QUIC 保持现状）

### QUIC 支持多个*独立的*字节流

对于 HTTP/1.1，资源加载过程非常简单，因为**每个文件都有自己的 TCP 连接**并完整下载。例如，如果我们有文件 A、B 和 C，则我们将拥有三个 TCP 连接。第一个会看到 AAAA 字节流，第二个是 BBBB，第三个是 CCCC（每个字母重复都是一个 TCP 数据包）。这是可行的，但效率也非常低，因为每个新连接都有一些开销。

在实践中，浏览器对可以使用的并发连接数量（以及因此可以并行下载的文件数量） **施加限制- 通常，每个页面加载 6 到 30 个连接。** 一旦前一个文件完全传输，连接就会被重新使用来下载新文件。这些限制最终开始阻碍现代页面的 Web 性能，这些页面通常会加载 30 多个资源。

改善这种情况是 HTTP/2 的主要目标之一。该协议通过不再为每个文件打开新的 TCP 连接，而是通过单个 TCP 连接下载不同的资源来实现这一点。这是通过 **“复用”不同的字节流**来实现的。这是一种奇特的说法，我们在传输时混合不同文件的数据。对于我们的三个示例文件，我们将获得单个 TCP 连接，并且传入数据可能看起来像 AABBCCAABBCC （尽管[许多其他排序方案也是可能的](https://blog.cloudflare.com/better-http-2-prioritization-for-a-faster-web/)）。这看起来很简单，而且确实工作得很好，使得 HTTP/2 通常与 HTTP/1.1 一样快或稍快一点，但开销要少得多。

但是当文件丢失重传时会发生问题，重传逻辑发生在 TCP 层，假设在传输B数据的一部分时发生了重传，而B片段的后续部分是A和C，TCP 认为单个 X 文件的一部分已丢失，因此它认为必须阻止处理 X 的其余数据，直到填补漏洞。虽然在 HTTP/2 级别，我们知道A和C的传输可以继续进行，但 TCP 不知道这一点，导致事情比 **可能的速度慢** 。[这种低效率就是“队头 (HoL) 阻塞”问题](https://calendar.perfplanet.com/2020/head-of-line-blocking-in-quic-and-http-3-the-details/)的一个例子。

**解决传输层的HoL阻塞是QUIC的主要目标之一** 。与 TCP 不同，QUIC 清楚地意识到它正在复用多个*独立的*字节流。当然，它不知道自己正在传输 CSS、JavaScript 和图像；它只是在传输 CSS、JavaScript 和图像。它只知道流是分开的。因此，QUIC 可以针对每个流执行数据包丢失检测和恢复逻辑。

**QUIC允许HTTP/3绕过队头阻塞问题**，与 TCP 不同的是，当遇到上述重传问题时，它会尽快将 A 和 C 的任何数据传递到 HTTP/3 层。

现在 TCP 和 QUIC 之间有了根本的区别。顺便说一句，这也是我们不能像在 QUIC 上那样运行 HTTP/2 的主要原因之一。正如我们所说，HTTP/2 还包括通过单个 (TCP) 连接运行多个流的概念。因此，HTTP/2-over-QUIC 将具有两个不同且相互竞争的流抽象。

### QUIC 使用 Connection ID

在 TCP 中，连接仅由 4 元组标识（**客户端IP地址+客户端端口+服务器IP地址+服务器端口**）。

因此，如果这四个参数中只有一个发生变化，连接就会无效并需要重新建立（包括新的握手），必须执行新的 TCP（可能还有 TLS）握手才能建立新连接，并且根据应用程序级协议，需要重新启动进程内操作，例如，如果您通过 HTTP 下载大文件，则可能需要从一开始就重新请求该文件（例如，如果服务器不支持[范围请求](https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests)）。另一个例子是实时视频会议，在切换网络时可能会出现短暂的停电。

因此，重新启动 TCP 连接可能会产生严重影响（等待新的握手、重新启动下载、重新建立上下文）。

为了解决这个问题，QUIC引入了一个新的概念，称为 **连接标识符（CID）** 。每个连接都会在 4 元组顶部分配另一个编号，用于在两个端点之间唯一标识它。

### QUIC 使用框架

未完待续

# HTTP/3性能特性



## **参考资料**

* [第 1 部分： HTTP/3 历史和核心概念](https://www.smashingmagazine.com/2021/08/http3-core-concepts-part1/)
  面向刚接触 HTTP/3 和一般协议的人，主要讨论基础知识。
* [第 2 部分：HTTP/3 性能特性](https://www.smashingmagazine.com/2021/08/http3-performance-improvements-part2/)
  这一部分更加深入和技术性强。已经了解基础知识的人可以从这里开始。
* [第 3 部分：实用的 HTTP/3 部署选项](https://www.smashingmagazine.com/2021/09/http3-practical-deployment-options-part3/)
  本系列的第三篇文章介绍了自行部署和测试 HTTP/3 所涉及的挑战。它还详细说明了如何以及是否应该更改网页和资源。
