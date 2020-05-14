<template>
  <div>
      <table id='myTable'>
          <thead class='tHeader'>
            <tr>
                <th>Status</th>
                <th>Path of Nodes</th>
            </tr>
        </thead>
        <tbody>
            <tr v-bind:key='path' v-for="path in allPaths">
                <td> Yes </td>
                <td>{{path}}</td>
            </tr>
        </tbody>
      </table>
      <datatable>
            <datatable-column v-bind:key='path' v-for="path in allPaths">
                <p> {{path}} </p>
            </datatable-column>
        </datatable>
  </div>
</template>

<script>
// import DataTable from "vue-materialize-datatable";
export default {
  data: function () {
    return {
      allPaths: ['0', '0123', '23432', '023']
    }
  },
  components: {
    // "datatable": DataTable
  }
}
</script>

<style>
#myTable {
    display: none;
    background-color: aliceblue;
    border: 3px solid #f1f1f1;
    border-radius: 5px;
    width: 825px;
    /* text-align: center; */
    margin-left: 17%;
    z-index: 9;
}
.form-container {
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
