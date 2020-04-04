<template>
  <div class="table">
    <section class="table-header">
      <i class="fas fa-chart-area"></i>
      <h2>Graph</h2>
      
    </section>
    <section class="content" >
    
    </section>
  </div>
</template>

<script>
export default {
  data: () => {
    return {

    };
  },
  computed: {
    
},
}
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
    height: 2.8rem;
    padding: 0 0.7rem;
    align-items: center;

    i {
      padding-right: 0.5rem;
    }

 
  }

 
  
}
</style>
