---
title: "什么是HTML"
sidebar_position: 1
---
HTML是一种用来告知浏览器如何组织页面的 **标记语言** 。

HTML 由一系列的[元素](https://developer.mozilla.org/zh-CN/docs/Glossary/Element)组成，这些元素可以用来包围或*标记*不同部分的内容，使其以某种方式呈现或者工作。

> **元素**是网页的一部分，在 [XML](https://developer.mozilla.org/zh-CN/docs/Glossary/XML) 和 [HTML](https://developer.mozilla.org/zh-CN/docs/Glossary/HTML) 中，一个元素可以包含一个数据项，或是一块文本，或是一张照片，亦或是什么也不包含。一个典型的元素包括一个具有一些[属性](https://developer.mozilla.org/zh-CN/docs/Glossary/Attribute)的开始标签，中间的文本内容和一个结束标签。
>
> 一个元素 : `<p class="nice">Hello world!</p>`

HTML 标签**不区分大小写**，但从一致性、可读性来说，最好仅使用小写字母。

## 嵌套元素

把元素放到其他元素之中。

```html
<p>My cat is <strong>very</strong> grumpy.</p>
```

注意事项：必须先结束一个标签再开始一个标签，以下的代码是错误的：

```html
<p>My cat is <strong>very grumpy.</p></strong>
```

## 块级元素和内联元素

在 HTML 中有两种你需要知道的重要元素类别，块级元素和内联元素。

* 块级元素在页面中以块的形式展现。一个块级元素出现在它前面的内容之后的新行上。任何跟在块级元素后面的内容也会出现在新的行上。块级元素通常是页面上的结构元素。例如，一个块级元素可能代表标题、段落、列表、导航菜单或页脚。一个块级元素不会嵌套在一个内联元素里面，但它可能嵌套在另一个块级元素里面。
* 内联元素通常出现在块级元素中并环绕文档内容的一小部分，而不是一整个段落或者一组内容。内联元素不会导致文本换行。它通常与文本一起使用，例如，[`<a>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a) 元素创建一个超链接，[`<em>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/em) 和 [`<strong>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/strong) 等元素创建强调。

简单来说，块级元素是会换行的元素，内联元素是不换行的元素。

## 空元素

不是所有元素都拥有开始标签、内容和结束标签。一些元素只有一个标签，通常用来在此元素所在位置插入/嵌入一些东西。这些元素被称为[空元素](https://developer.mozilla.org/zh-CN/docs/Glossary/Void_element)。例如：元素 [`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img) 是用来在页面插入一张指定的图片。

```html
<img
  src="https://roy-tian.github.io/learning-area/extras/getting-started-web/beginner-html-site/images/firefox-icon.png"
alt="Firefox 图标" />
```
