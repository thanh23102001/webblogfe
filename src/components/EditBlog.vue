<template>
    <div class="submit-form">
        <form id="edit-blog" enctype="multipart/form-data">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title" required v-model="blog.title" name="title">
            </div>
            <div class="form-group">
                <label for="">content</label>
                <input class="form-control" type="text" id="content" v-model="blog.content" name="content">
            </div>
            <div class="form-group">
                <label for="">Cover</label>
                <input class="form-control" type="file" id="file" multiple name="files">
            </div>
            <div class="form-group">
                <label for="">Category</label>
                <select class="form-control"  v-model="blog.category" name="category">
                    <option  v-for="(item) in cate" :key="item.id" :value="item.id">{{item.name}}</option>
                </select>
            </div>
            <button class="btn btn-success" v-on:click.prevent="saveBlog($event)">Save</button>
        </form>
    </div>
</template>

<script>
import BlogDataService from "../services/BlogDataService";
import CategoryDataService from "../services/CategoryDataService";

export default {
    name: 'edit-blog',
    data() {
        return {
            blog: null,
            cate: [],
        };
    },
    methods: {
        getBlogById(id) {
            console.log('get blog by id');
            console.log(id);
            BlogDataService.getById(id)
                .then(response => {
                    console.log(this.blog);
                    this.blog = response.data;
                })
                .catch(e => {
                    console.log(e);
                })
        },
        saveBlog() {
            let form = document.getElementById('edit-blog');
            let formData = new FormData(form);
            console.log(formData);
            BlogDataService.create(formData)
                .then(response => {
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                })
        },
        getCategories() {
            CategoryDataService.getAll()
                .then(response => {
                    this.cate = response.data;
                })
        },
    },
    mounted() {
        this.getBlogById(this.$route.params.id);
        this.getCategories();
    }
}
</script>