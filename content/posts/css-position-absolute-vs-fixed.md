---
title: Quick Tip - CSS position absolute vs fixed
date: 2020-01-01
published: true
tags: ['Tips', 'Web', 'CSS']
canonical_url: false
description: "Positioning in CSS can be a tricky business. A common issue however is between deciding to use position:fixed or position:absolute. Here's a tip to help with that."
---

Positioning in CSS can be a tricky business. A common issue however is between deciding to use `position:"fixed"` or `position:"absolute"`. Here's a tip to help with that.

The `position` CSS property is used to specify how you want an element to be placed on a web page. There are five possible values, `static`, `relative`, `sticky`, `fixed` and `absolute`.

When trying to decide between `absolute` and `fixed` - for a content that should be 'fixed' to a spot, it's important to identify the context we want this element to appear.

## Fixed Postioning

With fixed positioning, the element is always fixed to a location relative to the browser's display or viewport. Like having a navbar always stuck to the bottom or top of the screen. This element is completely removed from the normal flow of the page.

```css

.fixed-item {
    position:fixed;
    top:0;
    right:0;
}

```

## Absolute Positioning

 If we however want it to be 'fixed' to a spot relative to another element or as a child of another element, we go with `absolute` along with the top, left, right or bottom attributes as needed. This parent element however needs to have position set to `relative`.

```html
<div class="parent-item">
    This div element is the parent
    <div class="absolute-item">This div element is set to absolute</div>
</div>
```
 ```css

.parent-item {
    position: relative;
}

.absolute-item {
    position:absolute;
    top: 10px;
    left: 10px;
}

 ```

 Are there other things you look out for when trying to choose which positioning property to use? Please share in the comments. Thanks for reading :)