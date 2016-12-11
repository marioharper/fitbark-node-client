[![Codeship](https://img.shields.io/codeship/374e2e30-8e98-0134-d2c3-1aa5e186178e.svg?style=flat-square)](https://app.codeship.com/projects/185305)
[![npm](https://img.shields.io/npm/v/fitbark-node-client.svg?style=flat-square)](https://www.npmjs.com/package/fitbark-node-client)
# fitbark-node-client

### Node client for FitBark Web API

## Installation

This library is distributed on `npm`. In order to add it as a dependency,
run the following command:

``` sh
$ npm install fitbark-node-client --save
```

## Usage

Example: Get a dog by its name

``` js
const FitBark = require('fitbark-node-client');
const fitBark = new FitBark('your-access-token');

fitBark.getDog('Fido').then((dog) => {
  if (dog) {
      console.log(`retrieved ${dog.name}`);
  } 
}).catch((err) => {
    console.log('there was an error');
});
```
