<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="OpenCouponAddModal(true)">
        建立優惠卷
      </button>
    </div>

    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>優惠碼</th>
          <th width="200">折扣(%)</th>
          <th width="200">到期日</th>
          <th width="100">是否啟用</th>
          <th width="120">工具</th>
        </tr>
      </thead>
      <tbody id="Table_data">
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ item.due_date | date }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td class="d-flex justify-content-between">
            <button
              class="btn btn-outline-primary btn-sm"
              @click="OpenCouponAddModal(false, item)"
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
    <pagination @runPage="getCoupons" />

    <!-- Modal -->
    <div
      class="modal fade"
      id="CouponModal"
      tabindex="-1"
      aria-labelledby="CouponModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title">
              <span id="CouponModalTitle">新增優惠劵</span>
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
              <validation-observer class="col-sm-12" v-slot="{ invalid }">
                <validation-provider rules="required" v-slot="{ errors, classes }">
                  <div class="form-group">
                    <!-- 輸入框 -->
                    <label for="title">標題</label>
                    <span class="text-danger"> * </span>
                    <input
                      id="title"
                      type="text"
                      v-model="tempCoupon.title"
                      class="form-control"
                      :class="classes"
                    />
                    <!-- 錯誤訊息 -->
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </div>
                </validation-provider>

                <div class="form-row">
                  <validation-provider class="form-group col-md-6" rules="required" v-slot="{ errors, classes }">
                      <!-- 輸入框 -->
                      <label for="percent">折價</label>
                      <span class="text-danger"> * </span>
                      <input
                        id="percent"
                        type="text"
                        v-model="tempCoupon.percent"
                        class="form-control"
                        placeholder="請輸入折價(%)"
                        :class="classes"
                      />
                      <!-- 錯誤訊息 -->
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>

                  <validation-provider class="form-group col-md-6" rules="required" v-slot="{ errors, classes }">                  
                      <!-- 輸入框 -->
                      <label for="code">優惠碼</label>
                      <span class="text-danger"> * </span>
                      <input
                        id="code"
                        type="text"
                        v-model="tempCoupon.code"
                        class="form-control"
                        placeholder="請輸入優惠碼"
                        :class="classes"
                      />
                      <!-- 錯誤訊息 -->
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="form-row">
                  <validation-provider class="form-group col-md-6" rules="required" v-slot="{ errors, classes }">
                      <!-- 輸入框 -->
                      <label for="due_date">到期日</label>
                      <span class="text-danger"> * </span>
                      <input
                        id="due_date"
                        type="date"
                        v-model="tempCoupon.due_date"
                        class="form-control"
                        :class="classes"
                      />
                      <!-- 錯誤訊息 -->
                      <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="tempCoupon.is_enabled"
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
              @click.prevent="updateCoupon()"
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
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="delCouponModalLabel"
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
            <strong class="text-danger">{{ tempCoupon.title }}</strong
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
              @click.prevent="delCoupon(tempCoupon.id)"
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

    <Alert />
  </div>
</template>

<script>
import $ from "jquery";
import pagination from "../Pagination";
import Alert from "../AlertMessage";

export default {
  components: {
    pagination,
    Alert,
  },
  data() {
    return {
      coupons: [], //載入一開始的表單資料
      tempCoupon: {}, //存放表單內各個暫存資料
      isLoading: false, //是否要有loading動畫(大範圍)
      isNew: false, //是新資料還是舊資料
      status: {
        loadingItem: false,
        loadingdelItem: false,
      },
    };
  },
  methods: {
    getCoupons(page = 1) {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/coupons?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(api).then((response) => {
        vm.coupons = response.data.coupons;
        vm.isLoading = false;

        //分頁處理
        vm.$bus.$emit("page:change", response.data.pagination);
      });
    },
    OpenCouponAddModal(isNew, item) {
      if (isNew) {
        this.tempCoupon = {};
        this.isNew = true;
        $("#CouponModalTitle").text("新增優惠劵");
      } else {
        const date = new Date(item.due_date * 1000);

        this.tempCoupon = Object.assign({}, item);

        //將到期日期字串改成 XXXX-XX-XX 格式
        this.tempCoupon.due_date = `${date.getFullYear()}-${
          (date.getMonth() + 1).toString().length > 1
            ? date.getMonth() + 1
            : `0${date.getMonth() + 1}`
        }-${
          date.getDate().toString().length > 1
            ? date.getDate()
            : `0${date.getDate()}`
        }`; //返回日期字串部分

        this.isNew = false;
        $("#CouponModalTitle").text("修改優惠劵");
      }

      $("#CouponModal").modal("show");
    },
    updateCoupon() {
      let api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/coupon`; //新增Api
      let httpMethod = "post";
      const vm = this;

      vm.status.loadingItem = true;

      const send_data = Object.assign({}, vm.tempCoupon);

      //將日期改為 Unix Timestamp 格式
      const dateTime = new Date(send_data.due_date);
      send_data.due_date = Math.floor(dateTime / 1000);

      if (!vm.isNew) {
        api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/coupon/${send_data.id}`; //修改Api
        httpMethod = "put";
      }

      vm.$http[httpMethod](api, { data: send_data }).then((response) => {
        vm.status.loadingItem = false;
        $("#CouponModal").modal("hide");
        vm.getCoupons();

        if (response.data.success) {
          vm.$bus.$emit("message:push", response.data.message, "success");
        } else {
          vm.$bus.$emit("message:push", response.data.message, "danger");
        }
      });
    },
    OpendelModal(item) {
      this.tempCoupon = item;
      $("#delCouponModal").modal("show");
    },
    delCoupon(id) {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/coupon/${id}`; //刪除Api
      const vm = this;
      vm.status.loadingdelItem = true;

      vm.$http.delete(api).then((response) => {
        vm.status.loadingdelItem = false;
        $("#delCouponModal").modal("hide");
        vm.getCoupons();

        if (response.data.success) {
          vm.$bus.$emit("message:push", response.data.message, "success");
        } else {
          vm.$bus.$emit("message:push", response.data.message, "danger");
        }
      });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>