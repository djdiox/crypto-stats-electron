const fs = require('fs')
const CoinMarketCap = require('coinmarketcap-api')
const client = new CoinMarketCap(process.env.COINMARKET_CAP_API_KEY)
;(async () => {
  const idMap = await client.getIdMap({ limit: 5000, listingStatus: 'active' })
  const idMap2 = await client.getIdMap({
    start: 5000,
    limit: 5000,
    listingStatus: 'active',
  })
  const coins = [...idMap.data, ...idMap2.data]
  fs.writeFileSync('./static/currencies.json', JSON.stringify(coins, null, 2))
  const globals = await client.getGlobal(process.env.NUXT_ENV_CURRENCY)
  fs.writeFileSync('./static/global_EUR.json', JSON.stringify(globals, null, 2))
  const tickers1 = await client.getTickers({
    limit: 5000,
    cryptocurrencyType: 'all',
    convert: process.env.NUXT_ENV_CURRENCY,
  })
  const tickers2 = await client.getTickers({
    start: 5000,
    limit: 5000,
    cryptocurrencyType: 'all',
    convert: process.env.NUXT_ENV_CURRENCY,
  })
  fs.writeFileSync(
    './static/tickers.json',
    JSON.stringify([...tickers1.data, ...tickers2.data], null, 2)
  )
})()
