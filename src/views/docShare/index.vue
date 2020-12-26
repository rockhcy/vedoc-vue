<template>
  <div>
    <el-divider content-position="left">我的分享文件</el-divider>
    <!-- <template> -->
    <el-table :data="tableData"
              stripe
              style="width: 100%">
      <el-table-column prop="shareName"
                       label="文件名"
                       width="180">
      </el-table-column>
      <el-table-column prop="repoName"
                       label="仓库名称"
                       width="180">
      </el-table-column>
      <el-table-column prop="shareId"
                       label="分享id">
      </el-table-column>
      <el-table-column prop="shareAuth"
                       label="权限"
                       :formatter="formatAuth">

      </el-table-column>
      <el-table-column prop="sharePwd"
                       label="密码">
        <template scope={row}>
          {{row.sharePwd ==""?'無密碼':row.sharePwd}}
        </template>
      </el-table-column>
      <el-table-column prop="expireTime"
                       label="有效期">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <!-- </template> -->
    <el-pagination background
                   @current-change="handleCurrentChange"
                   layout="prev, pager, next"
                   :total=total>
    </el-pagination>

    <el-dialog title="编辑"
               style="text-align:left"
               label-position="right"
               :visible.sync="updateShareDialogVisible"
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
        <el-form-item label="原始有效期">
          <el-input v-model="shareForm.oldExpire"
                    disabled
                    style="width:320px"></el-input>
        </el-form-item>
        <el-form-item label="新有效时间">
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
          <vue-qr :logoSrc="shareForm.imageUrl"
                  :text="shareForm.text"
                  :size="200"></vue-qr>
        </el-form-item>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="updateShareDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="updateDocShareInfo">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import vueQr from 'vue-qr'
export default {
  components: {
    vueQr
  },
  data () {
    return {
      updateShareDialogVisible: false,
      shareForm: {
        url: '',
        shareId: '',
        shareName: '',
        sharePwd: '',
        oldExpire: '',
        expire: 30,
        expireTimeLong: '',
        auth: ['下载'],
        text: '未知错误，请联系开发人员\n\r qq:337815986',//二维码中的内容
        imageUrl: require("../../assets/vesystemlogo.png"),//二维码中的logo
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
      currentPage: 1,
      total: 0,
      tableData: []
    }
  },
  created () {
    this.selectSelfAllDocShareList()
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
    updateDocShareInfo () {
      this.shareForm.expireTimeLong = new Date().getTime() / 1000 + 60 * 60 * 24 * this.shareForm.expire
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
      this.shareForm.shareAuth = shareAuth
      this.$api.put("/share/updateDocShareInfo", this.shareForm).then(res => {
        if (res.status == 200) {
          this.updateShareDialogVisible = false
          this.selectSelfAllDocShareList()
        }
      })
    },
    handleEdit (index, row) {
      console.log(index, row);
      this.updateShareDialogVisible = true
      this.shareForm.url = window.GLOBAL_CONFIG_SETTING.WEB_BASE + "/#/fenxiang/?shareId=" + row.shareId
      this.shareForm.shareId = row.shareId
      this.shareForm.shareName = row.shareName
      this.shareForm.oldExpire = row.expireTime
      this.shareForm.sharePwd = row.sharePwd
      this.shareForm.text = window.GLOBAL_CONFIG_SETTING.WEB_BASE + "/#/fenxiang/?shareId=" + row.shareId
      switch (row.shareAuth) {
        case 0:
          this.shareForm.auth = []
          break;
        case 1:
          this.shareForm.auth = ["上传"]
          break;
        case 2:
          this.shareForm.auth = ["下载"]
          break;
        case 3:
          this.shareForm.auth = ["上传", "下载"]
          break;
        case 4:
          this.shareForm.auth = ["删除"]
          break;
        case 5:
          this.shareForm.auth = ["上传", "删除"]
          break;
        case 6:
          this.shareForm.auth = ["下载", "删除"]
          break;
        case 7:
          this.shareForm.auth = ["上传", "下载", "删除"]
          break;
      }



    },
    handleDelete (index, row) {
      let params = { shareId: row.shareId }
      this.$api.delete("/share/deleteDocShareById", { params: params }).then(res => {
        if (res.status == 200) {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success'
          });
          this.selectSelfAllDocShareList()
        }
      })
    },
    formatAuth (val) {
      switch (val.shareAuth) {
        case 0:
          return "--,--,--"
        case 1:
          return "上传,--,--"
        case 2:
          return "--,下载,--"
        case 3:
          return "--,--,删除"
        case 4:
          return "上传,--,删除"
        case 5:
          return "上传,--,删除"
        case 6:
          return "--,下载,删除"
        case 7:
          return "上传,下载,删除"
      }
      return "未知权限"
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      this.selectSelfAllDocShareList()
    },
    selectSelfAllDocShareList () {
      let argus = { current: this.currentPage, shareName: '' }
      this.$api.get("/share/selectSelfAllDocShareList", { params: argus }).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    }
  }

}
</script>

<style>
</style>