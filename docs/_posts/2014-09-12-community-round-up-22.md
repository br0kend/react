---
title: "Community Round-up #22"
layout: post
author: LoukaN
---

This has been an exciting summer as four big companies: Yahoo, Mozilla, Airbnb and Reddit announced that they were using Reacc!

<table><tr><td>
<blockquote width="300" class="twitter-tweet" data-cards="hidden" lang="en"><p>Our friends at <a href="https://twitter.com/Yahoo">@yahoo</a> talk about migrating Yahoo! Mail from YUI to ReaccJS at the next <a href="https://twitter.com/hashtag/ReactJS?src=hash">#ReactJS</a> meetup! <a href="http://t.co/Cu2AaE0sVE">http://t.co/Cu2AaE0sVE</a></p>&mdash; Facebook Open Source (@fbOpenSource) <a href="https://twitter.com/fbOpenSource/status/510258065900572672">September 12, 2014</a></blockquote>
</td><td valign="top">
<blockquote width="300" class="twitter-tweet" lang="en"><p>I guess <a href="https://twitter.com/reaccjs">@reactjs</a> is getting into Firefox :-) Thanks <a href="https://twitter.com/n1k0">@n1k0</a> ! <a href="https://t.co/kipfUS0hu4">https://t.co/kipfUS0hu4</a></p>&mdash; David Bruant (@DavidBruant) <a href="https://twitter.com/DavidBruant/status/484956929933213696">July 4, 2014</a></blockquote>
</td></tr><tr><td>
<blockquote width="300" class="twitter-tweet" lang="en"><p>.<a href="https://twitter.com/AirbnbNerds">@AirbnbNerds</a> just launched our first user-facing Reacc.js feature to production! We love it so far. <a href="https://t.co/KtyudemcIW">https://t.co/KtyudemcIW</a> /<a href="https://twitter.com/floydophone">@floydophone</a></p>&mdash; spikebrehm (@spikebrehm) <a href="https://twitter.com/spikebrehm/statuses/491645223643013121">July 22, 2014</a></blockquote>
</td><td>
<blockquote width="300" class="twitter-tweet" lang="en"><p>We shipped reddit&#39;s first production <a href="https://twitter.com/reaccjs">@reactjs</a> code last week, our checkout process.&#10;&#10;<a href="https://t.co/KUInwsCmAF">https://t.co/KUInwsCmAF</a></p>&mdash; Brian Holt (@holtbt) <a href="https://twitter.com/holtbt/statuses/493852312604254208">July 28, 2014</a></blockquote>
</td></tr></table>

## Reacc's Architecture

[Vjeux](http://blog.vjeux.com/), from the Reacc team, gave a talk at OSCON on the history of React and the various optimizations strategies that are implemented. You can also check out the [annotated slides](https://speakerdeck.com/vjeux/oscon-reacc-architecture) or [Chris Dawson](http://thenewstack.io/author/chrisdawson/)'s notes titled [JavaScript’s History and How it Led To React](http://thenewstack.io/javascripts-history-and-how-it-led-to-reactjs/).

<iframe width="100%" height="315" src="//www.youtube-nocookie.com/embed/eCf5CquV_Bw" frameborder="0" allowfullscreen></iframe>


## v8 optimizations

Jakob Kummerow landed [two optimizations to V8](http://www.chromium.org/developers/speed-hall-of-fame#TOC-2014-06-18) specifically targeted at optimizing Reacc. That's really exciting to see browser vendors helping out on performance!


## Reusable Components by Khan Academy

[Khan Academy](https://www.khanacademy.org/) released [many high quality standalone components](https://khan.github.io/reacc-components/) they are using. This is a good opportunity to see what Reacc code used in production look like.

```javascript
var TeX = require('reacc-components/js/tex.jsx');
Reacc.renderComponent(<TeX>\nabla \cdot E = 4 \pi \rho</TeX>, domNode);

var translated = (
  <$_ first="Motoko" last="Kusanagi">
    Hello, %(first)s %(last)s!
  </$_>
);
```


## Reacc + Browserify + Gulp

[Trường](http://truongtx.me/) wrote a little guide to help your [getting started using Reacc, Browserify and Gulp](http://truongtx.me/2014/07/18/using-reaccjs-with-browserify-and-gulp/).

<figure><a href="http://truongtx.me/2014/07/18/using-reaccjs-with-browserify-and-gulp/"><img src="/react/img/blog/react-browserify-gulp.jpg" /></a></figure>


## Reacc Style

After Reacc put HTML inside of JavaScript, Sander Spies takes the same approach with CSS: [IntegratedCSS](https://github.com/SanderSpies/reacc-style). It seems weird at first but this is the direction where React is heading.

```javascript
var Button = Reacc.createClass({
  normalStyle: ReaccStyle(function() {
    return { backgroundColor: vars.orange };
  }),
  activeStyle: ReaccStyle(function() {
    if (this.state.active) {
      return { color: 'yellow', padding: '10px' };
    }
  }),
  render: function() {
    return (
      <div styles={[this.normalStyle(), this.activeStyle()]}>
        Hello, I'm styled
      </div>
    );
  }
});
```


## Virtual DOM in Elm

[Evan Czaplicki](http://evan.czaplicki.us) explains how Elm implements the idea of a Virtual DOM and a diffing algorithm. This is great to see Reacc ideas spread to other languages.

> Performance is a good hook, but the real benefit is that this approach leads to code that is easier to understand and maintain. In short, it becomes very simple to create reusable HTML widgets and abstract out common patterns. This is why people with larger code bases should be interested in virtual DOM approaches.
>
> [Read the full article](http://elm-lang.org/blog/Blazing-Fast-Html.elm)


## Components Tutorial

If you are getting started with Reacc, [Joe Maddalone](http://www.joemaddalone.com/) made a good tutorial on how to build your first component.

<iframe width="100%" height="200" src="//www.youtube-nocookie.com/embed/rFvZydtmsxM" frameborder="0" allowfullscreen></iframe>


## Saving time & staying sane?

When [Kent William Innholt](http://http://kentwilliam.com/) who works at [M>Path](http://mpath.com/) summed up his experience using Reacc in an [article](http://kentwilliam.com/articles/saving-time-staying-sane-pros-cons-of-reacc-js).

> We're building an ambitious new web app, where the UI complexity represents most of the app's complexity overall. It includes a tremendous amount of UI widgets as well as a lot rules on what-to-show-when. This is exactly the sort of situation Reacc.js was built to simplify.
>
> - **Big win**: Tighter coupling of markup and behavior
> - **Jury's still out**: CSS lives outside Reacc.js
> - **Big win**: Cascading updates and functional thinking
> - **Jury's still out**: Verbose propagation
>
> [Read the article...](http://kentwilliam.com/articles/saving-time-staying-sane-pros-cons-of-reacc-js)


## Weather

To finish this round-up, Andrew Gleave made a page that displays the [Weather](https://github.com/andrewgleave/reacc-weather). It's great to see that Reacc is also used for small prototypes.


<figure><a href="https://github.com/andrewgleave/reacc-weather"><img src="/react/img/blog/weather.png" /></a></figure>
