sap.ui.define([
    "sap/ui/core/mvc/Controller",
   
], (Controller) => {
    "use strict";
   return Controller.extend("logistics.controller.ShipmentDetail ", {

onInit: function () {
  this.getOwnerComponent().getRouter()
    .getRoute("ShipmentDetail")
    .attachPatternMatched(this._onRouteMatched, this);
},

_onRouteMatched: function (oEvent) {
  const sID = oEvent.getParameter("arguments").ID;
  this.getView().bindElement({
    path: `/Shipments('${sID}')`
  });
  console.log("Binding to ID:", sID);
}
});
});