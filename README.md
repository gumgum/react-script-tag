# React Script Tag 💉

This react component is intended to be a drop-in replacement for the `<script>`
html native tag. After you add it in any location of your react-app, the component
will take care on appending the corresponding script tag to your app's document.
It supports all the [native
attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) as
well.

Keywords: [Blazing fast](https://twitter.com/acdlite/status/974390255393505280)
🔥, Minimal 📦, and Simple 🤖

## Table of Content

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [API](#api)
- [Roadmap](#roadmap)
- [Contributors](#contributors)
- [License](#license)

## Installation

You can install this package thru [npm](https://www.npmjs.com/) or
[yarn](https://yarnpkg.com):

``` sh
yarn install @gumgum/react-script-tag
```

## Usage

You can use the `Script` component anywhere. Once it is mounted, the component
will proceed to load your script.

``` jsx
import React from 'react';
import Script from '@gumgum/react-script-tag';

class MyApp extends React.Component {
    
    _onMyScriptLoad = () => {/* ... */};
    _onMyScriptError = () => {/* ... */};

    render() {
        return (
            <div>
                {/* Your App's code */}
                <Script
                    src="//url-to-your-site.com/script.js"
                    type="text/javascript"
                    onLoad={ this._onMyScriptLoad }
                    onError={ this._onMyScriptError }
                    async
                />
            </div>
        );
    }
}

export default MyApp;
```

> It is **recommended** that the `Script` tag is placed in a component that only
> renders once in the entire life of your app. Otherwise, a new `<script>` tag
> will be appended each time the component mounts again. There are plans down
> the road to prevent this.

## Examples

At GumGum, we usually wrap the `Script` component as follow, to facilitate
adding 3rd-parties. Here is an example, on how we add [Qualaroo](https://qualaroo.com/):

``` jsx
import Script from '../common/ScriptLoader';
import React from 'react';

class QualarooLoader extends React.Component {
    _onCreate = () => {
        window._kiq = window._kiq || [];
    };
    
    _onSuccess = () => {
        const userStr = localStorage.getItem('user');
        const user = JSON.parse(userStr);
        if (!user) return;

        const email = user.email;
        window._kiq.push(['identify', email]);
    };
    
    _onError = error => {
        throw new Error(`Could not load ${error.outerHTML}`);
    };

    render() {
        return (
            <Script
                src="//s3.amazonaws.com/ki.js/<id>/fFn.js"
                type="text/javascript"
                onCreate={this._onCreate}
                onSuccess={this._onSuccess}
                onError={this._onError}
                defer
            />
        );
    }
}

export default QualarooLoader;
```

> We strongly suggest using the attributes `async` and `defer` (depending on
> your situation). Here is a good [explanation](http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html).

Then we call our new wrapper in our app:
``` jsx
import React from 'react';
import Qualaroo from 'QualarooLoader';

class MyApp extends React.Component {
    /* ... */
    render() {
        return (
            <>
                {/* Other Components */}
                <Qualaroo delayMs={500}/>
            </>
        );
    }
}
```

## API

### src

> `string` | _required_

URI that specifies the location of your script.

### delayMs

> `number` | defaults to `0`

Artifically adds a delay in milliseconds after the component mounts, but before
the script tag is appended to the document. Useful for scripts that are not
necessary early on, and may conflict on the browser's request-limit.

### onCreate

> `function()` | defaults to `Function.prototype`

A callback function that is called just right after the `script` tag has been
appended to the document.

### onLoad

> `function(event: Event)` | defaults to `Function.prototype`

This function is called after the script has been successfully loaded. 

### onError

> `function(error: Event)` | defaults to `throw new URIError(...)`

If there is a problem loading your script, this function is called.


### Other Props ⚠️

As stated previously, this component supports all the
[attributes](https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement)
that the html `script` tag supports. You simply have to pass it as props to the
`<Script>` component. In fact, any other prop that is not listed above will
be appended as-is to the native `script` tag.

We have tested it with the following attributes: `type`, `chartset`, `async`,
`defer`, `crossOrigin`, and `noModule`. (Everything else should work
nevertheless).

## Roadmap

- [x] Document the component
- [x] Write examples
- [ ] Write tests
- [ ] Prevent appending scripts twice when component re-mounts

Feel free to file an [issue](https://github.com/gumgum/react-script-tag/issues)
to suggest changes!

## Contributors

Thanks goes to these people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars.githubusercontent.com/u/10554515?v=4" width="100px;"/><br /><sub><b>Jose Santos</b></sub>](https://github.com/JMSantos94)<br />[💻](https://github.com/gumgum/react-script-tag/commits?author=JMSantos94 "Code") [📖](https://github.com/gumgum/react-script-tag/commits?author=JMSantos94 "Documentation") [⚠️](https://github.com/gumgum/react-script-tag/commits?author=JMSantos94 "Tests") [👀](#review-JMSantos94 "Reviewed Pull Requests") [🐛](https://github.com/paypal/downshift/issues?q=author%3AJMSantos94 "Bug reports") [💡](#example-JMSantos94 "Examples") [🤔](#ideas-JMSantos94 "Ideas, Planning, & Feedback") | [<img src="https://avatars.githubusercontent.com/u/3135772?v=4" width="100px;"/><br /><sub><b>Serge Basile</b></sub>](https://github.com/serge20)<br /> [🤔](#ideas-serge20 "Ideas, & Feedback") |
| :---: | :---: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification.
Contributions of any kind welcome!

## License
MIT

