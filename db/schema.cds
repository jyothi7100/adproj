namespace my.logistics;

entity PurchaseOrders {
  key OrderNo              : String;
      Supplier             : String;
      Region               : String;
      Plant                : String;
      PlantCode             : String;
      PlantLocation        : String;
      Department           : String;
      CompanyCode          : String;
      SupplierLocation     : String;
      IncoTerms            : String;
      CreatedOn            : Timestamp;
      FreightVendor        : String; //ff,ffname two feilds
      OrderType             : String;
      Status                : String;
      Items                : Composition of many PoLineItems on Items.parent = $self;
      Receivings           : Composition of many Receivings on Receivings.parent = $self;
      Shipments : Composition of many Shipments on Shipments.parent = $self;
}

entity PoLineItems {
  key Item                 : String;
  key parent               : Association to PurchaseOrders;
      Material             : String;
      Description          : String;
      QuantityOrdered      : Decimal(15,3);
      DeliveryDate         : Date;
      UoM                  : String;
      TransportMode        : String;
      MaterialNumber       : String;
}

entity Receivings {
  key ReceivingNumber      : String;
      parent               : Association to PurchaseOrders;
      ReceivedOn           : Date;
      ReceivedBy           : String;
      Status               : String;
      Entity               : String;
      Location             : String;
      SupplierName         : String;
      Description          : String;
      ShippingDate        : Date;
      Priority             : String;
      DGR                  : String;
      MRNumber             : String;
      ShipmentNumber       : String;
      TransportMode        : String;
      Pieces               : Integer;
      Weight               : Decimal(15,3);
      Volume               : Decimal(15,5);
      Value                : Decimal(15,2);
      Destination          : String;
      ShippingFrom         : String;
      Lines                : Composition of many ReceivingLineItems on Lines.parent = $self;
}

entity ReceivingLineItems {
  key LineID               : UUID;
      parent               : Association to Receivings;
      Item                 : String;
       Material            : String;
       Quantity            : Decimal(15,3);
        UoM                : String;
        Article            : String;
}

entity Shipments {
  key ID                 : String;
   parent               : Association to PurchaseOrders;
  Entity                : String(100);      // e.g. ARABIAN DRILLING COMPANY
  Origin                : String(40);       // e.g. HOUSTON, US
  Destination           : String(40);       // e.g. DAMMAM, SA
  TransportMode         : String(20);       // e.g. SEAFREIGHT, FLIGHT
  ContainerType         : String(10);       // e.g. FCL, LCL
  Supplier              : String(60);
  Incoterms             : String(10);       // e.g. EXW, FOB
  VesselName            : String(40);       // e.g. MSC BERYL
  WaybillNumber         : String(30);
  VoyageNumber          : String(20);
  PortOfLoading         : String(40);
  PortOfDischarge       : String(40);

  DistanceKM            : Decimal(10,2);    // e.g. 18176
  EnergyMJ              : Decimal(12,2);    // e.g. 52051
  CO2Ton                : Decimal(8,2);     // e.g. 3.61
  NOxKG                 : Decimal(8,2);     // e.g. 72.64
  SOxKG                 : Decimal(8,2);     // e.g. 21.74
  NMHC_KG               : Decimal(8,2);     // e.g. 4.65
  ParticulateKG         : Decimal(8,2);     // e.g. 5.27

  ShipmentDate          : Date;
  Estimateddelivery     : Date;
  CreatedBy             : String(50);
  CreatedAt             : Timestamp;

  
}



