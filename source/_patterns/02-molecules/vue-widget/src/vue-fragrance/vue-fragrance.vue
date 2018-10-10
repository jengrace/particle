<template>
  <div class="fragrance-combiner">

    <div class="row">
      <h2 class="col text-center mb-5">Step 1. Choose your favorite fragrance</h2>
    </div>

    <div class="spectrum row no-gutters">
      <div
        v-for="category in spectrum"
        :key="category.category"
        class="spectrum-category col text-center text-uppercase"
      >
        <div class="spectrum-category__images d-flex">
          <div
            v-for="fragrance in category.fragrances"
            :key="fragrance.id"
            :style="{backgroundImage: `url(${imgUrl.spectrum}/${ fragrance.img.spectrum})`}"
            class="spectrum-category__image h-100"
            :class="{highlighted: fragrance.isHighlighted, chosen: fragrance.isChosen}"
            @mouseover="highlight(fragrance)"
            @click="choose(fragrance)"
          />
        </div>

        <div
          class="spectrum-category__category border border-secondary"
          :class="{'highlighted-category': category.isCatHighlighted}"
          @mouseover="highlight(category.fragrances[0])"
        >
          {{ category.category }}
        </div>

        <ul class="spectrum-category__text list-unstyled small">
          <li
            v-for="fragrance in category.fragrances"
            :key="fragrance.id"
            :class="{highlighted: fragrance.isHighlighted, chosen: fragrance.isChosen}"
            @mouseover="highlight(fragrance)"
            @click="choose(fragrance)"
          >
            {{ fragrance.names.short }}
          </li>
        </ul>
      </div>
    </div>

    <div class="combiner">
      <h2 class="text-center my-3">Step 2. Choose your combination</h2>
      <div class="row justify-content-center">
        <div class="25">
          <form>
            <div class="form-row align-items-center">
              <div class="col-auto my-1">Make it</div>
              <div class="col-auto my-1">
                <label
                  class="mr-sm-2 sr-only"
                  for="inlineFormCustomSelect"
                >Select companion fragrance</label>
                <select
                  id="inlineFormCustomSelect"
                  v-model="companion"
                  class="custom-select mr-2"
                >
                  <option
                    selected
                    value="warmer"
                  >Warmer</option>
                  <option value="fresher">Fresher</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row justify-content-center no-gutters mt-3">
        <div class="fragrance fragrance--combiner col-auto text-center">
          <div>
            <img
              :src="`${imgUrl.combiner}/${chosen.img.combiner}`"
              :alt="chosen.names.short"
            >
          </div>
          <p class="text-uppercase bold"><strong>{{ chosen.names.long }}</strong></p>
          <p class="text-capitalize">{{ chosen.cat }}</p>
          <p>
            <span
              v-for="(size, cost) in chosen.price"
              :key="chosen.id + size"
              class="fragrance__size-price"
            >
              ${{ cost }} {{ size }}ml
            </span>
          </p>
          <button class="btn btn-primary text-uppercase">Shop now</button>
        </div>
        <div class="fragrance fragrance--combiner col-auto text-center">
          <div>
            <img
              :src="`${imgUrl.combiner}/${companionFrag.img.combiner}`"
              :alt="companionFrag.names.short"
            >
          </div>
          <p class="text-uppercase bold"><strong>{{ companionFrag.names.long }}</strong></p>
          <p class="text-capitalize">{{ companionFrag.cat }}</p>
          <p>
            <span
              v-for="(size, cost) in companionFrag.price"
              :key="companionFrag.id + size"
              class="fragrance__size-price"
            >
              ${{ cost }} {{ size }}ml
            </span>
          </p>
          <button class="btn btn-primary text-uppercase">Shop now</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import fragrances, { fallbackFrag } from './fragrances';

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
      imgUrl: {
        combiner:
          'https://www.jomalone.com/media/export/cms/fragrancecombiner/product_combiner_images',
        spectrum:
          'https://www.jomalone.com/media/export/cms/fragrancecombiner/spectrum_images',
      },
      companion: 'warmer',
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
            isCatHighlighted: false,
            fragrances: this.starters
              .filter(({ cat: fragCategory }) => category === fragCategory)
              // Sort order of frags within cat
              .sort(({ pizazz }) => pizazz),
          }))
          // Only show categories which have fragrances
          .filter(category => !!category.fragrances.length)
          // Highlight category if it contains any highlighted frag
          .map(
            category =>
              category.fragrances.some(frag => frag.isHighlighted)
                ? { ...category, isCatHighlighted: true }
                : category
          )
      );
    },
    chosen() {
      return this.starters.find(frag => frag.isChosen);
    },
    companionFrag() {
      return (
        this.fragrances.find(
          ({ id }) => this.chosen.companion[this.companion] === id
        ) || fallbackFrag
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
    choose(chosenFrag) {
      this.companion = 'warmer';
      this.fragrances = this.fragrances.map(frag => ({
        ...frag,
        isChosen: frag.id === chosenFrag.id,
      }));
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
.spectrum-category__category {
  background-color: theme-color(light);
}
.spectrum-category__image,
.spectrum-category__text,
.spectrum-category__category {
  cursor: pointer;
}

// Combine for image and text since they don't affect each other
.highlighted,
.chosen {
  background-position: center bottom;
  text-decoration: underline;
}
.highlighted-category {
  background-color: theme-color(dark);
  color: theme-color(light);
}
.fragrance__size-price + .fragrance__size-price:before {
  content: '/ ';
}
</style>
