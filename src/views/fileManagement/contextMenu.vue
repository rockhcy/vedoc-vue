<template>
  <div class="example">
    <v-contextmenu ref="contextmenu"
                   :theme="theme">
      <v-contextmenu-item @click="deleteFile(row)">删除</v-contextmenu-item>
      <v-contextmenu-item @click="showVersionList(row)">查看版本记录</v-contextmenu-item>

      <v-contextmenu-item @click="openOffice(row)">打开</v-contextmenu-item>
      <v-contextmenu-item @click="openShareBox(row)">分享</v-contextmenu-item>
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
               :visible.sync="versionDialogTableVisible"
               class="versionDialog">

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
      <tooltipInfo class="tooltipInfo"
                   :info='info'></tooltipInfo>
    </el-dialog>

    <el-dialog :title="shareTitle"
               :visible.sync="shareDialogVisible"
               width="670px">
      <el-form label-width="100px"
               :model="shareForm">
        <el-form-item label="分享链接">
          <el-input v-model="shareForm.url"
                    disabled
                    style="width:320px"></el-input>
          <el-button type="success">复制链接</el-button>
          <el-button type="success">打开链接</el-button>
        </el-form-item>
        <el-form-item label="提取密码">
          <el-input v-model="shareForm.pwd"
                    placeholder="请输入提取码，空白表示不需要提取密码"
                    style="width:320px"></el-input>
          <el-button type="success">随机生成</el-button>
        </el-form-item>
        <el-form-item label="有效时间">
          <template>
            <el-select v-model="shareForm.expire"
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="权限设置">
          <el-checkbox-group v-model="shareForm.auth">
            <el-checkbox label="上传"></el-checkbox>
            <el-checkbox label="下载"></el-checkbox>
            <el-checkbox label="删除"></el-checkbox>
            <el-checkbox label="修改(开发中)"
                         disabled></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="分享二维码">
          <vue-qr :logoSrc="imageUrl"
                  :text="text"
                  :size="200"></vue-qr>
        </el-form-item>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="shareDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="shareDialogVisible = false">分 享</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tooltipInfo from '@/components/tooltipInfo'
import vueQr from 'vue-qr'
// import test from '@/views/test/test'
export default {
  components: {
    tooltipInfo,
    vueQr
  },
  name: 'Submenu',
  props: {
    theme: String,
    row: Object
  },
  data () {
    return {
      versionList: [],
      versionDialogTableVisible: false,
      info: '您可以通过点击【下载】来获取文件的历史版本，也能点击【恢复】将对应版本恢复到工作区中',
      shareTitle: '',
      shareDialogVisible: false,
      shareForm: {
        url: '',
        shareId: '',
        shareame: '',
        pwd: '',
        expire: '2',
        auth: ['下载']
      },
      options: [{
        value: '1',
        label: '永久有效'
      }, {
        value: '2',
        label: '30天'
      }, {
        value: '3',
        label: '7天'
      }, {
        value: '4',
        label: '1天'
      }],
      text: '你是真无聊，看到二维码就扫！\n\r 看什么看，说的就是你',//二维码中的内容
      imageUrl: require("../../assets/vesystemlogo.png"),//二维码中的logo
    }
  },
  methods: {
    openShareBox (row) {
      console.log(row)
      this.shareTitle = "文件分享：" + row.name
      this.$api.get("/share/produceShareId").then(res => {
        this.shareForm.shareId = res.data.data
        this.shareForm.shareame = row.name
        this.shareForm.url = "http://192.168.50.143:8081/#/fenxiang/?shareId=" + res.data.data
        this.shareDialogVisible = true
        this.text = "http://192.168.50.143:8081/#/fenxiang/?shareId=" + res.data.data
        console.log(res.data.data)
      })
    },

    openOffice (row) {
      console.log(row)
      var filename = row.name;
      var argus = { "fileType": filename.substr(filename.lastIndexOf(".") + 1), "title": filename, "filePath": row.path }
      this.$api.get("/office/getPage", { params: argus }).then(res => {
        console.log(res.data)
        sessionStorage.setItem('officeFileOption', JSON.stringify(res.data))
        let routeData = this.$router.resolve({ path: '/onlineOffice' });
        window.open(routeData.href, '_blank');
      })
    },
    deleteFile (row) {
      var files = [];
      files.push(row.path)
      console.log(files)
      this.$api.post("repo/deleteFile", { files: files }).then(res => {
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
      this.$api({
        method: 'post',
        url: 'repo/downloadRevision',
        data: argus,
        responseType: 'arraybuffer'
      }
      ).then((res) => {
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
      if (fileType == 1) {
        return iconType = 'folder'
      }
      switch (filename.substr(filename.lastIndexOf(".") + 1)) {
        case 'xlsx':
        case 'xls':
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
        case "doc":
        case "docx":

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

<style lang="scss">
.box {
  width: 100%;
  cursor: pointer;
}
.versionDialog {
  position: relative;
  .el-dialog__body {
    position: relative;
    .el-tooltip {
      position: absolute;
      top: -34px;
      left: 134px;
      font-size: 20px;
    }
  }
}
</style>