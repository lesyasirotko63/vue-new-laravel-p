<template>
  <v-card class="mt-6 py-3">
    <form @submit.prevent="submitHandler">
      <div class="px-8">
        <v-row>
          <v-col cols="12">
            <h4 class="page-title">Edit Promo_codes</h4>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Code</p>
          </v-col>
          <v-col cols="9">
            <v-text-field label="Code" v-model="code"></v-text-field>
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
            <p class="fs-normal greyBold--text mb-0">Products</p>
          </v-col>
          <v-col cols="9">
            <v-autocomplete
              v-model="products"
              :items="optionsProducts.map((item) => item.label)"
              label="Products"
              :search-input.sync="searchModelProducts"
              multiple
            ></v-autocomplete>
          </v-col>

          <v-col cols="12 mt-5">
            <v-btn type="submit" color="primary" :loading="loading">
              Save
            </v-btn>

            <v-btn @click="formatData" class="ml-2"> Reset </v-btn>

            <router-link :to="cancelUrl" class="text-decoration-none">
              <v-btn type="button" class="ml-2"> Cancel </v-btn>
            </router-link>
          </v-col>
        </v-row>
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
        code: '',

        discount: '',

        products: [],
        searchModelProducts: '',
      };
    },
    computed: {
      ...mapState({
        data: (state) => state.promo_codesForm.data,
        loading: (state) => state.promo_codesForm.loading,

        optionsProducts: (state) => state.promo_codesForm.searchResultProducts,
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
        getData: 'promo_codesForm/getData',

        searchProducts: 'promo_codesForm/searchProducts',

        edit: 'promo_codesForm/edit',
      }),
      async submitHandler() {
        const data = this.data;

        data.code = this.code;

        data.discount = this.discount;

        data.products = this.products;

        data.products = this.products.length
          ? this.products.map((item) => {
              const el = this.optionsProducts.filter((i) => i.label === item);
              if (el.length) return el[0].id;
              else return null;
            })
          : [];

        try {
          await this.edit({ id: this.id, data });
          this.$router.push('/admin/promo_codes');
        } catch (e) {
          this.showSnackbar(e);
        }
      },

      formatData() {
        this.code = this.data.code;

        this.discount = this.data.discount;

        this.products = dataFormatter.productsManyListFormatterEdit(
          this.data.products,
        );
      },
    },
    async beforeMount() {
      try {
        await this.searchProducts();

        const pathArray = this.$route.fullPath.split('/');
        const id = pathArray[pathArray.length - 2];
        this.id = id;
        await this.getData(id);

        this.formatData();
      } catch (e) {
        this.showSnackbar(e);
      }
    },
    watch: {
      async searchModelProducts() {
        await this.searchProducts(this.searchModelProducts);
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
