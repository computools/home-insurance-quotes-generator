export type PropertyDetailsDataType = {
  address_full: string;
  building_area_sq_ft: number;
  construction_type: string;
  exterior_walls: string;
  fireplace: boolean;
  no_of_stories: number;
  number_of_bedrooms: number;
  roof_cover: string;
  total_bath_count: number;
  year_built: number;
  foundation?: string;
};

export type EditedAddressType = {
  street: string;
  buildNumber: string;
  city: string;
  state: string;
  postalCode: string;
};

export type FireStationDistanceType = 'NO_ANSWER' | 'OVER_10_MILES' | 'WITHIN_10_MILES' | 'WITHIN_5_MILES';
export type FireHydrantDistanceType = 'NO_ANSWER' | 'OVER_1000_FEET' | 'WITHIN_1000_FEET';
export type ExteriorType =
  | 'ALUMINUM_SIDING'
  | 'BRICK_VENEER'
  | 'CLAPBOARD'
  | 'CONCRETE_BLOCK'
  | 'HARDIPLANK_TYPE'
  | 'LOG'
  | 'METAL_SIDING'
  | 'STONE_VENEER'
  | 'STUCCO_ON_FRAME'
  | 'VINYL_SIDING'
  | 'WOOD_SIDING'
  | 'OTHER_MATERIAL'
  | 'OTHER_SIDING';
export type RoofType =
  | 'ASPHALT_SHINGLES'
  | 'COMPOSITE_SHINGLE'
  | 'CONCRETE'
  | 'METAL'
  | 'SLATE_OR_IMITATION_SLATE'
  | 'MIXED'
  | 'TILE'
  | 'WOOD_SHINGLE'
  | 'TILE'
  | 'CEDAR_OR_SHAKE'
  | 'OTHER';
export type FoundationType = 'SLAB' | 'PIER_AND_BEAM' | 'BASEMENT' | 'OTHER' | 'NO_ANSWER';
export type PropertyType = 'SINGLE_FAMILY' | 'MULTI_FAMILY' | 'CONDO' | 'TOWNHOME' | 'OTHER';
export type UsageType = 'PRIMARY' | 'RENTAL_PROPERTY' | 'SEASONAL' | 'SECONDARY';
export type OccupancyType = 'OWNER' | 'RENTER' | 'VACANT';
export type MaritalStatusType = 'DIVORCED_OR_WIDOWED' | 'MARRIED' | 'NO_ANSWER' | 'SINGLE';
