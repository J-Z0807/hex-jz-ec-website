<template>
  <div>
    <nav aria-label="Page navigation" v-if="pagination.total_pages !== 1">
      <ul class="pagination mb-0 pb-3 justify-content-end">
        <li class="page-item" :class="{ disabled: !pagination.has_pre }">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="PageFunction(pagination.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in pagination.total_pages"
          :key="page"
          :class="{ active: pagination.current_page === page }"
        >
          <a class="page-link" href="#" @click.prevent="PageFunction(page)">{{
            page
          }}</a>
        </li>
        <li class="page-item" :class="{ disabled: !pagination.has_next }">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="PageFunction(pagination.current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "pagination",
  data() {
    return {
      pagination: {},
    };
  },
  methods: {
    PageFunction(page) {
      this.pagination.current_page = page;
      this.$emit("runPage", this.pagination.current_page); //執行抓取該頁資料的API
    },
  },
  created() {
    const vm = this;
    vm.$bus.$on("page:change", function (pagination) {
      vm.pagination = pagination;
    });
  },
};
</script>

<style lang="scss" scoped>
.page-link {
  position: relative;
  display: block;
  padding: 0.5rem 0.75rem;
  margin-left: -1px;
  line-height: 1.25;
  color: #003c00;
  background-color: #d8ebeb;
  border: 1px solid #346767;
}

.page-item.disabled .page-link {
  color: #868e96;
  pointer-events: none;
  cursor: auto;
  background-color: #bef1be;
  border-color: #718393;
}

.page-item.active .page-link {
  z-index: 1;
  color: #fff;
  background-color: black;
  border-color: #0083fd;
}

.page-link:focus,
.page-link:hover {
  color: #fff;
  text-decoration: none;
  background-color: black;
  border-color: #0083fd;
}
</style>