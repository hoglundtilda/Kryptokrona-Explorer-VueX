<template>
  <div class="table">
    <section class="table-header">
      <i class="fas fa-exchange-alt"></i>
      <h2>Transaction Pool</h2>
      <div @mouseenter="show = true" @mouseleave="show = false" class="info">
        <div v-if="show" class="info-text">
          <p>Recent transactions waiting to be included into a block. Once it happens a transaction gets into the blockchain and becomes confirmed.</p>
        </div>
        <i class="fas fa-question-circle"></i>
      </div>
    </section>
    <section class="content">
      <div class="stats">
        <i class="fas fa-money-bill-alt"></i>
        <p>Amount</p>
      </div>
      <div class="stats">
        <i class="fas fa-tag"></i>
        <p>Fee</p>
      </div>
      <div class="stats">
        <i class="fas fa-archive"></i>
        <p>Size</p>
      </div>
      <div class="stats">
        <i class="fas fa-paw"></i>
        <p>Hash</p>
      </div>
      <p class="stats-dark">1223.454</p>
      <p class="stats-dark">1</p>
      <p class="stats-dark">10.567</p>
      <a href class="hash-a">8e3f20988efbbfa5be5478fa158c771d4461cac97c5cd6846ac17cac2bedf689</a>
    </section>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      show: false
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
@import "../assets/scss/textStyles.scss";

.table {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1rem 0.5rem 0.5rem 0;
  box-shadow: $boxShadow;
  background: $tablebg;

  .table-header {
    display: flex;
    align-items: center;
    background: $tableHeader;
    height: 3.2rem;
    padding: 0 0.7rem;

    i {
      padding-right: 0.5rem;
    }

    .info {
      margin-left: auto;

      .info-text {
        position: absolute;
        width: 30rem;
        right: 20rem;
        border-radius: 10px;
        padding: 1rem;
      }
    }
  }

  .content {
    padding: 2rem 3.2rem;
    display: grid;
    row-gap: 1.8rem;
    grid-template-columns: 18% 18% 18% 42%;

    .stats {
      display: flex;
      i {
        padding-right: 1rem;
      }
    }
  }
}
</style>