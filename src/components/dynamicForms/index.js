import * as util from "./uitls";
import "./index.less";
const dynamicForms = {
  name: "dynamicForms",
  props: {
    addCourseInfo: {
      type: Number,
      default: 1
    },
    btnText: {
      type: String,
      default: ""
    },
    getFormDate: {
      type: Function,
      default: false
    }
  },
  data() {
    return {
      formValidate: {},
      h: undefined,
      formJson: [],
      showProps: false,
      isSubmit: false
    };
  },
  created() {
    const data = JSON.parse(this.addCourseInfo);
    this.formJson = data.map(item => item.row);
  },
  mounted() {
    this.renderFrom();
  },
  updated() {},
  methods: {
    renderFrom(h) {
      const data = this.formJson.map((item, index) =>
        util.switchDom(this, item, index)
      );
      this.handleUpdata(this.formJson);
      return data;
      // util.switchDom(h,item.row.type,item)
    },
    handleUpdata(data) {
      const datas = [];
      data.map(item =>
        item.map((items, index) => {
          if (items.isrequired) {
            if ((items && items.value.length == 0) || items == undefined) {
              datas.splice(index, 0, "");
            }
          }
        })
      );
      this.isSubmit = !datas.includes("");
    },
    // 提交数据
    handleSubmit() {
      this.handleUpdata(this.formJson);
      if (this.isSubmit) {
        const data = [];
        this.formJson.forEach(item => data.push(item));
        this.getFormDate(data);
      } else {
        this.$popup.text({ text: "必填项不能为空" });
      }
    }
  },
  render(h) {
    this.h = h;
    return (
      <div class="llw_form">
        {this.renderFrom(h)}{" "}
        <div
          style={{ background: "#007AFF"}}
          onClick={this.handleSubmit}
          class="llw_formSubmit"
        >
          {this.btnText || "提交"}
        </div>
      </div>
    );
  },
  watch: {
    addCourseInfo() {
      this.formJson = (this.addCourseInfo || util).formJson.map(
        item => item.row
      );
    },
    formJson() {
      console.log(this.formJson);
    }
  }
};

export default dynamicForms;
