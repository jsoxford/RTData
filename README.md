# RTData
Data sources for RTHack

This is a set of scripts that publish data for RTHack.


## Setup

1. create an `.env` file with credentials (see `.env.example` for template)
2. `npm install`

## Publishing data

```bash
# example script - publishes the current time 
# as `time` events on `example` channel
node time.js

# todo - more scripts
```

## Viewing data

```bash
# start a web server on http://localhost:3000
node frontend.js
```