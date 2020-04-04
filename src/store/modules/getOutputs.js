const outputs = {
  state: {
    outputs: ""
  },
  mutations: {
    renderOutputs(state, data) {
      console.log(data.result)
      state.outputs = data.result

    }
  },
  actions: {
    getOutputs(ctx, hash) {
      const url = this.state.api + "/json_rpc";

      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "test",
          method: "f_transaction_json",
          params: {
            hash: hash,
          },
          dataType: "json",
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data) {
            ctx.commit("renderOutputs", data);
          }
        })
        .catch(error => {
          console.error("Error:", error);
        });
    },
  },
};

export default outputs;
