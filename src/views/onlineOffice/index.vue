<template>
  <div>
    <div id="placeholder"
         style="height: 500px;width: 500px"></div>
  </div>

</template>
<script type="text/javascript" src="http://192.168.10.154:80/web-apps/apps/api/documents/api.js"></script>
<script>

export default {
  props: {
    option: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      doctype: ''
    }
  },
  mounted () {
    // if (this.option.url)
    //this.setEditor(this.option)
    this.setEditor()
  },
  methods: {
    //setEditor (option) {
    setEditor () {
      var option = JSON.parse(sessionStorage.getItem("officeFileOption"));
      console.log(option)
      // this.doctype = handleDocType(option.fileType);
      // office配置参数
      let config = {
        "document": {
          "fileType": option.fileType,
          "key": option.key,
          "title": option.title,
          "url": option.url
          // "permissions": {
          //   comment: false,
          //   download: false,
          //   modifyContentControl: true,
          //   modifyFilter: true,
          //   print: false,
          //   edit: option.isEdit,//是否可以编辑: 只能查看，传false
          //   // "fillForms": true,//是否可以填写表格，如果将mode参数设置为edit，则填写表单仅对文档编辑器可用。 默认值与edit或review参数的值一致。
          //   // "review": true //跟踪变化
          // }

        },
        //"documentType": "text",
        "editorConfig": {
          //"callbackUrl": "http://192.168.50.143:8080/OnlineEditorsExampleJava_war/CallBackServlet?" + "fileName=t1.docx",//[[${callbackUrl}]]
          "customization": {
            "forcesave": "false"
          },
          "user": {
            "id": "78ele841",
            "name": "John Smith"
          },
          "lang": "zh-CN",//zh-CN,en
        },
        "height": "800px",
        "width": "1000px"
      };
      let docEditor = new DocsAPI.DocEditor("placeholder", config);
    },
  },
  watch: {
    // option: {
    //   handler: function (n, o) {
    //     this.setEditor(n);
    //     this.doctype = handleDocType(n.fileType);
    //   },
    //   deep: true,
    // }
  }
}
</script>

<style>
</style>