<template>
  <div>
    <transition name="fade">
      <NavOverlay v-if="this.$store.state.nav" @closeNav="nav" class="nav-overlay" />
    </transition>
    <div class="transactions">
      <Header class="header" />
      <section class="result">
        <section class="transaction">
          <div class="headline">
            <h1 class="transaction-headline">
              <i class="fas fa-exchange-alt"></i>Transaction
            </h1>
          </div>
          <div class="stats">
            <p>Hash: {{transaction.hash}}</p>
            <p>Confirmations: {{transaction.confirmations}}</p>
            <p>Fee: {{transaction.fee}} XKR</p>
            <p>Sum of Outputs: {{transaction.sumOutputs}} XKR</p>
            <p>Size: {{transaction.size}}</p>
          </div>
        </section>
        <section class="block">
          <div class="headline">
            <h1 class="transaction-headline">
              <i class="fas fa-cubes"></i>In Block
            </h1>
          </div>
          <div class="stats">
            <p>Hash: {{block.hash}}</p>
            <p>Height: {{block.height}}</p>
            <p>Timestamp: {{block.timestamp}}</p>
          </div>
        </section>

        <!-- Inputs -->
        <section v-if="vIn.length > 1" class="table">
          <div class="table-header">
            <h2>Inputs ({{vIn.length}})</h2>
          </div>
          <section class="content">
            <div class="stats">
              <p>
                <i class="fas fa-money-bill-alt"></i>Amount
              </p>
              <p>
                <i class="fas fa-key"></i>Key
              </p>
            </div>
            <li v-for="(transaction, index) in vIn" :key="index" class="outputs">
              <p class="stats-dark">{{transaction.amount}} XKR</p>
              <p class="hash">{{transaction.key}}</p>
            </li>
          </section>
        </section>

        <!-- Outputs -->
        <section class="table">
          <div class="table-header">
            <h2>Outputs ({{vOut.length}})</h2>
          </div>
          <section class="content">
            <div class="stats">
              <p>
                <i class="fas fa-money-bill-alt"></i>Amount
              </p>
              <p>
                <i class="fas fa-key"></i>Key
              </p>
            </div>
            <li v-for="(transaction, index) in vOut" :key="index" class="outputs">
              <p class="stats-dark">{{transaction.amount}} XKR</p>
              <p class="hash">{{transaction.key}}</p>
            </li>
          </section>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
import NavOverlay from "../components/navOverlay";
import Header from "../components/header";

export default {
  components: {
    NavOverlay,
    Header
  },
  data: () => {
    return {
      transaction: {
        hash: "",
        confirmations: "",
        fee: "",
        sumOutputs: "",
        size: ""
      },
      block: {
        hash: "",
        height: "",
        timestamp: ""
      },
      vOut: {
        amount: "",
        key: ""
      },
      vIn: {
        amount: "",
        key: ""
      }
    };
  },
  computed: {
    transactions() {
      return this.$store.state.getOutputs.outputs;
    }
  },
  watch: {
    transactions() {
      const data = this.transactions;

      let confirmations = JSON.parse(localStorage.getItem("lastHeight"));
      this.transaction.confirmations = confirmations - data.block.height;

      this.block.hash = data.block.hash;
      this.block.height = this.localizeNumber(data.block.height);

      const dateTime = new Date(data.block.timestamp * 1000);
      this.block.timestamp = dateTime.toGMTString();

      this.transaction.hash = data.txDetails.hash;
      this.transaction.sumOutputs = this.getReadableCoins(
        data.txDetails.amount_out
      );
      this.transaction.size = data.txDetails.size;
      this.transaction.fee = data.txDetails.fee;
      this.vOut.amount = data.tx.vout[0].amount;

      const vOutArr = [];
      for (let i = 0; i < data.tx.vout.length; i++) {
        const vOut = {
          key: data.tx.vout[i].target.data.key,
          amount: this.getReadableCoins(data.tx.vout[i].amount, 2)
        };

        vOutArr.push(vOut);
      }
      this.vOut = vOutArr;

      const vInArr = [];
      for (let i = 0; i < data.tx.vin.length; i++) {
        const vInput = {
          key: data.tx.vin[i].value.k_image,
          amount: this.getReadableCoins(data.tx.vin[i].value.amount, 2)
        };
        vInArr.push(vInput);
      }
      this.vIn = vInArr;
    }
  },
  methods: {
    localizeNumber(number) {
      const numberFormatter = new Intl.NumberFormat("en-US");
      return numberFormatter.format(number);
    },
    getReadableCoins(coins, digits) {
      const coinUnits = 100;
      const amount = (parseInt(coins || 0) / coinUnits).toFixed(
        digits || coinUnits.toString().length - 1
      );
      return this.localizeNumber(amount);
    },
    checkOrphan(orphan) {
      if (orphan === true) {
        return "YES";
      } else {
        return "NO";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
@import "../assets/scss/textStyles.scss";
@import "../assets/scss/transitions.scss";

.nav-overlay {
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
  background-color: $black;
}

.transactions {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.result {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 5rem;

  .headline {
    h1 {
      font-size: 2.2rem;
      color: $white;
      margin: 1.4rem 0;

      i {
        font-size: 2.2rem;
        margin-right: 1rem;
      }
    }
  }

  .block {
    margin: 2rem 0;
  }

  .stats {
    p {
      margin: 1rem 0;
      word-break: break-all;
    }
  }

  .table {
    display: flex;
    flex-direction: column;
    box-shadow: $boxShadow;
    color: $white;
    margin-top: 3rem;

    .table-header {
      display: flex;
      background: $tableHeader;
      height: 2.8rem;
      padding: 0 0.7rem;
      align-items: center;
    }
    .content {
      padding: 2rem;
    }

    .stats {
      display: grid;
      grid-template-columns: 30% 70%;

      p {
        padding-right: 0.5rem;
      }

      i {
        padding-right: 1.5rem;
      }
    }

    .hash {
      font-size: 1.4rem;
      word-break: break-all;
    }

    .outputs {
      display: grid;
      grid-template-columns: 30% 70%;

      p {
        margin: 1rem 0;
        word-wrap: break-all;
      }
    }
  }
}

@media only screen and (max-width: 700px) {
  .transactions {
    padding: 2rem;
    width: 100vw;
  }

  .stats {
    i {
      display: none;
    }
  }
}
</style>
