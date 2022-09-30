<template>
     <!-- <el-table
        :data="blogs.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
      <el-table-column
          prop="id"
          label="ID"
          width="180">
      </el-table-column>
      <el-table-column
          prop="title"
          label="Title"
          width="180">
      </el-table-column>
      <el-table-column
          prop="author.name"
          label="Author">
      </el-table-column>
      <el-table-column
          v-slot="scope"
          label="Cover">
        <template  >
            <img v-for="(cover, index) in scope.row.covers" :key="index" v-bind:src="'http://localhost:8080/image/' + cover.name" width="50px">
        </template>
      </el-table-column>
      <el-table-column
          prop="content"
          label="Content">
      </el-table-column>
      <el-table-column
          prop="category.name"
          label="Category">
      </el-table-column>
      <el-table-column
        align="right" >
      <template v-slot:header>
        <el-input 
          v-model="search"
          size="mini"
          placeholder="Type to search"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(data.id)">Delete</el-button>
      </template>
    </el-table-column>
        </el-table> -->
        <div class="container">
        <h1 class="text-center">Blog list</h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Content</th>
                    <th scope="col" colspan="2">Cover</th>
                    <th scope="col">Category</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody v-for="(blog, index) in blogs" :key="blog.id">
                <tr>
                    <td>{{index}}</td>
                    <td>{{blog.title}}</td>
                    <td>{{blog.content}}</td>
                    <td colspan="2">
                        <img  v-for="(cover, i) in blog.covers" :key="i"
                         v-bind:src="'http://127.0.0.1:8080/image/' + cover.name" 
                         width="50px">
                    </td>
                    <td>{{blog.category ? blog.category.name : ''}}</td>
                    <td>
                        <a class="badge badge-warning btn btn-info" :href="'/blog/' + blog.id">Edit</a>
                        <button class="btn btn-warning" @click="deleteBlog(blog.id)">Delete</button>
                        <!-- <a class="badge badge-warning btn btn-warndeleteBloging" :href="'/blog/' + blog.id">Edit</a> -->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import BlogDataService from "../services/BlogDataService";
import UserService from '../services/UserService';
export default {
      name: "blogs-list",
  data() {
    return {
      blogs: [],
      currentBlog: null,
      currentIndex: -1,
      search: '',
    };
  },
  methods: {
    retrieveBlogs() {
      BlogDataService.getAll()
        .then(response => {
          this.blogs = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
       setActiveBlog(blog, index) {
      this.currentBlog = blog;
      this.currentIndex = index;
    },
      removeAllBlogs(){},
      handleEdit(index, row) {
        console.log(index, row);
      },
      deleteBlog(id) {
          BlogDataService.delete(id).then(response => {
          console.log(response.data);
          this.$router.push({ name: "blogs" });
          window.location.reload();
            })
        .catch(e => {
          console.log(e);
        });
      }
    },
   mounted() {
    this.retrieveBlogs();
    UserService.getPublicContent().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
   }
};
</script>