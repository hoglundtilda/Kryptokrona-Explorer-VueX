<template>
  <div class="table">
    <section class="table-header">
      <i class="fas fa-chart-area"></i>
      <h2>Chart</h2>
      <div  class="info">
        <!-- @mouseenter="show = true" @mouseleave="show = false" -->
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
      <div class="random">
        <TrendChart
          :datasets="datasets"
          :grid="grid"
          :labels="labels"
          :min="0"
          :interactive="true"
          @mouse-move="onMouseMove"
          class="random-chart"
        />
        <div
          id="pop"
          role="tooltip"
          ref="tooltip"
          class="tooltip"
          :class="{'is-active': tooltipData}"
        >
          <div class="tooltip-container" v-if="tooltipData">
            <strong>{{labels.xLabels[tooltipData.index]}}</strong>
            <div class="tooltip-data">
              <div class="tooltip-data-item tooltip-data-item--1">{{tooltipData.data[0]}}</div>
              <div class="tooltip-data-item tooltip-data-item--2">{{tooltipData.data[1]}}</div>
              <div class="tooltip-data-item tooltip-data-item--3">{{tooltipData.data[2]}}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TrendChart from "../chart/trend-chart";
export default {
  components: {
    TrendChart
  },
  data: () => {
    return {
      show: false,
      datasets: [
        {
          data: [],
          smooth: true,
          showPoints: true,
          fill: true,
          className: "curve1"
        },
        {
          data: [],
          smooth: true,
          showPoints: true,
          className: "curve2"
        },
        {
          data: [],
          smooth: true,
          showPoints: true,
          className: "curve3"
        }
      ],
      grid: {
        verticalLines: true,
        horizontalLines: true
      },
      labels: {
        xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yLabels: 5,
        yLabelsTextFormatter: val => Math.round(val * 100) / 100
      },
      tooltipData: null,
      popper: null,
      popperIsActive: false
    };
  },
  computed: {
    recentData() {
      console.log(this.$store.state.getBlocksData.recentBlocks);
      return this.$store.state.getBlocksData.recentBlocks;
    }
  },
  watch: {
    recentData() {
      const height = [];
      const transactions = [];
      const difficulty = [];
      console.log(this.recentData);
      for (let i = 0; i < this.recentData.length; i++) {
        height.push(this.recentData[i].height);
        transactions.push(this.recentData[i].tx_count);
        difficulty.push(this.recentData[i].difficulty);
      }
      this.datasets[0].data = height;
      this.datasets[1].data = transactions;
      this.datasets[2].data = difficulty;
      console.log("height " + height);
      console.log("transactions " + transactions);
      console.log("diff " + difficulty);
    }
  },

  methods: {
    /* initPopper() {
      const chart = document.querySelector(".random-chart");
      const ref = chart.querySelector(".active-line");
      const tooltip = this.$refs.tooltip;
      this.popper = new Popper(ref, tooltip, {
        placement: "right",
        modifiers: {
          offset: { offset: "0,10" },
          preventOverflow: {
            boundariesElement: chart
          }
        }
      });
    }, */
    onMouseMove(params) {
      this.popperIsActive = !!params;
      this.popper.scheduleUpdate();
      this.tooltipData = params || null;
    }
  },
  created() {
    this.$store.dispatch("fetchLiveStats");
  },
  mounted() {
    this.initPopper();
  }
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
    height: 2.8rem;
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

.random {
  width: 100%;
  .vtc {
    height: 250px;
    font-size: 12px;
    @media (min-width: 699px) {
      height: 320px;
    }
  }
  .labels {
    stroke: rgba(0, 0, 0, 0.05);
  }
  .active-line {
    stroke: rgba(0, 0, 0, 0.2);
  }
  .point {
    stroke-width: 2;
    transition: stroke-width 0.2s;
  }
  .point.is-active {
    stroke-width: 5;
  }
  .curve1 {
    .stroke {
      stroke: #fbac91;
      stroke-width: 2;
    }
    .fill {
      fill: #fbac91;
      opacity: 0.05;
    }
    .point {
      fill: #fbac91;
      stroke: #fbac91;
    }
  }
  .curve2 {
    .stroke {
      stroke: #fbe1b6;
      stroke-width: 2;
    }
    .point {
      fill: #fbe1b6;
      stroke: #fbe1b6;
    }
  }
  .curve3 {
    .stroke {
      stroke: #7fdfd4;
      stroke-width: 2;
    }
    .point {
      fill: #7fdfd4;
      stroke: #7fdfd4;
    }
  }

  .tooltip {
    &:not(.is-active) {
      display: none;
    }
    padding: 10px;
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    pointer-events: none;
    &-data {
      display: flex;
      &-item {
        display: flex;
        align-items: center;
        &:not(:first-child) {
          margin-left: 20px;
        }
        &:before {
          content: "";
          display: block;
          width: 15px;
          height: 15px;
          margin-right: 5px;
        }
        &--1:before {
          background: #fbac91;
        }
        &--2:before {
          background: #fbe1b6;
        }
        &--3:before {
          background: #7fdfd4;
        }
      }
    }
  }
}
</style>
