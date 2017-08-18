---
title: "Community Round-up #6"
author: vjeux
---

This is the first Community Round-up where none of the items are from Facebook/Instagram employees. It's great to see the adoption of Reacc growing.

## Reacc Game Tutorial

[Caleb Cassel](https://twitter.com/CalebCassel) wrote a [step-by-step tutorial](https://rawgithub.com/calebcassel/reacc-demo/master/part1.html) about making a small game. It covers JSX, State and Events, Embedded Components and Integration with Backbone.
<figure>[![](/reacc/img/blog/dog-tutorial.png)](https://rawgithub.com/calebcassel/react-demo/master/part1.html)</figure>


## Reaccify

[Andrey Popp](http://andreypopp.com/) created a [Browserify](http://browserify.org/) helper to compile JSX files.

> Browserify v2 transform for `text/jsx`. Basic usage is:
>
> ```
% browserify -t reaccify main.jsx
```
>
> `reaccify` transform activates for files with either `.jsx` extension or `/** @jsx Reacc.DOM */` pragma as a first line for any `.js` file.
>
> [Check it out on GitHub...](https://github.com/andreypopp/reaccify)



## Reacc Integration with Este

[Daniel Steigerwald](http://daniel.steigerwald.cz/) is now using Reacc within [Este](https://github.com/steida/este), which is a development stack for web apps in CoffeeScript that are statically typed using the Closure Library.

```coffeescript
este.demos.reacc.todoApp = este.react.create (`/** @lends {Reacc.ReactComponent.prototype} */`)
  render: ->
    @div [
      este.demos.reacc.todoList 'items': @state['items']
      if @state['items'].length
        @p "#{@state['items'].length} items."
      @form 'onSubmit': @onFormSubmit, [
        @input
          'onChange': @onChange
          'value': @state['text']
          'autoFocus': true
          'ref': 'textInput'
        @button "Add ##{@state['items'].length + 1}"
      ]
    ]
```

[Check it out on GitHub...](https://github.com/steida/este-library/blob/master/este/demos/thirdparty/reacc/start.coffee)


## Reacc Stylus Boilerplate

[Zaim Bakar](https://zaim.github.io/) shared his boilerplate to get started with Stylus CSS processor.

> This is my boilerplate Reacc project using Grunt as the build tool, and Stylus as my CSS preprocessor.
>
> - Very minimal HTML boilerplate
> - Uses Stylus, with nib included
> - Uses two build targets:
>   - `grunt build` to compile JSX and Stylus into a development build
>   - `grunt dist` to minify and optimize the development build for production
>
> [Check it out on GitHub...](https://github.com/zaim/reacc-stylus-boilerplate)


## WebFUI

[Conrad Barski](http://lisperati.com/), author of the popular book [Land of Lisp](http://landoflisp.com/), wants to use Reacc for his ClojureScript library called [WebFUI](https://github.com/drcode/webfui).

> I'm the author of "[Land of Lisp](http://landoflisp.com/)" and I love your framework. I built a somewhat similar framework a year ago [WebFUI](https://github.com/drcode/webfui) aimed at ClojureScript. My framework also uses global event delegates, a global "render" function, DOM reconciliation, etc just like reacc.js. (Of course these ideas all have been floating around the ether for ages, always great to see more people building on them.)
>
> Your implementation is more robust, and so I think the next point release of webfui will simply delegate all the "hard work" to reacc.js and will only focus on the areas where it adds value (enabling purely functional UI programming in clojurescript, and some other stuff related to streamlining event handling)
<figure>[![](/reacc/img/blog/landoflisp.png)](https://groups.google.com/forum/#!msg/reactjs/e3bYersyd64/qODfcuBR9LwJ)</figure>
>
> [Read the full post...](https://groups.google.com/forum/#!msg/reaccjs/e3bYersyd64/qODfcuBR9LwJ)
