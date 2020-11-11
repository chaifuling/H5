import fetch from "@/utils/request";

// 活动详情
export const getInfoWs= data => {
  return fetch.request({
    url: "services/ws?wsdl",
    method: "post",
    // params: data
    data
  });
};

export const getUserList = data => {
  return fetch.request({
    url: "services/ws?wsdl",
    method: "post",
    data
  });
};
