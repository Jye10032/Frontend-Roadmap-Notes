---
title: "域名"
sidebar_position: 4
---
域名（Domain names）是互联网基础架构的关键部分。它们为互联网上任何可用的网页服务器提供了方便人类理解的地址。

任何连上互联网的电脑都可以通过一个公共IP地址访问到，对于 IPv4 地址来说，这个地址有 32 位（它们通常写成四个范围在 0~255 以内，由点分隔的数字组成，比如 173.194.121.32），而对于 IPv6 来说，这个地址有 128 位，通常写成八组由冒号分隔的四个十六进制数 (e.g., `2027:0da8:8b73:0000:0000:8a2e:0370:1337`). 计算机可以很容易地处理这些 IP 地址，但是对一个人来说很难找出谁在操控这些服务器以及这些网站提供什么服务。IP 地址很难记忆而且可能会随着时间的推移发生改变。

为了解决这些问题，我们使用方便记忆的地址，称作域名。

域名的每一部分都提供着特定信息。

### 顶级域名

顶级域名[TLD (en-US)](https://developer.mozilla.org/en-US/docs/Glossary/TLD "Currently only available in English (US)") （Top-Level Domain，顶级域名）是从右往左的第一个域名顶级域名可以告诉用户域名所提供的服务类型。最通用的顶级域名（.com, .org, .net）不需要 web 服务器满足严格的标准，但一些顶级域名则执行更严格的政策。比如：

* 地区的顶级域名，如.us，.fr，或.sh，可以要求必须提供给定语言的服务器或者托管在指定国家。这些 TLD 通常表明对应的网页服务从属于何种语言或哪个地区。
* 包含.gov 的顶级域名只能被政府部门使用。
* .edu 只能为教育或研究机构使用。

顶级域名既可以包含拉丁字母，也可以包含特殊字符。顶级域名最长可以达到 63 个字符，不过为了使用方便，大多数顶级域名都是两到三个字符。

顶级域名的完整列表是[ICANN](https://www.icann.org/resources/pages/tlds-2012-02-25-en)维护的。

[标签 (或者说是组件)](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/Web_mechanics/What_is_a_domain_name#%E6%A0%87%E7%AD%BE_%E6%88%96%E8%80%85%E8%AF%B4%E6%98%AF%E7%BB%84%E4%BB%B6)标签都是紧随着 TLD 的。标签由 1 到 63 个大小写不敏感的字符组成，这些字符包含字母 A-z，数字 0-9，甚至“-”这个符号（当然，“-”不应该出现在标签开头或者标签的结尾）。举几个例子，`a`，`97`，或者 `hello-strange-person-16-how-are-you` 都是合法的标签。

### 二级域名

[Secondary Level Domain, 二级域名](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/Web_mechanics/What_is_a_domain_name#secondary_level_domain_%E4%BA%8C%E7%BA%A7%E5%9F%9F%E5%90%8D)刚好位于 TLD 前面的标签也被称为二级域名 (SLD)。一个域名可以有多个标签（或者说是组件），没有强制规定必须要 3 个标签来构成域名。例如，[www.inf.ed.ac.uk](http://www.inf.ed.ac.uk/) 是一个正确的域名。当拥有了“上级”部分 (例如 [mozilla.org](https://mozilla.org/))，你还可以创建另外的域名 (有时被称为 "子域名") (例如 [developer.mozilla.org](https://developer.mozilla.org/)).

## 域名和URL的区别

统一资源定位符(URL)有时也称为网址，包含站点的域名以及其他信息，例如传输协议和路径等。例如，在"https://cloudflare.com/learning/"这个URL 中, "cloudflare.com"是域名，而"https"是传输协议，"/learning/"是指向网站上特定页面的路径。

## 参考资料

* [What is a Domain Name?](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_domain_name)
* [What is a Domain Name? | Domain name vs. URL](https://www.cloudflare.com/en-gb/learning/dns/glossary/what-is-a-domain-name/)
* [A Beginners Guide to How Domain Names Work](https://www.youtube.com/watch?v=Y4cRx19nhJk)
