<template>
  <div class="table">
    <section class="table-header">
      <i class="fas fa-chart-area"></i>
      <h2>Chart</h2>
      <div @mouseenter="show = true" @mouseleave="show = false" class="info">
        <div v-if="show" class="info-text">
          <p>
            Difficulty based on last blocks from the list below. Block size,
            transactions count. Load more blocks to enlarge chart range.
          </p>
        </div>
        <i class="fas fa-question-circle"></i>
      </div>
    </section>
    <section class="content">
      <p>chart</p>
    </section>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      show: false,
    };
  },
};
</script>

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
    height: 3.6rem;
    padding: 0 0.7rem;
    align-items: center;

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
