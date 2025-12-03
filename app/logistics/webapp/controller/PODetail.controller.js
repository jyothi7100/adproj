sap.ui.define([
    "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast"
], (Controller,MessageToast) => {
    "use strict";

    return Controller.extend("logistics.controller.PODetail", {

onInit: function () {
  this.getOwnerComponent().getRouter()
    .getRoute("poDetail")
    .attachPatternMatched(this._onRouteMatched, this);
},

_onRouteMatched: function (oEvent) {
  const OrderNo = oEvent.getParameter("arguments").OrderNo;
  this.getView().bindElement({
    path: `/PurchaseOrders('${OrderNo}')`
  });
},

onReceivingPress: function (oEvent) {
  const context = oEvent.getSource().getBindingContext();
  const receivingNo = context.getProperty("ReceivingNumber");
  const orderNo = context.getProperty("parent/OrderNo"); // ✅ association path
  const item = context.getProperty("Item"); // if needed

  if (!orderNo || !receivingNo) {
  MessageToast.show("Missing navigation parameters.");
  return;
}

const navParams = {
  OrderNo: orderNo,
  ReceivingNumber: receivingNo
};

if (item) {
  navParams.Item = item;
}

this.getOwnerComponent().getRouter().navTo("receivingDetail", navParams);

}




 });
});
