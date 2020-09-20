<template>
  <div class="example">
    <v-contextmenu ref="contextmenu"
                   :theme="theme">
      <v-contextmenu-item @click="deleteFile(row)">删除</v-contextmenu-item>
      <v-contextmenu-item @click="showVersionList(row)">查看版本记录</v-contextmenu-item>
      <!-- <v-contextmenu-item @click="rollBackRevisionToPreviousVersion(row)">恢复到上一个版本</v-contextmenu-item> -->

      <!-- <v-contextmenu-item divider></v-contextmenu-item>

      <v-contextmenu-submenu @submenu-show="handleSubmenuShow"
                             title="子菜单">
        <v-contextmenu-item @click="handleClick">菜单3</v-contextmenu-item>

        <v-contextmenu-item divider></v-contextmenu-item>

        <v-contextmenu-submenu title="子菜单">
          <v-contextmenu-item @click="handleClick">菜单5</v-contextmenu-item>
        </v-contextmenu-submenu>

        <v-contextmenu-item @click="handleClick">菜单4</v-contextmenu-item>

        <v-contextmenu-item :auto-hide="false">不自动关闭1</v-contextmenu-item>
        <v-contextmenu-item :auto-hide="false">不自动关闭2</v-contextmenu-item>
      </v-contextmenu-submenu> -->
    </v-contextmenu>

    <div :class="['box', theme]"
         v-contextmenu:contextmenu>
      <svg-icon :icon-class=setIcon(row.name,row.type)
                slot="prefix"
                style="    width: 26px;
    height: 26px;
    text-align: center;
    margin: 0 10px 0 10px;
    vertical-align: middle;" />
      <span>
        {{ row.name }}
      </span>
    </div>
    <el-dialog title="历史版本记录"
               :visible.sync="versionDialogTableVisible">
      <el-table :data="versionList">
        <el-table-column property="time"
                         label="日期"
                         :formatter="formatterDate"></el-table-column>
        <el-table-column property="commitMsg"
                         label="提交信息"></el-table-column>
        <el-table-column property="objectId"
                         label="版本号"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="primary"
                       @click="downloadRevision(scope.$index, scope.row)">下载</el-button>
            <el-button size="mini"
                       type="warning"
                       @click="rollBackRevisionByVersionId(scope.$index, scope.row)">恢复</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Submenu',
  props: {
    theme: String,
    row: Object
  },
  data () {
    return {
      versionList: [],
      versionDialogTableVisible: false
    }
  },
  methods: {
    deleteFile (row) {
      var argus = { "filePath": row.path }
      this.$api.delete("repo/deleteFile", { params: argus }).then(res => {
        console.log(res)
        this.$store.state.reloadFile = true
      })
    },
    showVersionList (row) {
      this.versionDialogTableVisible = true
      var argus = { "path": row.path, "repoPath": sessionStorage.getItem("currentPath") }
      this.$api.get("repo/getDocHistoryList", { params: argus }).then(res => {
        console.log(res)
        this.versionList = res.data
        this.$store.state.reloadFile = true
      })
    },
    // rollBackRevisionToPreviousVersion (row) {
    //   let argus = new FormData();
    //   argus.append("entryPath", row.path.replace(sessionStorage.getItem("currentPath"), ""))
    //   argus.append("dirPath", sessionStorage.getItem("currentPath"))
    //   this.$api.post("repo/rollBackRevisionToPreviousVersion", argus).then(res => {
    //     console.log(res)
    //   })
    // },
    rollBackRevisionByVersionId (index, row) {
      console.log(index, row)
      let argus = new FormData();
      argus.append("entryPath", row.entryName)
      argus.append("dirPath", row.repoPath)
      argus.append("version", row.objectId)
      this.$api.post("repo/rollBackRevisionByVersionId", argus).then(res => {
        console.log(res)
      })
    },
    downloadRevision (index, row) {
      console.log(index, row)
      let argus = new FormData();
      argus.append("entryPath", row.entryName)
      argus.append("dirPath", row.repoPath)
      argus.append("version", row.objectId)
      // this.$api.post("repo/downloadRevision", argus).then(res => {
      //   console.log(res)
      // })
      this.$api({
        method: 'post',
        url: 'repo/downloadRevision',
        data: argus,
        responseType: 'arraybuffer'
      }
      ).then((res) => {
        console.log(res.headers['filename'])
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', res.headers['filename']);
        document.body.appendChild(link);
        link.click();
      });

    },
    formatterDate (row) {
      return this.$moment(new Date(row.time)).format("YYYY-MM-dd HH:mm:ss")
    },
    handleClick (vm, event) {
      console.log(vm, event)
    },
    handleSubmenuShow (vm, placement) {
      console.log(vm, placement)
    },
    setIcon (filename, fileType) {
      var iconType = "";
      if (fileType == '文件夹') {
        return iconType = 'folder'
      }
      switch (filename.substr(filename.lastIndexOf(".") + 1)) {
        case 'xlsx':
          iconType = "excle"
          break
        case "jpg":
          iconType = "JPG"
          break
        case "pdf":
          iconType = "PDF"
          break
        case "png":
          iconType = "PNG"
          break
        case "ppt":
          iconType = "ppt"
          break
        case "txt":
          iconType = "TET"
          break
        case "word":
          iconType = "WORD"
          break
        case "zip":
          iconType = "zip"
          break
        default:
          iconType = "unknown"
      }
      return iconType

    },
  },
}
</script>

<style scoped>
.box {
  width: 100%;
  cursor: pointer;
}
</style>