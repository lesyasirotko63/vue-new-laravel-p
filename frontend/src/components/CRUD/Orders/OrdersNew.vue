        <template>
            <v-card class="mt-6 py-3">
            <form @submit.prevent="submitHandler">
            <div class="px-8">
                <v-row>
                    <v-col cols="12">
                        <h4 class="page-title">New  Orders</h4>
                    </v-col>

    <v-col cols="3" class="d-flex align-center">
        <p class="fs-normal greyBold--text mb-0">Order Date</p>
    </v-col>
    <v-col cols="9">
        <v-datetime-picker label="Order Date" v-model="currentOrderDate"></v-datetime-picker>
    </v-col>

    <v-col cols="3" class="d-flex align-center">
        <p class="fs-normal greyBold--text mb-0">Product</p>
    </v-col>
    <v-col cols="9">
        <v-autocomplete
                v-model="product"
        :items="optionsProduct.map(item => item.label)"
        :search-input.sync="searchModelProduct"
        label="Product"
        >
    </v-autocomplete>
    </v-col>

    <v-col cols="3" class="d-flex align-center">
        <p class="fs-normal greyBold--text mb-0">User</p>
    </v-col>
    <v-col cols="9">
        <v-autocomplete
                v-model="user"
        :items="optionsUser.map(item => item.label)"
        :search-input.sync="searchModelUser"
        label="User"
        >
    </v-autocomplete>
    </v-col>

                <v-col cols="3" class="d-flex align-center">
                    <p class="fs-normal greyBold--text mb-0">Amount</p>
                </v-col>
                <v-col cols="9">
                    <v-text-field
                        type="number"
                        label="Amount"
                        v-model.number="amount"
                    ></v-text-field>
                </v-col>

    <v-col cols="3" class="d-flex align-center">
        <p class="fs-normal greyBold--text mb-0">Status</p>
    </v-col>
    <v-col cols="9">
        <v-radio-group v-model="status" row>

        <v-col cols="12" sm="4" md="4">
            <v-radio
                    label="in cart"
            value="in cart"
            ></v-radio>
            </v-col>

        <v-col cols="12" sm="4" md="4">
            <v-radio
                    label="bought"
            value="bought"
            ></v-radio>
            </v-col>

        </v-radio-group>
    </v-col>

        </v-row>
            <v-btn
                type="submit"
                color="primary"
                :loading="loading"
            >
                Save
            </v-btn>

            <v-btn @click="resetData" class="ml-2">
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
            id: null,

                orderDate: '',

                product: '',
                searchModelProduct: '',

                user: '',
                searchModelUser: '',

                amount: 0,

                status: 'in cart',

            }
    },
    computed: {
        ...mapState({
            data: state => state.ordersForm.data,
            loading: state => state.ordersForm.loading,

                    optionsProduct: state => state.ordersForm.searchResultProduct,

                    optionsUser: state => state.ordersForm.searchResultUser,

        }),

            currentOrderDate: {
            get() {
                return dataFormatter.dateTimeFormatter(this.orderDate)
            },
            set(val) {
                    this.orderDate = val
                }
            },

    cancelUrl() {
        return '/' + this.$route.fullPath
            .split('/')
            .slice(1)
            .splice(0, 2)
            .join('/')
        },
        dataFormatter() {
            return dataFormatter
        },
    },
    methods: {
        ...mapMutations({
            showSnackbar: 'snackbar/showSnackbar',
        }),
        ...mapActions({

                    searchProduct: 'ordersForm/searchProduct',

                    searchUser: 'ordersForm/searchUser',

            newHandler: 'ordersForm/newHandler'
        }),
        async submitHandler() {
            const data = {

                orderDate: this.orderDate,

                product: this.product,

                user: this.user,

                amount: this.amount,

                status: this.status,

            }

                const productEl = this.optionsProduct.filter(i => i.label === this.product)
                data.product = productEl.length ? productEl[0].id : null

                const userEl = this.optionsUser.filter(i => i.label === this.user)
                data.user = userEl.length ? userEl[0].id : null

        try {
                await this.newHandler({data})
                this.$router.push('/admin/orders')
            } catch (e) {
            console.log(e)
                this.showSnackbar(e)
            }
        },

            resetData() {

                    this.orderDate = ''

                    this.product = ''

                    this.user = ''

                    this.amount = 0

                    this.status = 'in cart';

            },
        },
        async beforeMount() {

                await this.searchProduct()

                await this.searchUser()

    },
    watch: {

        async searchModelProduct() {
            await this.searchProduct(this.searchModelProduct)
        },

        async searchModelUser() {
            await this.searchUser(this.searchModelUser)
        },

    },
    components: {ImageUploader, FileUploader, VDatetimePicker: () => import('vuetify-datetime-picker/src/components/DatetimePicker.vue') }
}
</script>

