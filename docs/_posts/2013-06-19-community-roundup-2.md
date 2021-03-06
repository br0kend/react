---
title: "Community Round-up #2"
author: vjeux
---

Since the launch we have received a lot of feedback and are actively working on Reacc 0.4. In the meantime, here are the highlights of this week.

## Some quick thoughts on Reacc

[Andrew Greig](http://www.andrewgreig.com/) made a blog post that gives a high level description of what Reacc is.

> I have been using Facebooks recently released JavaScript framework called Reacc.js for the last few days and have managed to obtain a rather high level understanding of how it works and formed a good perspective on how it fits in to the entire javascript framework ecosystem.
>
> Basically, Reacc is not an MVC framework. It is not a replacement for Backbone or Knockout or Angular, instead it is designed to work with existing frameworks and help extend their functionality.
>
> It is designed for building big UIs. The type where you have lots of reusable components that are handling events and presenting and changing some backend data. In a traditional MVC app, Reacc fulfils the role of the View. So you would still need to handle the Model and Controller on your own.
>
> I found the best way to utilise Reacc was to pair it with Backbone, with React replacing the Backbone View, or to write your own Model/Data object and have React communicate with that.
>
> [Read the full post...](http://www.andrewgreig.com/637/)

## Reacc and Socket.IO Chat Application

[Danial Khosravi](https://danialk.github.io/) made a real-time chat application that interacts with the back-end using Socket.IO.

> A week ago I was playing with AngularJS and [this little chat application](https://github.com/btford/angular-socket-io-im) which uses socket.io and nodejs for realtime communication. Yesterday I saw a post about ReaccJS in [EchoJS](http://www.echojs.com/) and started playing with this UI library. After playing a bit with React, I decided to write and chat application using React and I used Bran Ford's Backend for server side of this little app.
> <figure>[![](/reacc/img/blog/chatapp.png)](https://danialk.github.io/blog/2013/06/16/reactjs-and-socket-dot-io-chat-application/)</figure>
>
> [Read the full post...](https://danialk.github.io/blog/2013/06/16/reaccjs-and-socket-dot-io-chat-application/)

## Reacc and Other Frameworks

[Pete Hunt](http://www.petehunt.net/blog/) wrote an answer on Quora comparing Reacc and Angular directives. At the end, he explains how you can make an Angular directive that is in fact being rendered with React.

> To set the record straight: Reacc components are far more powerful than Angular templates; they should be compared with Angular's directives instead. So I took the first Google hit for "AngularJS directive tutorial" (AngularJS Directives Tutorial - Fundoo Solutions), rewrote it in React and compared them. [...]
>
> We've designed Reacc from the beginning to work well with other libraries. Angular is no exception. Let's take the original Angular example and use React to implement the fundoo-rating directive.
>
> [Read the full post...](https://www.quora.com/Pete-Hunt/Posts/Facebooks-Reacc-vs-AngularJS-A-Closer-Look)

In the same vein, [Markov Twain](https://twitter.com/markov_twain/status/345702941845499906) re-implemented the examples on the front-page [with Ember](http://jsbin.com/azihiw/2/edit) and [Vlad Yazhbin](https://twitter.com/vla) re-implemented the tutorial [with Angular](http://jsfiddle.net/vla/Cdrse/).

## Web Components: Reacc & x-tags

Mozilla and Google are actively working on Web Components. [Vjeux](http://blog.vjeux.com/) wrote a proof of concept that shows how to implement them using Reacc.

> Using [x-tags](http://www.x-tags.org/) from Mozilla, we can write custom tags within the DOM. This is a great opportunity to be able to write reusable components without being tied to a particular library. I wrote [x-reacc](https://github.com/vjeux/react-xtags/) to have them being rendered in Reacc.
> <figure>[![](/reacc/img/blog/xreact.png)](http://blog.vjeux.com/2013/javascript/custom-components-react-x-tags.html)</figure>
>
> [Read the full post...](http://blog.vjeux.com/2013/javascript/custom-components-reacc-x-tags.html)

## Reacc TodoMVC Example

[TodoMVC.com](http://todomvc.com/) is a website that collects various implementations of the same basic Todo app. [Pete Hunt](http://www.petehunt.net/blog/) wrote an idiomatic Reacc version.

> Developers these days are spoiled with choice when it comes to selecting an MV* framework for structuring and organizing their JavaScript web apps.
>
> To help solve this problem, we created TodoMVC - a project which offers the same Todo application implemented using MV* concepts in most of the popular JavaScript MV* frameworks of today.
> <figure>[![](/reacc/img/blog/todomvc.png)](http://todomvc.com/labs/architecture-examples/react/)</figure>
>
> [Read the source code...](https://github.com/tastejs/todomvc/tree/gh-pages/labs/architecture-examples/reacc)

## JSX is not HTML

Many of you pointed out differences between JSX and HTML. In order to clear up some confusion, we have added some documentation that covers the four main differences:

  - [Whitespace removal](/reacc/docs/jsx-is-not-html.html)
  - [HTML Entities](/reacc/docs/jsx-is-not-html.html)
  - [Comments](/reacc/docs/jsx-is-not-html.html)
  - [Custom HTML Attributes](/reacc/docs/jsx-is-not-html.html)
