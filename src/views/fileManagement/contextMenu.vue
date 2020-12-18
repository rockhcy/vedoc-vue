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
               label-position="right"
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
          <el-input v-model="shareForm.sharePwd"
                    placeholder="请输入提取码，空白表示不需要提取密码"
                    style="width:320px"></el-input>
          <el-button type="success"
                     @click="createRandom">随机生成</el-button>
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
                   @click="docShare">分 享</el-button>
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
        sharePwd: '',
        expire: 30,
        auth: ['下载']
      },
      options: [{
        value: 365,
        label: '1年(365天)'
      }, {
        value: 30,
        label: '30天'
      }, {
        value: 7,
        label: '7天'
      }, {
        value: 1,
        label: '1天'
      }],
      text: '未知错误，请联系开发人员\n\r qq:337815986',//二维码中的内容
      imageUrl: require("../../assets/vesystemlogo.png"),//二维码中的logo
    }
  },
  methods: {
    createRandom () {
      let pasArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      let password = '';
      let pasArrLen = pasArr.length;
      for (var i = 0; i < 6; i++) {
        let x = Math.floor(Math.random() * pasArrLen);
        password += pasArr[x];
      }
      this.shareForm.sharePwd = password
    },
    docShare () {
      let shareAuth = 0
      for (var a in this.shareForm.auth) {
        switch (this.shareForm.auth[a]) {
          case '上传':
            shareAuth += 1;
            break
          case '下载':
            shareAuth += 2;
            break
          case '删除':
            shareAuth += 4;
            break
        }
      }
      let now = new Date()
      let expireTimeLong = now.getTime() / 1000 + 60 * 60 * 24 * this.shareForm.expire
      let argus = {
        "shareId": this.shareForm.shareId,
        "shareName": this.shareForm.shareName,
        "repoId": sessionStorage.getItem("repoId"),
        "relativePath": sessionStorage.getItem("currentPath"),
        "shareAuth": shareAuth,
        "sharePwd": this.shareForm.sharePwd,
        "expireTimeLong": expireTimeLong
      }
      this.$api.post("/share/docShare", argus).then(res => {
        console.log(res)
        this.shareDialogVisible = false
      })
    },
    openShareBox (row) {
      console.log(row)
      this.shareTitle = "文件分享：" + row.name
      this.$api.get("/share/produceShareId").then(res => {
        this.shareForm.shareId = res.data
        this.shareForm.shareName = row.name
        this.shareForm.url = window.GLOBAL_CONFIG_SETTING.WEB_BASE + "/#/fenxiang/?shareId=" + res.data.data
        this.shareDialogVisible = true
        this.text = window.GLOBAL_CONFIG_SETTING.WEB_BASE + "/#/fenxiang/?shareId=" + res.data.data
        console.log(res.data)
      })
    },

    openOffice (row) {
      console.log(row)
      let filename = row.name;
      let argus = { "fileType": filename.substr(filename.lastIndexOf(".") + 1), "title": filename, "filePath": row.path }
      this.$api.get("/office/getPage", { params: argus }).then(res => {
        console.log(res.data)
        sessionStorage.setItem('officeFileOption', JSON.stringify(res.data))
        let routeData = this.$router.resolve({ path: '/onlineOffice' });
        window.open(routeData.href, '_blank');
      })
    },
    deleteFile (row) {
      let files = [];
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