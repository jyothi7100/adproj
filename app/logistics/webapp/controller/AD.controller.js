sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/odata/v4/ODataModel",
  "sap/m/MessageToast"
], function (Controller, JSONModel, ODataModel, MessageToast) {
  "use strict";

  return Controller.extend("logistics.controller.AD", {
    onInit: function () {
      const oModel = new ODataModel({
        serviceUrl: "/odata/v4/logistics/",
        synchronizationMode: "None"
      });
      this.getView().setModel(oModel);

      // -----------------------------
      // 1. Receivings aggregation
      // -----------------------------
      const oListBinding = oModel.bindList("/Receivings");

      oListBinding.requestContexts(0, oListBinding.getLength())
        .then(aContexts => {
          const aData = aContexts.map(ctx => ctx.getObject());

          // TransportMode counts
          const oModeMap = {};
          aData.forEach(r => {
            const mode = r.TransportMode || "Unknown";
            oModeMap[mode] = (oModeMap[mode] || 0) + 1;
          });
          const aTransportData = Object.keys(oModeMap).map(mode => ({
            TransportMode: mode,
            Count: oModeMap[mode]
          }));
          this.getView().setModel(new JSONModel({ data: aTransportData }), "transportChart");

          // Status counts
          const oCountMap = {};
          aData.forEach(r => {
            const status = r.Status || "Unknown";
            oCountMap[status] = (oCountMap[status] || 0) + 1;
          });
          const aStatusCount = Object.keys(oCountMap).map(Status => ({
            Status,
            count: oCountMap[Status]
          }));
          this.getView().setModel(new JSONModel({ data: aStatusCount }), "chart");
        })
        .catch(err => console.error("Error fetching Receivings:", err));

      // -----------------------------
      // 2. Shipments by Department
      // -----------------------------
      const oShipmentsBinding = oModel.bindList("/Shipments", undefined, undefined, undefined, {
        $expand: "parent"
      });

      oShipmentsBinding.requestContexts(0, oShipmentsBinding.getLength())
        .then(aContexts => {
          const aShipments = aContexts.map(ctx => ctx.getObject());

          const deptMap = {};
          const unresolved = [];

          aShipments.forEach(s => {
            if (s.parent && s.parent.Department) {
              const dept = s.parent.Department.trim();
              deptMap[dept] = (deptMap[dept] || 0) + 1;
            } else {
              unresolved.push(s.ID);
              deptMap["Unlinked PurchaseOrder"] = (deptMap["Unlinked PurchaseOrder"] || 0) + 1;
            }
          });

          const aDeptData = Object.keys(deptMap).map(dept => ({
            Department: dept,
            ShipmentCount: deptMap[dept]
          }));

          this.getView().setModel(new JSONModel({ data: aDeptData }), "deptChart");

          // Debug unresolved shipments
          if (unresolved.length > 0) {
            console.warn("Shipments with null parent:", unresolved);
          }
        })
        .catch(err => console.error("Error fetching Shipments:", err));
    },

    onTabSelect: function (oEvent) {
      const key = oEvent.getParameter("key");
      console.log("Selected tab:", key);
    },

    onPONumberPress: function (oEvent) {
      const OrderNo = oEvent.getSource().getText();
      this.getOwnerComponent().getRouter().navTo("poDetail", { OrderNo });
    },

    onShipmentNumberPress: function (oEvent) {
      const oContext = oEvent.getSource().getBindingContext();
      const sShipmentID = oContext.getProperty("ID");

      if (!sShipmentID) {
        MessageToast.show("Shipment ID not found.");
        return;
      }

      this.getOwnerComponent().getRouter().navTo("ShipmentDetail", { ID: sShipmentID });
    }

   

  });
});
