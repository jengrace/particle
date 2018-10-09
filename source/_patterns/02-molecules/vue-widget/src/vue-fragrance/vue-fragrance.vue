<template>
  <div>
    <div class="row">
      <div
        v-for="cat in spectrum"
        :key="cat"
        class="spectrum d-flex"
      >
        <div
          v-for="fragrance in cat"
          :key="fragrance.names.short"
        >
          <img :src="`${imgUrlSpectrum}/${ fragrance.img.spectrum}`">
        </div>
      </div>
    </div>

    <div class="row text-center text-uppercase">
      <div
        v-for="cat in categories"
        :key="cat"
        class="col bg-light border border-secondary"
      >
        {{ cat }}
      </div>
    </div>
  </div>
</template>

<script>
const fragrances = [
  {
    id: 10101,
    names: {
      short: 'Lemon Basil & Mandarin',
      long: 'Lemon Basil & Mandarin Cologne',
    },
    cat: 'citrus',
    pizazz: 0,
    img: {
      combiner: 'limebasilmandarin.jpg',
      spectrum: 'spectrum-lime_basil.jpg',
    },
    price: {
      30: 68.0,
      100: 136.0,
    },
    companion: {
      warmer: 9900,
      fresher: 10066,
    },
    isStarter: true,
  },
  {
    id: 9900,
    names: {
      short: 'Pomegranate Noir',
      long: 'Pomegranate Noir Cologne',
    },
    cat: 'fruity',
    pizazz: 0,
    img: {
      combiner: 'pomegranatenoir.jpg',
      spectrum: 'spectrum-pomegranate_noir.jpg',
    },
    price: {
      30: 68.0,
      100: 136.0,
    },
    companion: {
      warmer: undefined,
      fresher: 12553,
    },
    isStarter: true,
  },
  {
    id: 10041,
    names: {
      short: 'Grapefruit',
      long: 'Grapefruit Cologne',
    },
    cat: 'citrus',
    pizazz: 1,
    img: {
      combiner: 'grapefruit.jpg',
      spectrum: 'spectrum-grapefruit.jpg',
    },
    price: {
      30: 68.0,
      100: 136.0,
    },
    companion: {
      warmer: 27028,
      fresher: 10101,
    },
    isStarter: true,
  },
];

export default {
  name: 'VueFragranceCombining',
  data() {
    return {
      catOrder: [
        'citrus',
        'fruity',
        'light floral',
        'floral',
        'spicy',
        'woody',
      ],
      fragrances,
      imgUrlCombiner:
        'https://www.jomalone.com/media/export/cms/fragrancecombiner/product_combiner_images',
      imgUrlSpectrum:
        'https://www.jomalone.com/media/export/cms/fragrancecombiner/spectrum_images',
    };
  },
  computed: {
    starters() {
      return this.fragrances.filter(({ isStarter }) => isStarter);
    },
    categories() {
      return [...new Set(this.starters.map(({ cat }) => cat))];
    },
    spectrum() {
      return this.catOrder.map(masterCat =>
        this.starters
          .filter(({ cat: fragranceCat }) => masterCat === fragranceCat)
          .sort(({ pizazz }) => pizazz)
      );
    },
  },
};
</script>
