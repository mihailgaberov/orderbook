# Order Book
An Order Book app built with React/Typescript and powered by WebSockets.

>_I have written a tutorial about how I did this. You can find it [here](https://www.mihailgaberov.com/build-a-real-time-order-book-application-with-react-and-websockets/) or [here](https://www.freecodecamp.org/news/react-websockets-project-build-real-time-order-book-app/)._


<hr />

<!-- prettier-ignore-start -->
[![Tests](https://github.com/mihailgaberov/orderbook/actions/workflows/main.yml/badge.svg)](https://github.com/mihailgaberov/orderbook/actions/workflows/main.yml)
[![Build Status][build-badge]][build]

[build-badge]: https://img.shields.io/github/deployments/mihailgaberov/orderbook/production?label=vercel&logoColor=vercel
[build]: https://github.com/mihailgaberov/orderbook/deployments
<!-- prettier-ignore-end -->

## Tech stack
 - React / Typescript
 - SASS / styled-components
 - WebSockets / react-use-websocket
 - react-testing-library
 
### Screenshots
![Default View](https://github.com/mihailgaberov/orderbook/blob/main/screenshots/default_view.png)

![iPhone 6/7/8](https://github.com/mihailgaberov/orderbook/blob/main/screenshots/iphone678.png)

![Responsive](https://github.com/mihailgaberov/orderbook/blob/main/screenshots/responsive.png)

![XBTUSD Grouping: 1](https://github.com/mihailgaberov/orderbook/blob/main/screenshots/XBTUSD_grouping_1.png)

![ETHUSD Market](https://github.com/mihailgaberov/orderbook/blob/main/screenshots/ETHUSD_market.png)

## Application features:
### I. Order Book
 1. The Order Book consists of two sides: the buy side and the sell side.
 2. Both sides contain information about the amount of orders opened at each price level.
 3. Each level displays the:
    1. Price - this is what defines the level. As orders must be placed at a price that is a
       multiple of the selected markets tick size (0.5) each level will be an increment of 0.5 (as
       long as there is an order open at that level).
    2. Size - the total quantity of contracts derived from open orders that have been placed at
       this level.
    3. Total - the summed amount of contracts derived from open orders that reside in the
       book at this level and above. To calculate the total of a given level we take the size of the
       current level and sum the sizes leading to this price level in the order book. The total is
       also used to calculate the depth visualizer (colored bars behind the levels), the depth of
       each level is calculated by taking that level's total as a percentage of the highest total in
       the book.
### II. Grouping Select Box
 1. By default the orders are grouped by the select markets ticket size (0.5).
 2. Possible toggling of the grouping: between 0.5, 1, 2.5 for XBTUSD market and 0.05, 0.1 and 0.25 for ETHUSD market.
 3. To group levels we combine the levels rounded down to the nearest group size e.g. if we change our grouping from 0.5 to 1 then we would combine the data from prices 1000 and 1000.5 and display it under a single level in the orderbook with the price 1000.

### III. Toggle Feed Button
1. Toggles the selected market between PI_XBTUSD and PI_ETHUSD.
2. Supports dynamic grouping logic - handles groupings for XBT (0.5, 1, 2.5) and groupings for ETH (0.05, 0.1, 0.25).

### IV. Kill Feed Button
1. Clicking this button stops the feed.
2. Clicking this button second time renews the feed.


### Demo
:star: [orderbook-mihailgaberov.vercel.app](https://orderbook-mihailgaberov.vercel.app/) :star:

### Running the app locally

To run the app, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed.
2. Install [yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable/).
3. From the project folder, execute the following commands:

To install dependencies:
```shell
  yarn
```
To run the app:

```shell
  yarn start
```

To run the tests:

```shell
  yarn test
```

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=mihailgaberov/orderbook&type=Date)](https://star-history.com/#mihailgaberov/orderbook&Date)

