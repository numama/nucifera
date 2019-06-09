import act from "../actions"

const initialState = {
  board = [
    [{"color": "1", "piece": "KY"}, {"color": "1", "piece": "KE"}, {"color": "1", "piece": "GI"}, {"color": "1", "piece": "KI"}, {"color": "1", "piece": "OU"}, {"color": "1", "piece": "KI"}, {"color": "1", "piece": "GI"}, {"color": "1", "piece": "KE"}, {"color": "1", "piece": "KY"}],
    [{}, {"color": "1", "piece": "HI"}, {}, {}, {}, {}, {}, {"color": "1", "piece": "KA"}, {}],
    [{"color": "1", "piece": "FU"}, {"color": "1", "piece": "FU"}, {"color": "1", "piece": "FU"}, {"color": "1", "piece": "FU"}, {"color": "1", "piece": "FU"}, {"color": "1", "piece": "FU"}, {"color": "1", "piece": "FU"}, {"color": "1", "piece": "FU"}, {"color": "1", "piece": "FU"}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{"color": "0", "piece": "FU"}, {"color": "0", "piece": "FU"}, {"color": "0", "piece": "FU"}, {"color": "0", "piece": "FU"}, {"color": "0", "piece": "FU"}, {"color": "0", "piece": "FU"}, {"color": "0", "piece": "FU"}, {"color": "0", "piece": "FU"}, {"color": "0", "piece": "FU"}],
    [{}, {"color": "0", "piece": "KA"}, {}, {}, {}, {}, {}, {"color": "0", "piece": "HI"}, {}],
    [{"color": "0", "piece": "KY"}, {"color": "0", "piece": "KE"}, {"color": "0", "piece": "GI"}, {"color": "0", "piece": "KI"}, {"color": "0", "piece": "GY"}, {"color": "0", "piece": "KI"}, {"color": "0", "piece": "GI"}, {"color": "0", "piece": "KE"}, {"color": "0", "piece": "KY"}]
  ],
  players:["",""],
  turn:0,
  time:[0,0],
  moves:[],
  moveMode:false
}

export default function shogiReducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    default:
      return state;
  }
}
