---
title: How to Use Linear Gradient with Images
date: 2018-09-14
published: true
tags: ['CSS','Media']
canonical_url: true
description: "linear-gradient() is a CSS function that creates an image containing a transition between two or more colors in a straight line. It's the most common type of gradient in web design."
---


Linear Gradient, `linear-gradient()` is a CSS function that creates an image containing a transition between two or more colors in a straight line. It's the most common type of gradient in web design.

As mentioned earlier, `linear-gradient()` has the colors flowing in a straight line - left to right, top to bottom or at any angle you choose. It is however, restricted to a single direction.

The `linear-gradient` has a formal syntax it follows

```css
linear-gradient(
    [ <angle> | to <side-or-corner> ]?,  <color-stop> [, <color-stop>]+
  )
```
* `[ <angle> | to <side-or-corner> ]?`: This stands for using either the angle e.g 200deg or choosing to specify a direction for the linear-gradient e.g 'to right'. The `?` indicates that this is optional.

* `<color-stop> [, <color-stop>]+`: This stands for the list of colors that should be in the gradient. Can be one or more. This color list accepts all form of color syntax. Can either be named e.g red or HEX e.g '#ff33ee', RGB and HSL. Each color can also be given a specific percentage if you want to have more control of how they are displayed.

## Usage
The `linear-gradient()` is commonly declared as a value of either the `background` or `background-image` CSS attribute:

```css
.section {
    background: linear-gradient(green, #fffe33);
    background-image: linear-gradient(30deg, green, #fffe33);
}
```

## Using with Images
The common uses of `linear-gradient` involve colors but it can certainly be used in more interesting ways. Including with images.

Taking advantage of the `background` CSS property, a shorthand that sets multiple background related properties all at once e.g background-color, background-image, we'd set the background with a gradient and the other part with background-image.

```css
.gradient {
    background: linear-gradient(110deg, #E36E55 0%, #D78F52 40%, transparent 0%),
                url(image.jpg);
}
```

Here's a demo attached from codepen.

https://codepen.io/acekyd/pen/yxqEWV

https://gist.github.com/noxify/4663ce9b7bee433c125a2fc12150a043


You can get creative with the degrees, directions and also percentage of color and transparency in the `background property to achieve your desired result.