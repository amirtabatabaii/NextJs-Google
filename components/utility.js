export const FilterData = [
  { id: "2", name: "Food", value: "food" },
  { id: "3", name: "Locality", value: "locality" },
  { id: "4", name: "Moving Company", value: "moving_company" },
  { id: "5", name: "Atm", value: "atm" },
  { id: "6", name: "Political", value: "political" },
  { id: "7", name: "Storage", value: "storage" },
  { id: "8", name: "General Contractor", value: "general_contractor" },
  { id: "9", name: "Bank", value: "bank" },
  { id: "10", name: "Lawyer", value: "lawyer" },
  { id: "11", name: "Finance", value: "finance" },
  { id: "12", name: "Real Estate Agency", value: "real_estate_agency" },
  { id: "13", name: "Restaurant", value: "restaurant" },
  { id: "14", name: "Travel_agency", value: "travel_agency" },
  { id: "15", name: "Doctor", value: "doctor" },
  { id: "16", name: "Health", value: "health" },
];

export const SortData = [
  { id: "1", name: "Close to Far", value: "close_to_far" },
  { id: "2", name: "Far to Close", value: "far_to_lose" },
];

export function calcCrow(lat1, lon1, lat2, lon2, rad) {
  var R = rad;
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
  return (Value * Math.PI) / 180;
}
