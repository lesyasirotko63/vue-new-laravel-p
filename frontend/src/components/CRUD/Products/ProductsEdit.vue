<template>
    <v-card class="mt-6 py-3">
       <form @submit.prevent="submitHandler">
         <div class="px-8">
           <v-row>
           <v-col cols="12">
               <h4 class="page-title">Edit Products</h4>
           </v-col>

           <v-col cols="3" class="d-flex align-center">
               <p class="fs-normal greyBold--text mb-0">Title</p>
           </v-col>
           <v-col cols="9">
               <v-text-field
                 label="Title"
                 v-model="title"
               ></v-text-field>
           </v-col>

            <ImageUploader
                label="Image"
                id="AF873-B1CF-71EE-1B5D"
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
               <v-textarea
                   label="Description"
                   v-model="description"
               ></v-textarea>
           </v-col>

           <v-col cols="3" class="d-flex align-center">
               <p class="fs-normal greyBold--text mb-0">Categories</p>
           </v-col>
           <v-col cols="9">
               <v-autocomplete
                   v-model="categories"
                   :items="optionsCategories.map(item => item.label)"
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
                   :items="optionsMoreProducts.map(item => item.label)"
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
                  <v-radio
                    label="in stock"
                    value="in stock"
                  ></v-radio>
                </v-col>

                <v-col cols="12" sm="4" md="4">
                  <v-radio
                    label="out of stock"
                    value="out of stock"
                  ></v-radio>
                </v-col>

            </v-radio-group>
           </v-col>

              <v-col cols="12 mt-5">
                <v-btn
                    type="submit"
                    color="primary"
                    :loading="loading"
                >
                    Save
                </v-btn>

                <v-btn @click="formatData" class="ml-2">
                    Reset
                </v-btn>

                <router-link :to="cancelUrl" class="text-decoration-none">
<v-btn
        type="button"
        class="ml-2"
>
    Cancel
</v-btn>
</router-link>
              </v-col>
            </v-row>
         </div>
      </form>
    </v-card>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import dataFormatter from '@/use/dataFormatter.js'
import ImageUploader from '@/components/Uploaders/ImageUploader'
import FileUploader from '@/components/Uploaders/FileUploader'

export default {
    data () {
      return {

        title: '',

        image: [],

        price: '',

        discount: '',

        description: '',

        categories: [],
        searchModelCategories: '',

        moreProducts: [],
        searchModelMoreProducts: '',

        rating: '',

        status: false,

    }
  },
  computed: {
    ...mapState({
        data: state => state.productsForm.data,
        loading: state => state.productsForm.loading,

        optionsCategories: state => state.productsForm.searchResultCategories,

        optionsMoreProducts: state => state.productsForm.searchResultMoreProducts,

    }),

    cancelUrl() {
        return '/' + this.$route.fullPath
            .split('/')
            .slice(1)
            .splice(0, 2)
            .join('/')
    },
    dataFormatter() {
        return dataFormatter
    }
   },
    methods: {
    ...mapMutations({
        showSnackbar: 'snackbar/showSnackbar',
    }),
    ...mapActions({
        getData: 'productsForm/getData',

        searchCategories: 'productsForm/searchCategories',

        searchMoreProducts: 'productsForm/searchMoreProducts',

        edit: 'productsForm/edit'
    }),
    async submitHandler() {
        const data = this.data

        data.title = this.title

        data.image = this.image

        data.price = this.price

        data.discount = this.discount

        data.description = this.description

        data.categories = this.categories

        data.moreProducts = this.moreProducts

        data.rating = this.rating

        data.status = this.status

                data.categories = this.categories.length
                ? this.categories.map(item => {
                    const el = this.optionsCategories.filter(i => i.label === item)
                    if (el.length) return el[0].id
                    else return null
                  })
                : []

                data.moreProducts = this.moreProducts.length
                ? this.moreProducts.map(item => {
                    const el = this.optionsMoreProducts.filter(i => i.label === item)
                    if (el.length) return el[0].id
                    else return null
                  })
                : []

        try {
            await this.edit({id: this.id, data})
            this.$router.push('/admin/products')
         } catch (e) {
            this.showSnackbar(e)
        }
    },

        imageAdd(val) {
            this.image.push(val)
        },
        imageDel(id) {
            this.image = this.image.filter(img => img.id !== id)
        },

        formatData() {

            this.title = this.data.title

            this.image = this.data.image

            this.price = this.data.price

            this.discount = this.data.discount

            this.description = this.data.description

            this.categories = dataFormatter.categoriesManyListFormatterEdit(this.data.categories)

            this.moreProducts = dataFormatter.productsManyListFormatterEdit(this.data.moreProducts)

            this.rating = this.data.rating

            this.status = this.data.status

        }
     },
    async beforeMount() {
        try {

                await this.searchCategories()

                await this.searchMoreProducts()

            const pathArray = this.$route.fullPath.split('/')
            const id = pathArray[pathArray.length - 2]
            this.id = id
            await this.getData(id)

            this.formatData()
        } catch (e) {
            this.showSnackbar(e)
        }
    },
    watch: {

        async searchModelCategories() {
            await this.searchCategories(this.searchModelCategories)
        },

        async searchModelMoreProducts() {
            await this.searchMoreProducts(this.searchModelMoreProducts)
        },

    },
    components: {ImageUploader, FileUploader, VDatetimePicker: () => import('vuetify-datetime-picker/src/components/DatetimePicker.vue')}
}
</script>

