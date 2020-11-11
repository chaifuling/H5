export const formJson = [
  {
    row: [
      { type: "html", value: "啊" },
      { type: "radio", value: "水电费", options: ["水电费", "放大"] }
    ]
  },
  {
    row: [
      { type: "html", value: "阿斯蒂芬" },
      { type: "input", value: "", rule: false }
    ]
  },
  {
    row: [
      { type: "html", value: "法" },
      { type: "checkbox", value: ["发电房"], options: ["发电房", "发发发"] }
    ]
  }
];
export const switchDom = (that, data, faindex) => {
  const { h } = that;
  const dom = [];
  data.map((item, sonindex) => {
    if (!item.value) item.value = "";
    switch (item.type) {
      case "input":
        dom.push(formInput(that, item, data));
        break;
      case "textrea":
        dom.push(formInput(that, item, data));
        break;
      case "radio":
        dom.push(formRadio(that, item, data));
        break;
      case "checkbox":
        dom.push(formCheckbox(that, item, data));
        break;
      // case "select":
      //   dom.push(formSelect(that, item, data, faindex, sonindex));
      //   break;

      default:
        break;
    }
  });
  // console.log(dom,'-----------------');

  return <div>{dom.map(item => item)}</div>;
};

export function IndexOf(arr, obj) {
  let indexs = 0;
  arr.forEach((item, index) => {
    if (item == obj) indexs = index;
  });
  return indexs;
}

export const formInput = (that, val, data) => {
  const { h } = that;
  const info = val;
  const rule = value => {
    // 过滤输入的数字
    switch (info.rule) {
      case true:
        return value.replace(/\d/g, "");

      default:
        return value;
    }
  };
  const formInputProps = {
    props: {
      value: info.value,
      placeholder: info.placeholder || "请输入",
      type: info.rule ? "number" : (info.type == "textrea" && "textarea") || "",
      required: info.isrequired || false
    },
    on: {
      blur: e => {
        info.value = e.target.value;
      }
    }
  };
  if (IndexOf(data, val) == 1) formInputProps.props.label = data[0].value;
  return (
    <div class="llw_input">
      <van-field {...formInputProps} />
    </div>
  );
};

export const formRadio = (that, val, data) => {
  const { h } = that;
  const info = val;
  const formRadioRroupProps = {
    props: {
      value: info.value,
      direction: "horizontal"
    },
    on: {
      change: e => {
        console.log(e);
      }
    }
  };
  return (
    <div class="llw_radio">
      <div class="van-cell van-field">
        <div class="van-cell__title van-field__label">
          {info.isrequired && <span style="color:red;margin-left:-8px">*</span>}{" "}
          <span>{(IndexOf(data, val) == 1 && data[0].value) || ""}</span>
        </div>
        <div class="van-cell__value van-field__value">
          <div class="van-field__body">
            <van-radio-group {...formRadioRroupProps}>
              {info.options.map((item, index) => (
                <van-radio
                  {...{
                    on: {
                      click: e => {
                        info.value = item;
                      }
                    }
                  }}
                  name={item}
                >
                  {item}
                </van-radio>
              ))}
            </van-radio-group>
          </div>
        </div>
      </div>
    </div>
  );
};

export const formCheckbox = (that, val, data) => {
  const { h } = that;
  const info = val;
  const formCheckboxRroupProps = {
    props: {
      value: info.value,
      direction: "horizontal"
    },
    on: {
      change: e => {
        console.log(e);
      }
    }
  };
  return (
    <div class="llw_radio">
      <div class="van-cell van-field">
        {info.isrequired && <span style="color:red;margin-left:-8px">*</span>}
        <div class="van-cell__title van-field__label">
          <span>{(IndexOf(data, val) == 1 && data[0].value) || ""}</span>
        </div>
        <div class="van-cell__value van-field__value">
          <div class="van-field__body">
            <van-checkbox-group {...formCheckboxRroupProps}>
              {info.options.map((item, indexs) => (
                <van-checkbox
                  shape="square"
                  {...{
                    on: {
                      click: e => {
                        (info.value.indexOf(item) != -1 &&
                          info.value.splice(info.value.indexOf(item), 1)) ||
                          info.value.splice(indexs, 0, item);
                      }
                    }
                  }}
                  name={item}
                >
                  {item}
                </van-checkbox>
              ))}
            </van-checkbox-group>
          </div>
        </div>
      </div>
    </div>
  );
};

// export const formSelect = (that, val, data) => {
//   const { h } = that;
//   const info = val;
//   const formPickerProps = {
//     props: {
//       columns: info.options,
//       "show-toolbar": true
//     },
//     on: {
//       confirm: val => {
//         info.value = val;
//       },
//       cancel: e => {}
//     }
//   };
//   const formPopupProps = {
//     props: {
//       position: "bottom",
//       value: that.showProps,
//       "close-on-click-overlay": false
//     },
//     on: {
//       click: e => {
//         that.showProps = !that.showProps;
//       }
//     }
//   };
//   return (
//     <div class="llw_radio">
//       <div class="van-cell van-field">
//         <div class="van-cell__title van-field__label">
//           <span>{(IndexOf(data, val) == 1 && data[0].value) || ""}</span>
//         </div>
//         <div class="van-cell__value van-field__value">
//           <div class="van-field__body">
//             <div onClick={() => (that.showProps = true)} style="color:#000000">
//               {info.value.join(" ")}
//             </div>
//             <van-popup {...formPopupProps}>
//               <van-picker {...formPickerProps} />
//             </van-popup>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
