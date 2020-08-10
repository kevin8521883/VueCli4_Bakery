<template>
  <div>
    <nav aria-label="Page navigation example ">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled':!childPagination.has_pre}">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="childChangePage(childPagination.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in childPagination.total_pages"
          :key="page"
          :class="{'active':childPagination.current_page === page}"
        >
          <a class="page-link" href="#" @click.prevent="childChangePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{'disabled':!childPagination.has_next}">
          <a class="page-link" href="#" aria-label="Next"  @click.prevent="childChangePage(childPagination.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    childPagination: {
      type: Object
    }
  },
  methods: {
    childChangePage (page) {
      this.$emit('childChangePage', page)
    }
  }
}
</script>
