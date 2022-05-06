<template>
  <v-card class="mt-6 py-3">
    <form @submit.prevent="submitHandler">
      <div class="px-8">
        <v-row>
          <v-col cols="12">
            <h4 class="page-title">New Products</h4>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Title</p>
          </v-col>
          <v-col cols="9">
            <v-text-field label="Title" v-model="title"></v-text-field>
          </v-col>

          <ImageUploader
            label="Image"
            id="AF419-1D53-AF5E-B3DD"
            url="products/image"
            :images="image"
            @change="imageAdd"
            @del="imageDel"
          />

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Price</p>
          </v-col>
          <v-col cols="9">
            <v-text-field
              type="number"
              label="Price"
              v-model.number="price"
            ></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Discount</p>
          </v-col>
          <v-col cols="9">
            <v-text-field
              type="number"
              label="Discount"
              v-model.number="discount"
            ></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Description</p>
          </v-col>
          <v-col cols="9">
            <v-textarea label="Description" v-model="description"></v-textarea>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Categories</p>
          </v-col>
          <v-col cols="9">
            <v-autocomplete
              v-model="categories"
              :items="optionsCategories.map((item) => item.label)"
              label="Categories"
              :search-input.sync="searchModelCategories"
              multiple
            ></v-autocomplete>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">More Products</p>
          </v-col>
          <v-col cols="9">
            <v-autocomplete
              v-model="moreProducts"
              :items="optionsMoreProducts.map((item) => item.label)"
              label="More Products"
              :search-input.sync="searchModelMoreProducts"
              multiple
            ></v-autocomplete>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Rating</p>
          </v-col>
          <v-col cols="9">
            <v-text-field
              type="number"
              label="Rating"
              v-model.number="rating"
            ></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Status</p>
          </v-col>
          <v-col cols="9">
            <v-radio-group v-model="status" row>
              <v-col cols="12" sm="4" md="4">
                <v-radio label="in stock" value="in stock"></v-radio>
              </v-col>

              <v-col cols="12" sm="4" md="4">
                <v-radio label="out of stock" value="out of stock"></v-radio>
              </v-col>
            </v-radio-group>
          </v-col>
        </v-row>
        <v-btn type="submit" color="primary" :loading="loading"> Save </v-btn>

        <v-btn @click="resetData" class="ml-2"> Reset </v-btn>

        <router-link :to="cancelUrl" class="text-decoration-none">
          <v-btn type="button" class="ml-2"> Cancel </v-btn>
        </router-link>
      </div>
    </form>
  </v-card>
</template>
<script>
  import { mapState, mapActions, mapMutations } from 'vuex';
  import dataFormatter from '@/use/dataFormatter.js';
  import ImageUploader from '@/components/Uploaders/ImageUploader';
  import FileUploader from '@/components/Uploaders/FileUploader';

  export default {
    data() {
      return {
        id: null,

        title: '',

        image: [],

        price: 0,

        discount: 0,

        description: '',

        categories: [],
        searchModelCategories: '',

        moreProducts: [],
        searchModelMoreProducts: '',

        rating: 0,

        status: 'in stock',
      };
    },
    computed: {
      ...mapState({
        data: (state) => state.productsForm.data,
        loading: (state) => state.productsForm.loading,

        optionsCategories: (state) => state.productsForm.searchResultCategories,

        optionsMoreProducts: (state) =>
          state.productsForm.searchResultMoreProducts,
      }),

      cancelUrl() {
        return (
          '/' + this.$route.fullPath.split('/').slice(1).splice(0, 2).join('/')
        );
      },
      dataFormatter() {
        return dataFormatter;
      },
    },
    methods: {
      ...mapMutations({
        showSnackbar: 'snackbar/showSnackbar',
      }),
      ...mapActions({
        searchCategories: 'productsForm/searchCategories',

        searchMoreProducts: 'productsForm/searchMoreProducts',

        newHandler: 'productsForm/newHandler',
      }),
      async submitHandler() {
        const data = {
          title: this.title,

          image: this.image,

          price: this.price,

          discount: this.discount,

          description: this.description,

          categories: this.categories,

          moreProducts: this.moreProducts,

          rating: this.rating,

          status: this.status,
        };

        data.categories = this.categories.length
          ? this.categories.map((item) => {
              const el = this.optionsCategories.filter((i) => i.label === item);
              if (el.length) return el[0].id;
              else return null;
            })
          : [];

        data.moreProducts = this.moreProducts.length
          ? this.moreProducts.map((item) => {
              const el = this.optionsMoreProducts.filter(
                (i) => i.label === item,
              );
              if (el.length) return el[0].id;
              else return null;
            })
          : [];

        try {
          await this.newHandler({ data });
          this.$router.push('/admin/products');
        } catch (e) {
          console.log(e);
          this.showSnackbar(e);
        }
      },

      imageAdd(val) {
        this.image.push(val);
      },
      imageDel(id) {
        this.image = this.image.filter((img) => img.id !== id);
      },

      resetData() {
        this.title = '';

        this.image = [];

        this.price = 0;

        this.discount = 0;

        this.description = '';

        this.categories = [];

        this.moreProducts = [];

        this.rating = 0;

        this.status = 'in stock';
      },
    },
    async beforeMount() {
      await this.searchCategories();

      await this.searchMoreProducts();
    },
    watch: {
      async searchModelCategories() {
        await this.searchCategories(this.searchModelCategories);
      },

      async searchModelMoreProducts() {
        await this.searchMoreProducts(this.searchModelMoreProducts);
      },
    },
    components: {
      ImageUploader,
      FileUploader,
      VDatetimePicker: () =>
        import('vuetify-datetime-picker/src/components/DatetimePicker.vue'),
    },
  };
</script>
