<template>
  <!-- <el-form :model="blog" id="form-blog" :rules="rules" ref="blog" label-width="120px" class="demo-blog">
    <el-form-item label="Blog title" prop="title">
      <el-input name="title" v-model="blog.title"></el-input>
    </el-form-item>
    <el-form-item label="Category" prop="category">
      <el-select name="categoryCode" v-model="blog.categoryCode" placeholder="Category">
        <el-option label="Zone one" value="shanghai"></el-option>
        <el-option label="Zone two" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Content" prop="content">
      <el-input name="content" type="textarea" v-model="blog.content"></el-input>
    </el-form-item>
    <el-form-item label="Blog covers" prop="cover">
      <input multiple type="file" name="cover">
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('blog')">Create</el-button>
    </el-form-item>
  </el-form> -->
    <div class="submit-form">
        <form id="add-blog" enctype="multipart/form-data">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title" required v-model="blog.title" name="title">
            </div>
            <div class="form-group">
                <label for="">Content</label>
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
            <button class="btn btn-success" v-on:click.prevent="saveBlog()">Save</button>
        </form>
    </div>
</template>
<script>
import BlogDataService from "../services/BlogDataService";
import CategoryDataService from "../services/CategoryDataService";

export default {
 name: 'add-blog',
    data() {
        return {
            blog: {
                id: null,
                title: '',
                content: '',
                files: [],
                category: Object,
            },
            cate: [],
            submitted: false,
        };
    },
    methods: {
        saveBlog() {
            let form = document.getElementById('add-blog');
            let formData = new FormData(form);
            console.log(formData);
            BlogDataService.create(formData)
                .then(response => {
                    console.log(response.data);
                    this.submitted = true;
                })
                .catch(e => {
                    console.log(e);
                })
        },
        newBlog() {
            this.submitted = false;
            this.blog = {};
        },
        getCategories() {
            CategoryDataService.getAll()
                .then(response => {
                    this.cate = response.data;
                })
        },
        // handleUploadFile(event) {
        //     console.log('Upload file' + event.target.files[0]);
        //     this.blog.covers.push(event.target.files[0]);
        // }
    },
    mounted() {
        this.getCategories();
    }
}
</script>