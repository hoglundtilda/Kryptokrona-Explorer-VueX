<template>
  <div class="table">
    <section class="table-header">
      <i class="fas fa-chart-bar"></i>
      <h2>Stats</h2>
    </section>
    <section class="content">
      <section class="left">
        <div class="stats">
          <i class="fas fa-bars"></i>
          <p>Height:</p>
          <p>311.479</p>
        </div>
        <div class="stats">
          <i class="fas fa-exchange-alt"></i>
          <p>Transactions:</p>
          <p>3694</p>
        </div>
        <div class="stats">
          <i class="fas fa-money-bill-alt"></i>
          <p>Reward:</p>
          <p>374.445</p>
          <p>XKR</p>
        </div>
        <div class="stats">
          <i class="fas fa-certificate"></i>
          <p>Supply:</p>
          <p>344.456,234</p>
          <p>XKR</p>
        </div>
        <div class="stats">
          <i class="fas fa-percentage"></i>
          <p>Emission:</p>
          <p>13.458</p>
          <p>%</p>
        </div>
      </section>
      <section class="right">
        <div class="stats">
          <i class="fas fa-unlock"></i>
          <p>Difficulty:</p>
          <p>1</p>
          <p>M</p>
        </div>
        <div class="stats">
          <i class="fas fa-lock"></i>
          <p>Avarage Difficulty:</p>
          <p>....</p>
        </div>
        <div class="stats">
          <i class="fas fa-tachometer-alt"></i>
          <p>Supply:</p>
          <p>374.445,345</p>
          <p>XKR</p>
        </div>
        <div class="stats">
          <i class="fas fa-clock"></i>
          <p>Avarage Hash Rate:</p>
          <p>...</p>
        </div>
      </section>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";
@import "../../assets/scss/textStyles.scss";

.table {
  display: flex;
  flex-direction: column;
  margin: 1rem 0.5rem 0.5rem 0;
  box-shadow: $boxShadow;
  width: 100%;
  background: $tablebg;

  .table-header {
    display: flex;
    background: $tableHeader;
    height: 3.2rem;
    padding: 0 0.7rem;
    align-items: center;

    i {
      padding-right: 0.5rem;
    }
  }

  .content {
    padding: 2rem 3.2rem;
    width: 100%;
    display: flex;
    justify-content: space-between;

    .left,
    .right {
      display: flex;
      flex-direction: column;
    }
    .stats {
      display: flex;
      margin: 2rem 0;

      p {
        padding-right: 0.5rem;
      }

      i {
        padding-right: 1.5rem;
      }
    }
  }
}
</style>