import Vue from 'vue';

import FragranceCombiner from './vue-fragrance.vue';

export default el =>
  new Vue({
    el,
    render: h => h(FragranceCombiner),
  });
