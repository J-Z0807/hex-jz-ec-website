<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="OpenModal(true)">
        建立新的產品
      </button>
    </div>

    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">工具</th>
        </tr>
      </thead>
      <tbody id="Table_data">
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price | currency }}</td>
          <td class="text-right">{{ item.price | currency }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td class="d-flex justify-content-between">
            <button
              class="btn btn-outline-primary btn-sm"
              @click="OpenModal(false, item)"
            >
              編輯
            </button>

            <button
              class="btn btn-outline-danger btn-sm"
              @click="OpendelModal(item)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分頁bar -->
    <pagination @runPage="getProducts" />

    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title">
              <span id="productModalTitle">新增產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <validation-observer class="col-sm-4">
                <validation-provider
                  rules="required"
                  v-slot="{ errors, classes }"
                >
                  <div class="form-group">
                    <!-- 輸入框 -->
                    <label for="image">輸入圖片網址</label
                    ><span class="text-danger"> * </span>
                    <input
                      id="image"
                      type="text"
                      v-model="tempProduct.imageUrl"
                      class="form-control"
                      :class="classes"
                      placeholder="請輸入圖片連結"
                    />
                    <!-- 錯誤訊息 -->
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </validation-provider>

                <div class="form-group">
                  <label for="customFile"
                    >或 上傳圖片
                    <i
                      class="fas fa-spinner fa-spin"
                      v-if="status.fileUploading"
                    ></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadFile()"
                  />
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl" />
              </validation-observer>

              <validation-observer class="col-sm-8">
                <validation-provider
                  rules="required"
                  v-slot="{ errors, classes }"
                >
                  <div class="form-group">
                    <!-- 輸入框 -->
                    <label for="title">標題</label
                    ><span class="text-danger"> * </span>
                    <input
                      id="title"
                      type="text"
                      v-model="tempProduct.title"
                      class="form-control"
                      :class="classes"
                      placeholder="請輸入標題"
                    />
                    <!-- 錯誤訊息 -->
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </validation-provider>

                <div class="form-row">
                  <validation-provider
                    class="form-group col-md-6"
                    rules="required"
                    v-slot="{ errors, classes }"
                  >
                    <!-- 輸入框 -->
                    <label for="category">分類</label
                    ><span class="text-danger"> * </span>
                    <input
                      id="category"
                      type="text"
                      v-model="tempProduct.category"
                      class="form-control"
                      :class="classes"
                      placeholder="請輸入分類"
                    />
                    <!-- 錯誤訊息 -->
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>

                  <validation-provider
                    class="form-group col-md-6"
                    rules="required"
                    v-slot="{ errors, classes }"
                  >
                    <!-- 輸入框 -->
                    <label for="price">單位</label>
                    <span class="text-danger"> * </span>
                    <input
                      id="unit"
                      type="text"
                      v-model="tempProduct.unit"
                      class="form-control"
                      :class="classes"
                      placeholder="請輸入單位"
                    />
                    <!-- 錯誤訊息 -->
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
                </div>

                <div class="form-row">
                  <validation-provider
                    class="form-group col-md-6"
                    rules="required"
                    v-slot="{ errors, classes }"
                  >
                    <!-- 輸入框 -->
                    <label for="origin_price">原價</label>
                    <span class="text-danger"> * </span>
                    <input
                      id="origin_price"
                      type="number"
                      v-model="tempProduct.origin_price"
                      class="form-control"
                      :class="classes"
                      placeholder="請輸入原價"
                    />
                    <!-- 錯誤訊息 -->
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>

                  <validation-provider
                    class="form-group col-md-6"
                    rules="required"
                    v-slot="{ errors, classes }"
                  >
                    <!-- 輸入框 -->
                    <label for="price">售價</label>
                    <span class="text-danger"> * </span>
                    <input
                      id="price"
                      type="number"
                      v-model="tempProduct.price"
                      class="form-control"
                      :class="classes"
                      placeholder="請輸入售價"
                    />
                    <!-- 錯誤訊息 -->
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
                </div>

                <hr />
                <validation-provider
                  class="form-group"
                  rules="required"
                  v-slot="{ errors, classes }"
                >
                  <!-- 輸入框 -->
                  <label for="description">產品描述</label>
                  <span class="text-danger"> * </span>
                  <textarea
                    id="description"
                    v-model="tempProduct.description"
                    class="form-control"
                    :class="classes"
                    placeholder="請輸入產品描述"
                  ></textarea>
                  <!-- 錯誤訊息 -->
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </validation-provider>

                <validation-provider
                  class="form-group"
                  rules="required"
                  v-slot="{ errors, classes }"
                >
                  <!-- 輸入框 -->
                  <label for="content">說明內容</label>
                  <span class="text-danger"> * </span>
                  <textarea
                    id="content"
                    v-model="tempProduct.content"
                    class="form-control"
                    :class="classes"
                    placeholder="請輸入產品說明內容"
                  ></textarea>
                  <!-- 錯誤訊息 -->
                  <span class="invalid-feedback">{{ errors[0] }}</span>
                </validation-provider>

                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="0"
                      id="is_enabled"
                    />
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </validation-observer>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-open" data-dismiss="modal">
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="updateProduct()"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem"></i>
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="delProductModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">
              <span>刪除產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong
            >(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click.prevent="delProduct(tempProduct.id)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.loadingdelItem"
              ></i>
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import pagination from "../../Pagination";

export default {
  components: {
    pagination,
  },
  data() {
    return {
      products: [], //載入一開始的表單資料
      tempProduct: {}, //存放表單內各個暫存資料
      isNew: false, //是新資料還是舊資料
      isLoading: false, //是否要有loading動畫(大範圍)
      // loading動畫(小範圍)
      status: {
        loadingItem: false,
        loadingdelItem: false,
        fileUploading: false,
      },
    };
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(api).then((response) => {
        vm.products = response.data.products;
        vm.isLoading = false;

        //分頁處理
        vm.$bus.$emit("page:change", response.data.pagination);
      });
    },
    OpenModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
        $("#productModalTitle").text("新增產品");
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
        $("#productModalTitle").text("修改產品");
      }

      $("#productModal").modal("show");
    },
    updateProduct() {
      let api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/product`; //新增Api
      let httpMethod = "post";
      const vm = this;

      vm.status.loadingItem = true;

      if (!vm.isNew) {
        api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/product/${vm.tempProduct.id}`; //修改Api
        httpMethod = "put";
      }
      vm.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        vm.status.loadingItem = false;
        $("#productModal").modal("hide");
        vm.getProducts();

        if (response.data.success) {
          vm.$bus.$emit("message:push", response.data.message, "success");
        } else {
          vm.$bus.$emit("message:push", response.data.message, "danger");
        }
      });
    },
    OpendelModal(item) {
      this.tempProduct = item;
      $("#delProductModal").modal("show");
    },
    delProduct(id) {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/product/${id}`; //刪除Api
      const vm = this;
      vm.status.loadingdelItem = true;

      vm.$http.delete(api).then((response) => {
        vm.status.loadingdelItem = false;
        $("#delProductModal").modal("hide");
        vm.getProducts();

        if (response.data.success) {
          vm.$bus.$emit("message:push", response.data.message, "success");
        } else {
          vm.$bus.$emit("message:push", response.data.message, "danger");
        }
      });
    },
    uploadFile() {
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();
      vm.status.fileUploading = true;

      formData.append("file-to-upload", uploadedFile);

      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/upload`;
      vm.$http
        .post(url, formData, {
          header: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          vm.status.fileUploading = false;
          if (response.data.success) {
            vm.$set(vm.tempProduct, "imageUrl", response.data.imageUrl); //強制寫入(雙向綁定)
          } else {
            vm.$bus.$emit("message:push", response.data.message, "danger");
          }
        });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>