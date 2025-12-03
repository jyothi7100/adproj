sap.ui.define([
    "sap/ui/core/mvc/Controller",
   
], (Controller) => {
    "use strict";
   return Controller.extend("logistics.controller.ReceivingDetail", {

  onInit: function () {
  const oRouter = this.getOwnerComponent().getRouter();
  oRouter.getRoute("receivingDetail").attachPatternMatched(this._onObjectMatched, this);

     const aImages = [
    {
      imageSrc: sap.ui.require.toUrl("logistics/images/image1.png"),
      albeNumber: "0034040589058708042",
      timestamp: "17 Dec 2024 22:03"
    },
    {
      imageSrc: sap.ui.require.toUrl("logistics/images/image2.png"),
      albeNumber: "0034040589058708060",
      timestamp: "26 Nov 2024 22:02"
    },
    {
      imageSrc: sap.ui.require.toUrl("logistics/images/image3.png"),
      albeNumber: "0034040589058708050",
      timestamp: "23 Jan 2024 22:01"
    }
  ];

  const oImageModel = new sap.ui.model.json.JSONModel({ images: aImages });
  this.getView().setModel(oImageModel, "imageData");


  const milestones = [
    { Title: "Order Issued Date", DateTime: "20 Nov 2024 00:00", Location: "ALK, SA", Status: "Completed" },
    { Title: "Actual Readiness Date", DateTime: "19 Dec 2024 13:10", Location: "HOU, US", Status: "Completed" },
    { Title: "Pickup Requested", Status: "Pending" },
    { Title: "Pickup Scheduled", Status: "Pending" },
    { Title: "Pickup Collected", Status: "Pending" },
    { Title: "Cargo Receipt", DateTime: "19 Dec 2024 13:10", Location: "HOU, US", Status: "Completed" },
    { Title: "OS+(Dg) Raised", DateTime: "23 Dec 2024 14:39", Location: "HOU, US", Status: "Completed" },
    { Title: "OS+(Dg) Resolved", DateTime: "24 Dec 2024 12:20", Location: "HOU, US", Status: "Completed" },
    { Title: "MR Issued", DateTime: "24 Dec 2024 12:21", Location: "HOU, US", Status: "Completed" },
    { Title: "Shipment collected from supplier", Status: "Pending" },
    { Title: "Released to Pack (Shipment)", DateTime: "30 Dec 2024 11:56", Location: "HOU, US", Status: "Completed" },
    { Title: "Packing Complete (Shipment)", DateTime: "31 Dec 2024 13:38", Location: "HOU, US", Status: "Completed" },
    { Title: "Expected Departure", DateTime: "05 Jan 2025 15:05", Location: "HOU, US", Status: "Completed" },
    { Title: "Expected Arrival", DateTime: "08 Jan 2025 03:50", Location: "DMM, SA", Status: "Completed" },
    { Title: "Departed Warehouse", DateTime: "03 Jan 2025 13:30", Location: "HOU, US", Status: "Completed" },
    { Title: "Pre-Alert Sent", DateTime: "03 Jan 2025 13:20", Location: "HOU, US", Status: "Completed" },
    { Title: "Departed (Airport of origin)", Status: "Pending" }
  ];

  const milestoneModel = new sap.ui.model.json.JSONModel({ Milestones: milestones });
  this.getView().setModel(milestoneModel, "milestone");
},

_onObjectMatched: function (oEvent) {
  const orderNo = oEvent.getParameter("arguments").OrderNo;
  const receivingNo = oEvent.getParameter("arguments").ReceivingNumber;

  const sPath = `/Receivings('${receivingNo}')`;
  this.getView().bindElement({
    path: sPath,
    parameters: {
      expand: "parent" // ✅ to access PurchaseOrder fields
    }
  });

  // Optional: set header model
  const oHeaderModel = new sap.ui.model.json.JSONModel({
    OrderNo: orderNo,
    ReceivingNumber: receivingNo
  });
  this.getView().setModel(oHeaderModel, "header");
},
formatDate: function(sDate) {
  if (!sDate) return "";
  try {
    const parsedDate = new Date(sDate); // works if sDate is "2025-11-17"
    return parsedDate.toLocaleString("en-US", {
      day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
    });
  } catch (e) {
    return "Invalid date";
  }
}





 });
});