<template>
  <div class="checkTXN">
    <Header class="header" />
    <section class="check-transactions">
      <h1 class="checkTxn-headline">
        <i class="fas fa-exchange-alt"></i>Check Transactions
      </h1>
      <div class="checkTxn-inputs">
        <p class="checkTxn-label">Transaction Hash:</p>
        <input v-model="transaction_hash"
          type="text"
          class="search-input"
          placeholder="64 character transaction id"
        />
      </div>
      <div class="checkTxn-inputs">
        <div class="radio-buttons">
          <p class="checkTxn-label">Private Key:</p>
          <input class="checkTxn-label" type="radio" />
          <p class="checkTxn-label">TXN Key</p>
          <input class="checkTxn-label" type="radio" />
          <p class="checkTxn-label">View Key</p>
        </div>
        <input v-model="private_key"
          type="text"
          class="search-input"
          placeholder="64 character private view or TXN key"
        />
      </div>
      <div class="checkTxn-inputs">
        <p class="checkTxn-label">Recipient Public Adress:</p>
        <input v-model="public_adress"
          type="text"
          class="search-input long-length"
          placeholder="99 character public KKR adress"
        />
      </div>
      <button @click="checkTransaction" class="btn">Check Transaction</button>
    </section>
    <section class="table">
      <section class="table-header">
        <i class="fas fa-database"></i>
        <h2>Owned Outputs for</h2>
        <i class="fas fa-question question"></i>
      </section>
      <section class="content">
        <div class="stats">
          <i class="fas fa-money-bill-alt"></i>
          <p>Amount</p>
        </div>
        <div class="stats">
          <i class="fas fa-key"></i>
          <p>Key</p>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import Header from "../components/header";

export default {
  name: "Explorer",
  components: {
    Header,
  },
  data: () => {
    return {
      transaction_hash: "",
      privateKey: "",
      public_adress: ""
    }
  },
  methods: {
    checkTransaction() {
      this.$store.dispatch("checkTXN", this.transaction_hash)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
@import "../assets/scss/textStyles.scss";

.checkTXN {
  display: grid;
  width: 100%;
  column-gap: 2rem;
  row-gap: 2rem;
  grid-template-areas: "head" "check" "blocks";
}

.header {
  grid-area: head;
}

.checkTransactions {
  display: flex;
  grid-area: check;
}

.checkTxn-headline {
  font-size: $checkTxnHeadline;
  color: $menu;
  letter-spacing: 2px;

  i {
    font-size: $checkTxn-Icon;
    padding-right: 1rem;
  }
}

.checkTxn-inputs {
  display: flex;
  flex-direction: column;
  .checkTxn-label {
    color: $white;
    font-size: $checkTXN-labels;
    margin: 2.5rem 0 0.75rem 0;
  }

  .radio-buttons {
    display: flex;
    align-items: center;

    input {
      margin-left: 4rem;
      margin-right: 0.5rem;
    }

    p {
      color: $white;
      font-size: $checkTXN-labels;
    }
  }

  .search-input {
    height: 3.2rem;
    width: 85rem;
    font-family: $fontFamily;
    font-size: 1.6rem;
    background: $dark;
    color: $white;
    border: none;
    padding: 0 0.5rem;
  }

  .long-length {
    width: 85rem;
  }

  ::placeholder {
    font-size: 1.2rem;
    letter-spacing: 2px;
    opacity: 0.3;
    color: $placeholder;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
  }
}

.btn {
  margin: 3rem 0;
  padding: 1rem 1.2rem;
  cursor: pointer;
}

.table {
  grid-area: blocks;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem 0.5rem 0.5rem 0;
  box-shadow: $boxShadow;
  width: 100%;
  height: auto;
  background: $tablebg;

  .table-header {
    display: flex;
    background: $tableHeader;
    height: 2.8rem;
    padding: 0 0.7rem;
    align-items: center;

    i {
      padding-right: 1rem;
    }

    .question {
      margin-left: auto;
    }
  }
}

.content {
  margin: 0 2.2rem;
  padding: 2rem 3.2rem;
  display: grid;
  grid-template-columns: 50% 50%;

  .stats {
    display: flex;
    margin: 1rem 0;

    p {
      padding-right: 0.5rem;
    }

    i {
      padding-right: 1.5rem;
    }
  }
}
</style>
