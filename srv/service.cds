using { my.logistics as data } from '../db/schema';

service LogisticsService {
  entity PurchaseOrders as projection on data.PurchaseOrders;
  entity PoLineItems as projection on data.PoLineItems;
  entity Receivings as projection on data.Receivings;
  entity ReceivingLineItems as projection on data.ReceivingLineItems;
  entity Shipments as projection on data.Shipments;

  
  
}
