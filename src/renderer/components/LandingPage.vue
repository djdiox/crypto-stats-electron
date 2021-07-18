<template>
  <div id="wrapper">
    <img
      id="logo"
      src="~@/assets/btc.png"
      alt="electron-vue"
    >
    <main>
      <div>
        <p>show currency</p>
        <select
          name="currency"
          id="currency"
          @change="setCurrency(selectedCurrency.substring(selectedCurrency.indexOf('(') + 1, selectedCurrency.lastIndexOf(')')))"
          v-model="selectedCurrency"
        >
          <option
            v-for="currency in currencies"
            v-bind:key="currency.id"
          > {{currency.name}} ({{currency.symbol}})</option>
        </select>
      </div>
      <!-- TradingView Widget BEGIN -->
      <div class="tradingview-widget-container">
        <div id="tradingview_ca661"></div>
      </div>
    </main>
  </div>
</template>

<script>
import fs from 'fs'
import path from 'path'
import SystemInformation from './LandingPage/SystemInformation'
export default {
  name: 'landing-page',
  components: { SystemInformation },
  data() {
    return {
      currencies: [],
      selectedCurrency: 'ETH',
      loaded: false,
    }
  },
  async mounted() {
    this.setCurrency(this.selectedCurrency);
    /* use `path` to create the full path to our asset */
    const pathToAsset = path.join(__static, '/currencies.json')
    /* use `fs` to consume the path and read our asset */
    const fileContents = fs.readFileSync(pathToAsset, 'utf8');
    this.currencies = JSON.parse(fileContents);
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link)
    },
    setCurrency(currency) {
      // this.loaded = false;
      // this.loaded = true;
      this.tradingView = new TradingView.widget(
      {
        "width": 780,
        "height": 610,
        "symbol": `BINANCE:${currency}EUR`,
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "container_id": "tradingview_ca661"
      }
    );
    }
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: block;
  max-width: 500px;
  /* margin: 0 auto; */
  /* display: flex; */
  /* justify-content: space-between; */
}

/* main > div {
  flex-basis: 50%;
} */

.left-side {
  display: flex;
  flex-direction: column;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: 0.8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.doc button.alt {
  color: #42b983;
  background-color: transparent;
}
</style>
