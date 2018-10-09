<template>
  <div class="fragrance-combiner row no-gutters">

    <div
      v-for="category in spectrum"
      :key="category.category"
      class="spectrum-category col text-center text-uppercase"
    >
      <div class="spectrum-category__images d-flex">
        <div
          v-for="fragrance in category.fragrances"
          :key="fragrance.id"
          :style="{backgroundImage: `url(${imgUrlSpectrum}/${ fragrance.img.spectrum})`}"
          class="spectrum-category__image h-100"
          :class="{highlighted: fragrance.isHighlighted}"
          @mouseover="highlight(fragrance)"
        />
      </div>

      <div
        class="spectrum-category__category bg-light border border-secondary"
        @mouseover="highlightCategory(category.category)"
      >
        {{ category.category }}
      </div>

      <ul class="spectrum-category__text list-unstyled small">
        <li
          v-for="fragrance in category.fragrances"
          :key="fragrance.id"
          :class="{highlighted: fragrance.isHighlighted}"
          @mouseover="highlight(fragrance)"
        >
          {{ fragrance.names.short }}
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import fragrances from './fragrances';

export default {
  name: 'VueFragranceCombining',
  data() {
    return {
      fragrances,
      categories: [
        'citrus',
        'fruity',
        'light floral',
        'floral',
        'spicy',
        'woody',
      ],
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
    spectrum() {
      return (
        this.categories
          // For each category, generate object with category and frags
          .map(category => ({
            category,
            fragrances: this.starters
              .filter(({ cat: fragCategory }) => category === fragCategory)
              // Sort order of frags within cat
              .sort(({ pizazz }) => pizazz),
          }))
          // Only show categories which have fragrances
          .filter(category => !!category.fragrances.length)
      );
    },
  },
  methods: {
    // Choose a frag, only one at a time
    highlight(highlightedFrag) {
      this.fragrances = this.fragrances.map(frag => ({
        ...frag,
        isHighlighted: frag.id === highlightedFrag.id,
      }));
    },
    // To highlight cateogry, just highlight first frag in cat
    highlightCategory(highlightedCategory) {
      const firstFragInCat = this.spectrum.find(
        cat => cat.category === highlightedCategory
      ).fragrances[0];

      this.highlight(firstFragInCat);
    },
  },
};
</script>

<style lang="scss" scoped>
.spectrum-category__images {
  height: 160px;
}
.spectrum-category__image {
  width: 56px;
  background: center top no-repeat;
  background-size: 100% auto;
}
.spectrum-category__image,
.spectrum-category__text,
.spectrum-category__category {
  cursor: pointer;
}
.chosen {
}
// Combine for image and text since they don't affect each other
.highlighted {
  background-position: center bottom;
  text-decoration: underline;
}
.highlighted-category {
  background-color: black;
  color: white;
}
</style>
