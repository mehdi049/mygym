import type { Schema, Attribute } from '@strapi/strapi';

export interface AddressAddress extends Schema.Component {
  collectionName: 'components_address_addresses';
  info: {
    displayName: 'address';
  };
  attributes: {
    city: Attribute.String;
    zip_code: Attribute.String;
    street: Attribute.String;
  };
}

export interface AddressMap extends Schema.Component {
  collectionName: 'components_address_maps';
  info: {
    displayName: 'map';
    description: '';
  };
  attributes: {
    link: Attribute.String;
  };
}

export interface GymComponentsGymPrices extends Schema.Component {
  collectionName: 'components_gym_price_gym_prices';
  info: {
    displayName: 'gym-prices';
    description: '';
  };
  attributes: {
    currency: Attribute.Enumeration<['TND', 'EUR', 'USD']> &
      Attribute.DefaultTo<'TND'>;
    subscription_fees: Attribute.Decimal;
    packs: Attribute.Component<'gym-components.pack-prices', true>;
    extra_info: Attribute.Text;
  };
}

export interface GymComponentsOpenClose extends Schema.Component {
  collectionName: 'components_gym_components_open_closes';
  info: {
    displayName: 'open-close';
  };
  attributes: {
    open: Attribute.Time;
    close: Attribute.Time;
  };
}

export interface GymComponentsOpenTime extends Schema.Component {
  collectionName: 'components_gym_components_open_times';
  info: {
    displayName: 'open-time';
  };
  attributes: {
    monday: Attribute.Component<'gym-components.open-close'>;
    tuesday: Attribute.Component<'gym-components.open-close'>;
    wednesday: Attribute.Component<'gym-components.open-close'>;
    thursday: Attribute.Component<'gym-components.open-close'>;
    friday: Attribute.Component<'gym-components.open-close'>;
    saturday: Attribute.Component<'gym-components.open-close'>;
    sunday: Attribute.Component<'gym-components.open-close'>;
  };
}

export interface GymComponentsPackPrices extends Schema.Component {
  collectionName: 'components_gym_prices_pack_prices';
  info: {
    displayName: 'pack-prices';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.DefaultTo<'Standard'>;
    extra_info: Attribute.Text;
    one_month: Attribute.Decimal;
    three_months: Attribute.Decimal;
    six_months: Attribute.Decimal;
    nine_months: Attribute.Decimal;
    one_year: Attribute.Decimal;
  };
}

export interface SocialMediaLinksSocialMediaLinks extends Schema.Component {
  collectionName: 'components_social_media_links_social_media_links';
  info: {
    displayName: 'Social media links';
    description: '';
  };
  attributes: {
    facebook: Attribute.String;
    instagram: Attribute.String;
    twitter: Attribute.String;
    youtube: Attribute.String;
    linkedin: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'address.address': AddressAddress;
      'address.map': AddressMap;
      'gym-components.gym-prices': GymComponentsGymPrices;
      'gym-components.open-close': GymComponentsOpenClose;
      'gym-components.open-time': GymComponentsOpenTime;
      'gym-components.pack-prices': GymComponentsPackPrices;
      'social-media-links.social-media-links': SocialMediaLinksSocialMediaLinks;
    }
  }
}
